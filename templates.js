/* Eddie starter templates — pre-fill answers by role */
window.EDDIE_TEMPLATES = {
  pharmacy: {
    keys: ['pharmacy', 'chemist'],
    items: [{n:'Paracetamol 500mg (pack)',p:'800'},{n:'Coartem (full dose)',p:'4500'},{n:'Vitamin C (pack)',p:'1500'}],
    faqs: [
      {q:'Do you have malaria drugs?',a:'Yes, Coartem and Lonart are in stock. Tell me the age of the patient so I give the right dose.'},
      {q:'Can I send a prescription?',a:'Yes, send a photo on WhatsApp and I will price everything and set it aside.'},
      {q:'Do you deliver?',a:'Yes, inside town for a small fee. Free above a set amount.'}
    ]
  },
  provisions: {
    keys: ['provision', 'grocery', 'supermarket', 'store'],
    items: [{n:'Rice (small bag)',p:'9500'},{n:'Beans (paint bucket)',p:'7200'},{n:'Palm oil (1 litre)',p:'2500'}],
    faqs: [
      {q:'Do you sell in bulk?',a:'Yes, we give a discount from ten cartons upward.'},
      {q:'Are your prices current?',a:'Prices change with the market, so I confirm the price before you pay.'},
      {q:'Can you reserve goods for me?',a:'Yes, I keep it aside for 24 hours after you confirm.'}
    ]
  },
  food: {
    keys: ['food', 'restaurant', 'caterer', 'bukka', 'kitchen'],
    items: [{n:'Plate of jollof and chicken',p:'2500'},{n:'Fried rice and turkey',p:'3500'},{n:'Small chops tray',p:'8000'}],
    faqs: [
      {q:'Can you cater for 50 guests?',a:'Yes, give me the date and menu and I send a full quote.'},
      {q:'How long does delivery take?',a:'Inside town, 45 minutes to an hour after confirmation.'},
      {q:'Do you cook with plenty pepper?',a:'Tell me your taste and I cook it the way you want.'}
    ]
  },
  salon: {
    keys: ['salon', 'barber', 'beauty', 'spa', 'hair'],
    items: [{n:'Haircut',p:'3000'},{n:'Braids (medium)',p:'12000'},{n:'Manicure and pedicure',p:'8000'}],
    faqs: [
      {q:'Do I need an appointment?',a:'Walk-ins are fine, but a booking means you do not wait.'},
      {q:'Do you come to the house?',a:'Yes, home service is available with a small transport fee.'},
      {q:'Do you provide the hair?',a:'You can bring yours, or I show you options in the shop.'}
    ]
  },
  tailoring: {
    keys: ['tailor', 'fashion', 'sewing'],
    items: [{n:'Ankara gown',p:'18000'},{n:'Two-piece suit',p:'45000'},{n:'School uniform',p:'6000'}],
    faqs: [
      {q:'How many days does it take?',a:'Five working days for a gown, ten for a suit.'},
      {q:'Do you come for measurements?',a:'You can come to the shop, or send your measurements on WhatsApp.'},
      {q:'Do you do rush jobs?',a:'Yes, rush delivery is possible with an extra charge.'}
    ]
  },
  phone: {
    keys: ['phone', 'electronics', 'gadget', 'computer'],
    items: [{n:'Screen protector',p:'2500'},{n:'Phone charger',p:'3500'},{n:'Power bank 10000mAh',p:'15000'}],
    faqs: [
      {q:'Do you repair screens?',a:'Yes, bring the phone and I check it free and quote you.'},
      {q:'Is there a warranty?',a:'Accessories carry one month. Repairs carry two weeks.'},
      {q:'Do you accept transfers?',a:'Yes, transfer, card or cash.'}
    ]
  },
  lawyer: {
    keys: ['lawyer', 'legal', 'barrister', 'paralegal'],
    items: [{n:'Consultation (30 minutes)',p:'20000'},{n:'Affidavit or document review',p:'35000'},{n:'Retainer (monthly)',p:'150000'}],
    faqs: [
      {q:'Can I get advice on the phone?',a:'Yes, a short call is fine. Detailed advice needs a booked session.'},
      {q:'Do you go to court?',a:'Yes, within the state. Outside the state attracts travel and lodging.'},
      {q:'What should I bring?',a:'Every document about the matter, and a written summary of the facts.'}
    ]
  },
  engineer: {
    keys: ['engineer', 'civil', 'chemical', 'mechanical', 'electrical', 'structural', 'petroleum'],
    items: [{n:'Site visit and assessment',p:'50000'},{n:'Drawing and design work',p:'120000'},{n:'Project supervision (monthly)',p:'200000'}],
    faqs: [
      {q:'Do you work outside the state?',a:'Yes, with travel and accommodation added to the fee.'},
      {q:'How long does a design take?',a:'Two to three weeks after the site visit and the brief.'},
      {q:'Can you work with my contractor?',a:'Yes, I supervise and certify stages so you know what you are paying for.'}
    ]
  },
  tutor: {
    keys: ['tutor', 'teacher', 'lesson', 'coach'],
    items: [{n:'One-on-one lesson (1 hour)',p:'5000'},{n:'WAEC/JAMB revision (per week)',p:'15000'},{n:'Home lesson (per month)',p:'60000'}],
    faqs: [
      {q:'Do you teach at home?',a:'Yes, home lessons are available within town.'},
      {q:'Which subjects do you take?',a:'Maths, English and the sciences up to WAEC level.'},
      {q:'Can I do online?',a:'Yes, online lessons run on WhatsApp video or Google Meet.'}
    ]
  },
  personal: {
    keys: ['personal', 'student', 'freelancer', 'job seeker', 'other'],
    items: [],
    faqs: [
      {q:'Are you free this week?',a:'Let me check my week and confirm a time that works.'},
      {q:'Can you send the details?',a:'Yes, I will put everything in one message shortly.'},
      {q:'Where are you based?',a:'I will share the exact place with you when we agree on a time.'}
    ]
  }
};
