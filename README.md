# Eddie

**A WhatsApp reply assistant and to-do list, for businesses and for people with no business at all.**

Live: https://eddie-wa.vercel.app

---

## 1. What Eddie is

Eddie is a small web app that answers the question every Nigerian business owner faces every day: *the same five questions, sixty times, while serving a customer.*

You fill in your details once — what you sell, your prices, your hours, how people pay, how you deliver. Eddie then writes your WhatsApp messages for you and answers your customers in your own words.

It also keeps your to-do list, because the person answering all those messages is also the person who has to restock, call the supplier and send the invoice.

---

## 2. Two ways to use it

**Business mode** — for a shop, service, practice or organisation. You give a business name, prices and rules. Eddie writes customer-facing messages.

**Personal mode** — for someone with no business who just wants an assistant. The business name becomes optional, prices and delivery rules disappear, and Eddie writes personal replies instead ("I will call you back shortly").

A student, job seeker, freelancer, parent or volunteer can use Eddie without pretending to be a company.

---

## 3. How it works, in three steps

1. **Your details.** Who this is for, what the assistant should be called, your role from a long list, town, hours and WhatsApp number. Business mode also asks about payment and delivery.
2. **What you sell or know.** Products with prices, then the questions you answer every day with the answers you want given.
3. **Your assistant.** A live chat to test it, plus a copy-and-paste kit.

The assistant name is editable, so it can be Eddie, or named after the owner.

---

## 4. What you get out

1. **A test chat** that behaves like WhatsApp, so the owner can be convinced before paying.
2. **Greeting message** — sent automatically to anyone who messages first.
3. **Away message** — for closed hours, so customers get an answer instead of silence.
4. **Quick replies** — price list, how to pay, delivery rules, how to order (or personal versions such as call back, send details, busy now).
5. **Download my kit** — the whole set as a text file to keep or print.
6. **Open my chat link** — a wa.me link a business can put on a flyer, Instagram bio or WhatsApp status.

Everything is copy-paste into the free WhatsApp Business app, under Settings, then Business tools. No developer, no API, no monthly fee from Meta.

---

## 5. The to-do list

A second tab. Add a task, tick it when done, delete it, clear the finished ones. A progress bar shows how much of the day is finished. Tasks stay on the device, so no account and no sign-up.

This is what makes Eddie more than a reply generator: it is the owner's own working desk.

---

## 6. Categories

The role list covers retail and trade, engineering (chemical, civil, mechanical, electrical, electronics, software, petroleum, gas, mining, agricultural, structural, environmental, biomedical, mechatronics, computer, telecommunications, metallurgical, industrial, production, water and sanitation, geotechnical, marine, automotive, aeronautical), law and medicine, education, technology and creative work, health and wellness, transport and logistics, faith and community groups, and personal use.

Around 120 roles in all, so almost anyone can find themselves in the list.

---

## 7. Privacy

1. Everything is saved in the browser on that device. No account, no server database.
2. No customer conversation is stored anywhere.
3. Nothing is sent to any outside service unless the owner deliberately turns on AI mode with their own key.

That matters in Nigeria under the NDPA: the simplest way to protect customer data is to never collect it.

---

## 8. Optional AI mode

Under "Advanced", an owner can paste an OpenAI-compatible endpoint, a model name and a key (OpenAI, Groq or similar). When set, questions outside the scripted answers are sent to that model, with the business's real prices and rules included as facts.

Two rules:
1. Scripted answers always come first, so a price is never invented.
2. For a paying client, leave AI mode off unless you control the billing; scripted replies are free, instant and always correct.

---

## 9. What Eddie does not do

1. **It does not send WhatsApp messages by itself.** That needs the Meta WhatsApp Cloud API and a verified business account. Today Eddie prepares and answers; the owner pastes or the business app handles it.
2. **It does not sync between devices.** Saved per browser.
3. **It does not take payments.** It tells customers how to pay, but no money moves through Eddie.
4. **It does not handle voice notes or images** sent by customers.

---

## 10. How it is sold

1. **Setup fee** — ₦180,000 for a business, which includes filling everything in with them and testing it live.
2. **Monthly** — ₦25,000 for updates to prices, hours and answers, plus new quick replies as the business changes.
3. **Personal users** — free, or a small one-off, and it becomes the top of the funnel: a shop owner's child uses it first, then recommends it to the shop.
4. **Demo does the selling** — sit with the owner, type like a customer, let them watch their own business answer.

---

## 11. Running and deploying

Eddie is one static HTML file with no build step and no dependencies.

1. Open `index.html` in any browser to run it locally.
2. Deploy with `vercel deploy --prod` from the folder.
3. No environment variables are required.

---

## 12. Roadmap

1. Meta WhatsApp Cloud API, so replies send themselves.
2. Google Sheets logging through Composio, so every order lands in a sheet.
3. Voice note replies in English and Ibibio.
4. A landing page with prices, so it can be sold without a meeting.
5. Multi-language replies for Igbo, Yoruba and Hausa.

---

## 13. Ownership

Built by EdIdiong Orok. Part of the EduRise family of products.

Version 1.0, November 2026.
