# 🍶 দইকো বাংলাদেশ

**বগুড়ার দইয়ের নতুন ঠিকানা**

## 📦 অর্ডার নোটিফিকেশন সিস্টেম

### ১. Google Sheets ✅
সব অর্ডার স্বয়ংক্রিয়ভাবে Google Sheets-এ সেভ হয়।

**আপনার শিট:** https://docs.google.com/spreadsheets/d/1B6bOTS_84E_mZd6_JXbReUsyIEP5tLo7Ht7Ht7a2POhpzY/edit

**সেটআপ গাইড:** [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

### ২. Email Notification ✅
প্রতিটি অর্ডারের পর স্বয়ংক্রিয়ভাবে ইমেইল নোটিফিকেশন যায়।

**সেটআপ গাইড:** [EMAILJS_SETUP.md](./EMAILJS_SETUP.md)

---

## 🚀 সেটআপ

### Google Sheets কনফিগার করুন

1. `GOOGLE_SHEETS_SETUP.md` গাইড অনুসরণ করুন
2. Apps Script deploy করে URL পান
3. `src/App.tsx` এ `GOOGLE_SHEETS_URL` আপডেট করুন

### Email Notification সেটআপ করুন

1. [EmailJS](https://www.emailjs.com/) এ অ্যাকাউন্ট তৈরি করুন
2. `EMAILJS_SETUP.md` গাইড অনুসরণ করুন
3. `src/App.tsx` এ EmailJS credentials দিন:

```typescript
const CONFIG = {
  GOOGLE_SHEETS_URL: "YOUR_GOOGLE_SHEETS_URL",
  EMAIL_SERVICE_ID: "YOUR_SERVICE_ID",
  EMAIL_TEMPLATE_ID: "YOUR_TEMPLATE_ID",
  EMAIL_PUBLIC_KEY: "YOUR_PUBLIC_KEY",
  EMAIL_TO: "doicobangladesh@gmail.com",
};
```

4. `npm run build` করে ডিপ্লয় করুন

---

## 💻 ডেভেলপমেন্ট

```bash
npm install
npm run dev
```

## 🏗️ বিল্ড

```bash
npm run build
```

---

## 📁 ফাইল স্ট্রাকচার

```
doico-bangladesh/
├── src/
│   ├── App.tsx              ← মূল অ্যাপ
│   ├── index.css            ← স্টাইল
│   └── main.tsx             ← এন্ট্রি পয়েন্ট
├── GOOGLE_SHEETS_SETUP.md   ← Google Sheets সেটআপ গাইড
├── EMAILJS_SETUP.md         ← Email সেটআপ গাইড
└── README.md                ← এই ফাইল
```

---

**দইকো বাংলাদেশ** 🍶  
বগুড়ার দইয়ের নতুন ঠিকানা
