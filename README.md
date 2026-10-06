# 🍶 দইকো বাংলাদেশ

**বগুড়ার দইয়ের নতুন ঠিকানা**

একটি প্রিমিয়াম, মোবাইল-ফার্স্ট বাংলা ল্যান্ডিং পেজ দইকো বাংলাদেশের জন্য।

## 🚀 ফিচারসমূহ

- ✅ মোবাইল-ফার্স্ট ডিজাইন
- ✅ বাংলা ভাষায় সম্পূর্ণ UI
- ✅ প্রোডাক্ট গ্যালারি
- ✅ অর্ডার সিস্টেম
- ✅ Google Sheets ইন্টিগ্রেশন
- ✅ Email নোটিফিকেশন (EmailJS)
- ✅ WhatsApp যোগাযোগ
- ✅ ৩টি ডেলিভারি জোন (ঢাকার ভিতরে, বাইরে, বাকৃবি)

## 🛠️ টেকনোলজি

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Lucide React** - Icons
- **EmailJS** - Email notifications

## 📦 ডেভেলপমেন্ট

```bash
# ডিপেন্ডেন্সি ইনস্টল
npm install

# ডেভেলপমেন্ট সার্ভার চালান
npm run dev

# প্রোডাকশন বিল্ড তৈরি করুন
npm run build
```

## 🌐 Cloudflare Pages এ ডিপ্লয়

### ধাপ ১: Cloudflare Dashboard এ যান
1. [dash.cloudflare.com](https://dash.cloudflare.com) এ লগইন করুন
2. বাম পাশের মেনু থেকে **Workers & Pages** ক্লিক করুন
3. **Create application** ক্লিক করুন
4. **Pages** ট্যাবে ক্লিক করুন
5. **Connect to Git** ক্লিক করুন

### ধাপ ২: GitHub Repository কানেক্ট করুন
1. আপনার GitHub account সিলেক্ট করুন
2. **DoiCo** repository সিলেক্ট করুন
3. **Begin setup** ক্লিক করুন

### ধাপ ৩: Build Settings কনফিগার করুন
নিচের সেটিংস দিন:

| Setting | Value |
|---------|-------|
| **Framework preset** | `Vite` (অথবা None) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (খালি রাখুন) |

### ধাপ ৪: Deploy করুন
1. **Save and Deploy** ক্লিক করুন
2. ২-৩ মিনিট অপেক্ষা করুন
3. আপনার সাইট লাইভ হবে!

### 🎯 আপনার সাইটের URL:
```
https://doico.pages.dev
```

## 🔄 স্বয়ংক্রিয় ডিপ্লয়মেন্ট

একবার সেটআপ হয়ে গেলে, প্রতিবার `main` branch এ push করলে Cloudflare Pages স্বয়ংক্রিয়ভাবে নতুন ভার্সন ডিপ্লয় করবে।

## 📧 Email Notification সেটআপ

Email নোটিফিকেশন পেতে [EmailJS](https://www.emailjs.com/) সেটআপ করুন:

1. EmailJS এ অ্যাকাউন্ট তৈরি করুন
2. Email Service সেটআপ করুন (Gmail)
3. Email Template তৈরি করুন
4. `src/App.tsx` এ `CONFIG` অবজেক্টে credentials দিন:

```typescript
const CONFIG = {
  GOOGLE_SHEETS_URL: "YOUR_GOOGLE_SHEETS_URL",
  EMAIL_SERVICE_ID: "your_service_id",
  EMAIL_TEMPLATE_ID: "your_template_id",
  EMAIL_PUBLIC_KEY: "your_public_key",
  EMAIL_TO: "doicobangladesh@gmail.com",
};
```

## 📊 Google Sheets সেটআপ

অর্ডার স্বয়ংক্রিয়ভাবে Google Sheets এ সেভ করতে:

1. Google Sheet তৈরি করুন
2. Extensions > Apps Script এ যান
3. এই কোড পেস্ট করুন:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.orderId, new Date(data.timestamp), data.customerName,
      data.phone, data.address, data.deliveryArea,
      data.items, data.subtotal, data.deliveryCharge, data.total
    ]);
    return ContentService.createTextOutput(JSON.stringify({status: "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({status: "error"}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Deploy > Web app সিলেক্ট করুন
5. URL কপি করে `CONFIG.GOOGLE_SHEETS_URL` এ পেস্ট করুন

## 📁 প্রজেক্ট স্ট্রাকচার

```
DoiCo/
├── public/
│   └── images/          # প্রোডাক্ট ইমেজ
├── src/
│   ├── App.tsx          # মূল অ্যাপ
│   ├── index.css        # স্টাইল
│   └── main.tsx         # এন্ট্রি পয়েন্ট
├── index.html           # HTML টেমপ্লেট
├── package.json         # ডিপেন্ডেন্সি
├── vite.config.js       # Vite কনফিগ
└── README.md            # এই ফাইল
```

## 📞 যোগাযোগ

- **WhatsApp:** 01623-858009
- **Email:** doicobangladesh@gmail.com
- **Facebook:** [DoiCo Bangladesh](https://www.facebook.com/profile.php?id=61592847131521)

## 📝 লাইসেন্স

© ২০২৪ দইকো বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত।

---

**দইকো বাংলাদেশ** 🍶  
বগুড়ার দইয়ের নতুন ঠিকানা
