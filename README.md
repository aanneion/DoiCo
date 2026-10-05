# 🍶 দইকো বাংলাদেশ

**বগুড়ার দইয়ের নতুন ঠিকানা**

## অর্ডার ট্র্যাকিং

### ১. WhatsApp নোটিফিকেশন ✅
প্রতিটি অর্ডার স্বয়ংক্রিয়ভাবে WhatsApp-এ (01623-858009) নোটিফিকেশন পাঠায়।

### ২. Google Sheets ✅
সব অর্ডার স্বয়ংক্রিয়ভাবে Google Sheets-এ সেভ হয়।

**আপনার শিট:** https://docs.google.com/spreadsheets/d/1B6bOTS_84E_mZd6_JXbReUsyIEP5tLo7Ht7a2POhpzY/edit

**সেটআপ গাইড:** [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) দেখুন

---

## সেটআপ

### Google Sheets কনফিগার করুন

1. `GOOGLE_SHEETS_SETUP.md` গাইড অনুসরণ করে Apps Script deploy করুন
2. Deployed URL টি `src/App.tsx` এ `CONFIG.GOOGLE_SHEETS_URL` এ পেস্ট করুন
3. `npm run build` করে ডিপ্লয় করুন

### WhatsApp নম্বর পরিবর্তন

`src/App.tsx` এ `CONFIG.WHATSAPP_NUMBER` পরিবর্তন করুন:

```typescript
const CONFIG = {
  WHATSAPP_NUMBER: "8801623858009", // আপনার নম্বর
  GOOGLE_SHEETS_URL: "YOUR_APPS_SCRIPT_URL",
};
```

---

## ডেভেলপমেন্ট

```bash
npm install
npm run dev
```

## বিল্ড

```bash
npm run build
```
