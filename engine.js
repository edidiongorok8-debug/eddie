/* Eddie reply engine.
 *
 * Lives in its own file so it can be tested with plain node (see test-engine.js)
 * and still be loaded by index.html with a normal script tag. No dependencies,
 * no build step.
 *
 * Every answer is built only from the owner's own data. If the data is missing,
 * the engine says so instead of inventing a price.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.EDDIE_ENGINE = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  /* ---------------- money + prices ---------------- */

  function money(p) {
    if (p === 0) return '₦0';
    if (!p) return '';
    var raw = String(p).replace(/[^0-9.]/g, '');
    if (raw === '') return String(p);
    var n = parseFloat(raw);
    if (isNaN(n)) return String(p);
    return '₦' + n.toLocaleString('en-NG');
  }

  function priceList(s, limit) {
    var items = (s && s.items) || [];
    if (!items.length) return 'Ask us and we will send our current prices.';
    return items.slice(0, limit || 3).map(function (i) {
      return '• ' + i.n + (i.p ? ' — ' + money(i.p) : ' — ask for price');
    }).join('\n');
  }

  /* ---------------- words ---------------- */

  /* Words that carry no product meaning. Keeping "how" and "much" out means
     "how much be this thing" reduces to nothing useful and the engine falls
     back to the price list instead of guessing. */
  var STOP = {};
  ('a an the and or but if then than that this these those it its is are was were be been being am ' +
   'do does did doing have has had having will would can could should shall may might must ' +
   'i me my we our you your he she they them their his her us ' +
   'of to in on at for from with about into over under again further once here there when where why ' +
   'what which who whom how much many any some no not only own same so too very just ' +
   'please pls plz abeg o oh hey hi hello good morning afternoon evening sir ma madam ' +
   'thing things stuff one ones like want need get got make made go going come coming ' +
   'na dey be wetin shey yous una').split(' ').forEach(function (w) { STOP[w] = 1; });

  function normalise(t) {
    return String(t == null ? '' : t)
      .toLowerCase()
      .replace(/[’']/g, '')
      .replace(/[^a-z0-9₦\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* crude but predictable stemming: plural and -ing endings only, so
     "deliver", "delivers", "delivery" and "deliveries" all meet in the middle */
  function stem(w) {
    if (w.length > 4 && /ies$/.test(w)) return w.slice(0, -3) + 'y';
    if (w.length > 4 && /ing$/.test(w)) return w.slice(0, -3);
    if (w.length > 3 && /es$/.test(w)) return w.slice(0, -2);
    if (w.length > 3 && /s$/.test(w) && !/ss$/.test(w)) return w.slice(0, -1);
    return w;
  }

  function tokens(t) {
    var out = [];
    normalise(t).split(' ').forEach(function (w) {
      if (!w || w.length < 2 || STOP[w]) return;
      out.push(stem(w));
    });
    return out;
  }

  /* Word overlap, not substring matching. A shared token scores 1. Short
     tokens score less so "bag" cannot outrank "bag of rice" on a tie.
     Prefix matches of 5+ characters score 0.5 so "deliver" finds "delivery". */
  function score(query, target) {
    var q = tokens(query);
    var t = tokens(target);
    if (!q.length || !t.length) return 0;
    var total = 0;
    q.forEach(function (w) {
      var hit = 0;
      t.forEach(function (v) {
        if (v === w) hit = Math.max(hit, 1);
        else if (w.length >= 5 && v.length >= 5 && (v.indexOf(w) === 0 || w.indexOf(v) === 0)) hit = Math.max(hit, 0.5);
      });
      total += hit * (w.length >= 4 ? 1 : 0.6);
    });
    return total;
  }

  function bestOf(query, list, key) {
    var best = null, bestScore = 0;
    (list || []).forEach(function (row) {
      var v = 0;
      if (Array.isArray(key)) { key.forEach(function (k) { v = Math.max(v, score(query, row[k])); }); }
      else v = score(query, row[key]);
      if (v > bestScore) { bestScore = v; best = row; }
    });
    return { row: best, score: bestScore };
  }

  var INTENT = {
    price: /\b(price|prices|pricing|how much|cost|costs|rate|rates|naira|₦|charge|sell|selling|buy|buying|worth)\b/,
    location: /\b(where|address|location|located|shop|store|come|coming|direction|directions|find|find you|branch)\b/,
    hours: /\b(open|close|closed|closing|opening|time|times|hours|today|tomorrow|sunday|saturday|monday|available)\b/,
    payment: /\b(pay|payment|transfer|account|pos|card|cash|money|bank|deposit)\b/,
    delivery: /\b(deliver|delivery|deliveries|bring|send|dispatch|pickup|pick up|transport|waybill|shipping|ship|drop|dropping|collect)\b|how do i (get|receive)|get it to|take it to|get to/,
    human: /\b(owner|manager|boss|human|person|call|calling|speak|talk|talk to|complain)\b/,
    greeting: /^(hi|hello|hey|heyy+|good (morning|afternoon|evening)|how far|wetin dey|abeg|morning|afternoon|evening)\b/,
    thanks: /\b(thank|thanks|thx|okay|ok|alright|fine|noted|well done)\b/
  };

  function test(re, t) { return re.test(t); }

  function line(a, b) { return a + (b ? '\n\n' + b : ''); }

  /* ---------------- the reply ---------------- */

  function reply(s, text) {
    s = s || {};
    var t = normalise(text);
    var name = s.assist || 'Eddie';
    var personal = s.mode === 'personal';

    if (!t) return personal
      ? 'Type your message and I will get back to you shortly.'
      : 'Send me your question and I will answer with prices, hours, payment or delivery.';

    if (personal) {
      var meTopic = /\b(price|how much|cost|rate|where|location|address|open|free|time|hours|pay|transfer)\b/.test(t);
      if ((test(INTENT.greeting, t) || t === 'hi') && !meTopic)
        return 'Hi 👋 This is ' + name + '. How can I help?';
      if (/\b(price|how much|cost|rate)\b/.test(t)) return 'Let me confirm that and come back to you. What exactly do you need?';
      if (/\b(where|location|address|come)\b/.test(t)) return s.town ? 'I am around ' + s.town + '. I will send the exact place when we speak.' : 'I will send the exact place when we speak.';
      if (/\b(open|free|time|hours|avail?able|busy)\b/.test(t)) return s.hours ? 'Usually free ' + s.hours + '. What time works for you?' : 'Tell me a good time and I will confirm.';
      if (/\b(pay|transfer|account|cash)\b/.test(t)) return 'Let us sort that when we speak, so nothing gets mixed up.';
    }

    /* A greeting is only a greeting when nothing else is being asked.
       "abeg how much" starts with abeg but is a price question. */
    var hasTopic = test(INTENT.price, t) || test(INTENT.location, t) || test(INTENT.hours, t) ||
      test(INTENT.payment, t) || test(INTENT.delivery, t) || test(INTENT.human, t) ||
      (bestOf(t, s.items, 'n').score > 0) || (bestOf(t, s.faqs, ['q', 'a']).score > 0);

    if (test(INTENT.greeting, t) && !hasTopic)
      return 'Hello and welcome to ' + (s.biz || 'us') + ' 👋\n' +
        (s.hours ? 'We are open ' + s.hours + '. ' : '') +
        'Tell me what you need and I will help with prices, delivery and payment.';

    var item = bestOf(t, s.items, 'n');
    var faq = bestOf(t, s.faqs, ['q', 'a']);

    /* Handoff before the rest, because "can I speak to the owner" is common
       and must never be answered with a price. */
    if (test(INTENT.human, t))
      return 'Of course. I have noted this for the owner' +
        (s.phone ? ' — you can also call ' + s.phone.replace(/^(\d{3})(\d{3})(\d{4})$/, '+$1 $2 $3') : '') +
        '. What is the best time to reach you?';

    if (test(INTENT.payment, t))
      return s.pay
        ? 'You can pay like this: ' + s.pay + '\n\nSend the receipt here and I will confirm your order.'
        : 'Please ask us for the payment details and we will send them right away.';

    if (test(INTENT.delivery, t))
      return s.deliver || 'Tell me your area and I will confirm delivery.';

    if (test(INTENT.location, t))
      return 'We are in ' + (s.town || 'town') + '.' + (s.deliver ? '\n' + s.deliver : '') + '\n\nShould I keep your order aside?';

    if (test(INTENT.hours, t))
      return 'Our opening hours: ' + (s.hours || 'please ask us') + '. If you message outside these hours, I will still note your order and we reply first thing.';

    if (test(INTENT.price, t) && item.row && item.score > 0)
      return item.row.n + ' is ' + money(item.row.p) + '.' +
        (s.deliver ? '\n\n' + s.deliver : '') + '\n\nHow many do you need?';

    /* A named product with no price word still deserves its price. */
    if (item.row && item.score >= 1)
      return item.row.n + ' is ' + money(item.row.p) + '.' +
        (s.deliver ? '\n\n' + s.deliver : '') + '\n\nWould you like to order?';

    if (test(INTENT.price, t) || !faq.row)
      if (test(INTENT.price, t))
        return 'Our prices:\n' + priceList(s, 4) +
          (s.pay ? '\n\nPayment: ' + s.pay : '') + '\n\nAnything there you want to order?';

    if (faq.row && faq.score > 0) return faq.row.a;

    if (test(INTENT.thanks, t)) return 'You are welcome. Message me anytime, ' + (s.biz || 'we') + ' is here.';

    if (personal) return 'Noted, thank you. I have passed it on and ' + (s.biz || 'it') + ' will get back to you shortly.';

    return 'I can help with prices, location, opening hours, payment and delivery.\n\n' +
      priceList(s, 3) + '\n\nWhich one do you want to ask about?';
  }

  /* Fallback used by the app to decide whether to ask the optional AI model. */
  function isGenericAnswer(answer) {
    return /Which one do you want to ask about\?$/.test(String(answer || ''));
  }

  return {
    money: money,
    priceList: priceList,
    normalise: normalise,
    tokens: tokens,
    score: score,
    reply: reply,
    isGenericAnswer: isGenericAnswer,
    INTENT: INTENT
  };
});
