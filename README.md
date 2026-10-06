# 🍶 দইকো বাংলাদেশ

**বগুড়ার দইয়ের নতুন ঠিকানা**

🌐 **লাইভ ওয়েবসাইট:** [https://aanneion.github.io/DoiCo/](https://aanneion.github.io/DoiCo/)

---

## 📦 অর্ডার নোটিফিকেশন সিস্টেম

### ১. Google Sheets ✅
সব অর্ডার স্বয়ংক্রিয়ভাবে Google Sheets-এ সেভ হয়।

**আপনার শিট:** https://docs.google.com/spreadsheets/d/1B6bOTS_84E_mZd6_JXbReUsyIEP5tLo7Ht7a2POhpzY/edit

### ২. Email Notification ✅
প্রতিটি অর্ডারের পর স্বয়ংক্রিয়ভাবে ইমেইল নোটিফিকেশন যায় (EmailJS দিয়ে)।

**সেটআপ গাইড:** [EMAILJS_SETUP.md](./EMAILJS_SETUP.md)

---

## 🚀 ডেভেলপমেন্ট

### লোকাল ডেভেলপমেন্ট

```bash
# ডিপেন্ডেন্সি ইনস্টল করুন
npm install

# ডেভেলপমেন্ট সার্ভার চালান
npm run dev

# প্রোডাকশন বিল্ড তৈরি করুন
npm run build
```

### GitHub Pages-এ ডিপ্লয়

এই প্রজেক্ট **GitHub Pages**-এ হোস্ট করা হয়েছে। স্বয়ংক্রিয় ডিপ্লয়মেন্ট সেটআপ করা আছে।

#### প্রথমবার সেটআপ:

1. **GitHub Repository Settings-এ যান**
   - Repository-এ যান
   - **Settings** ট্যাবে ক্লিক করুন
   - বাম পাশে **Pages** সেকশনে যান

2. **Source সিলেক্ট করুন**
   - **Source** এ **GitHub Actions** সিলেক্ট করুন

3. **কোড Push করুন**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

4. **Actions ট্যাবে যান**
   - **Actions** ট্যাবে ক্লিক করুন
   - "Deploy to GitHub Pages" workflow চলতে দেখবেন
   - সফল হলে আপনার সাইট লাইভ হবে

#### সাইটের URL:
```
https://aanneion.github.io/DoiCo/
```

---

## 📁 প্রজেক্ট স্ট্রাকচার

```
DoiCo/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions workflow
├── public/
│   └── images/                 ← ইমেজ ফাইল (GitHub থেকে লোড হয়)
├── src/
│   ├── App.tsx                 ← মূল অ্যাপ
│   ├── index.css               ← স্টাইল
│   └── main.tsx                ← এন্ট্রি পয়েন্ট
├── index.html                  ← HTML টেমপ্লেট
├── package.json                ← ডিপেন্ডেন্সি
├── vite.config.js              ← Vite কনফিগ (base: '/DoiCo/')
└── README.md                   ← এই ফাইল
```

---

## 🛠️ কনফিগারেশন

### Google Sheets URL
`src/App.tsx` এ `CONFIG.GOOGLE_SHEETS_URL` আপডেট করুন:

```typescript
const CONFIG = {
  GOOGLE_SHEETS_URL: "YOUR_GOOGLE_SHEETS_URL",
  // ...
};
```

### EmailJS সেটআপ
`src/App.tsx` এ EmailJS credentials দিন:

```typescript
const CONFIG = {
  EMAIL_SERVICE_ID: "YOUR_SERVICE_ID",
  EMAIL_TEMPLATE_ID: "YOUR_TEMPLATE_ID",
  EMAIL_PUBLIC_KEY: "YOUR_PUBLIC_KEY",
  EMAIL_TO: "doicobangladesh@gmail.com",
};
```

**বিস্তারিত গাইড:** [EMAILJS_SETUP.md](./EMAILJS_SETUP.md)

---

## 🎨 ফিচারসমূহ

- ✅ মোবাইল-ফার্স্ট ডিজাইন
- ✅ বাংলা ভাষায় সম্পূর্ণ UI
- ✅ প্রোডাক্ট গ্যালারি (একাধিক ছবি)
- ✅ অর্ডার সিস্টেম
- ✅ Google Sheets ইন্টিগ্রেশন
- ✅ Email নোটিফিকেশন
- ✅ WhatsApp যোগাযোগ
- ✅ ৩টি ডেলিভারি জোন (ঢাকার ভিতরে, বাইরে, বাকৃবি)
- ✅ GitHub Pages ডিপ্লয়মেন্ট

---

## 📞 যোগাযোগ

- **WhatsApp:** 01623-858009
- **Email:** doicobangladesh@gmail.com
- **Facebook:** [DoiCo Bangladesh](https://www.facebook.com/profile.php?id=61592847131521)

---

## 📝 লাইসেন্স

© ২০২৪ দইকো বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত।

---

**দইকো বাংলাদেশ** 🍶  
বগুড়ার দইয়ের নতুন ঠিকানা
