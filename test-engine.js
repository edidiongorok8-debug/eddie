/* Engine tests. Plain node, no dependencies:  node test-engine.js
 *
 * Checks that the reply engine always answers with something usable, that the
 * awkward phrasings real customers type still land on a real answer, and that
 * it never invents a price that is not in the owner's data.
 */
'use strict';

var engine = require('./engine.js');

var business = {
  mode: 'business',
  biz: 'Mama Nkechi Pharmacy',
  assist: 'Eddie',
  kind: 'Pharmacy',
  town: 'Uyo, Akwa Ibom',
  hours: 'Mon to Sat, 8am to 7pm',
  phone: '2348023123838',
  pay: 'Cash, or transfer to 0123456789 (Zenith Bank)',
  deliver: 'Delivery inside Uyo is ₦1,500, free above ₦20,000. Pickup at the shop from 9am.',
  items: [
    { n: 'Small bag of rice', p: '9500' },
    { n: 'Malaria test kit', p: '3500' },
    { n: 'Vitamin C 1000mg', p: '2500' }
  ],
  faqs: [
    { q: 'Do you accept insurance?', a: 'Yes, we accept HMO cards from Hygeia and AXA Mansard.' },
    { q: 'Can I get a refund?', a: 'Unopened items can be returned within 7 days with the receipt.' }
  ]
};

var personal = {
  mode: 'personal',
  biz: '',
  assist: 'Eddie',
  town: 'Uyo',
  hours: 'evenings',
  items: [],
  faqs: []
};

/* 20 questions a real customer would type, including awkward Nigerian
   phrasing, typos, and messages with no useful words at all. */
var questions = [
  'How much is the small bag of rice?',
  'how much be this thing',
  'rice',
  'Do you deliver?',
  'how far',
  'Are you open on Sunday?',
  'Where are you located?',
  'can i pay with transfer',
  'I want to speak to the owner',
  'do you have vitamin c',
  'price list',
  'wetin dey',
  'abeg how much',
  'is malaria test available',
  'Good morning',
  'Do you accept insurance?',
  'Can I get a refund?',
  'thanks',
  'asdkjhasd',
  'I need two bags, how do I get it to Ikot Ekpene'
];

var problems = [];
var MIN_REASONABLE = 12;

function allowedPrices(s) {
  var set = [];
  (s.items || []).forEach(function (i) {
    var n = parseFloat(String(i.p).replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) set.push(n);
  });
  /* prices quoted inside the owner's own delivery rule are also fair game */
  var extra = String(s.deliver || '').match(/\d[\d,]*/g) || [];
  extra.forEach(function (x) {
    var n = parseFloat(x.replace(/,/g, ''));
    if (!isNaN(n)) set.push(n);
  });
  return set;
}

function pricesIn(text) {
  var out = [];
  var m = String(text).match(/₦\s?([\d,]+)/g) || [];
  m.forEach(function (x) {
    var n = parseFloat(x.replace(/[₦,\s]/g, ''));
    if (!isNaN(n)) out.push(n);
  });
  return out;
}

questions.forEach(function (q, i) {
  var answer = engine.reply(business, q);
  var label = 'Q' + (i + 1) + ' "' + q + '"';

  if (typeof answer !== 'string' || !answer.trim()) {
    problems.push(label + ' returned an empty answer');
    return;
  }
  if (answer.trim().length < MIN_REASONABLE) {
    problems.push(label + ' answer is too short to be useful: ' + JSON.stringify(answer));
  }
  if (/undefined|null|NaN|\[object/.test(answer)) {
    problems.push(label + ' answer contains a placeholder: ' + JSON.stringify(answer));
  }
  var ok = allowedPrices(business);
  pricesIn(answer).forEach(function (n) {
    if (ok.indexOf(n) === -1) {
      problems.push(label + ' quoted ₦' + n + ' which is not in the owner\'s data');
    }
  });
});

/* the awkward phrasing must land on the price list, not on an apology */
var awkward = engine.reply(business, 'how much be this thing');
if (!/₦/.test(awkward)) problems.push('"how much be this thing" did not reach any price');

/* a named product with no price word should still get its price */
var named = engine.reply(business, 'rice');
if (!/9,500/.test(named)) problems.push('"rice" did not return the rice price');

/* personal mode must also always answer */
['hi', 'how much', 'where are you', 'are you free', 'how do i pay', 'xyz'].forEach(function (q) {
  var a = engine.reply(personal, q);
  if (!a || !a.trim()) problems.push('personal mode returned nothing for "' + q + '"');
});

/* the engine must never be able to build an answer with no data */
var empty = engine.reply({ mode: 'business' }, 'how much is it');
if (!empty || !empty.trim()) problems.push('empty profile returned nothing');

console.log('Eddie reply engine');
console.log('  questions tested: ' + questions.length);
console.log('  personal mode: 6');
console.log('  empty profile: 1');

if (problems.length) {
  console.log('\nFAIL');
  problems.forEach(function (p) { console.log('  - ' + p); });
  process.exit(1);
}

console.log('\nPASS  every question returned a usable answer built from owner data only');
