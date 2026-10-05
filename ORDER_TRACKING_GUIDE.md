# দইকো বাংলাদেশ - অর্ডার ট্র্যাকিং সিস্টেম গাইড

## 📦 অর্ডার কোথায় যায়?

যখন কোনো গ্রাহক অর্ডার প্লেস করে, তখন অর্ডারটি **৩টি জায়গায়** সংরক্ষিত হয়:

### ১. WhatsApp নোটিফিকেশন (সক্রিয়)
- ✅ অর্ডার প্লেস হওয়ার সাথে সাথে আপনার WhatsApp-এ একটি মেসেজ যাবে
- 📱 নম্বর: **01623-858009**
- 📋 মেসেজে থাকবে:
  - অর্ডার নম্বর
  - গ্রাহকের নাম, ফোন, ঠিকানা
  - পণ্যের তালিকা ও পরিমাণ
  - মোট মূল্য
  - ডেলিভারি এলাকা

### ২. Admin Dashboard (সক্রিয়)
- 🌐 ওয়েবসাইটেই একটি অ্যাডমিন প্যানেল আছে
- 🔗 অ্যাক্সেস: `yoursite.com?admin=true` অথবা ফুটারের "অ্যাডমিন প্যানেল" লিংকে ক্লিক করুন
- 📊 ড্যাশবোর্ডে দেখতে পাবেন:
  - সব অর্ডারের তালিকা
  - মোট অর্ডার সংখ্যা
  - মোট আয়
  - গড় অর্ডার মূল্য
  - প্রতিটি অর্ডারের বিস্তারিত তথ্য
  - সার্চ ও ফিল্টার সুবিধা

### ৩. Google Sheets (ঐচ্ছিক - সেটআপ প্রয়োজন)
- 📊 সব অর্ডার স্বয়ংক্রিয়ভাবে Google Sheets-এ সেভ হবে
- 📈 সহজে অর্ডার ট্র্যাক ও বিশ্লেষণ করা যাবে

---

## 🔧 সেটআপ গাইড

### ✅ WhatsApp নোটিফিকেশন (ইতিমধ্যে সক্রিয়)

WhatsApp নোটিফিকেশন ইতিমধ্যে কনফিগার করা আছে। কোনো পরিবর্তন করতে হলে:

1. `src/App.tsx` ফাইল খুলুন
2. `CONFIG` অবজেক্ট খুঁজুন
3. `WHATSAPP_NUMBER` পরিবর্তন করুন (country code সহ, + ছাড়া)

```typescript
const CONFIG = {
  WHATSAPP_NUMBER: "8801623858009", // আপনার WhatsApp নম্বর
  // ...
};
```

---

### 📊 Google Sheets সেটআপ (ঐচ্ছিক)

Google Sheets-এ অর্ডার সেভ করতে চাইলে এই ধাপগুলো অনুসরণ করুন:

#### ধাপ ১: Google Sheet তৈরি করুন
1. [Google Sheets](https://sheets.google.com) এ যান
2. একটি নতুন শিট তৈরি করুন
3. প্রথম সারিতে এই হেডারগুলো দিন:
   - A1: `Order ID`
   - B1: `Timestamp`
   - C1: `Customer Name`
   - D1: `Phone`
   - E1: `Address`
   - F1: `Delivery Area`
   - G1: `Items`
   - H1: `Subtotal`
   - I1: `Delivery Charge`
   - J1: `Total`

#### ধাপ ২: Apps Script সেটআপ
1. শিটে `Extensions` > `Apps Script` ক্লিক করুন
2. এই কোড পেস্ট করুন:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.orderId,
      new Date(data.timestamp),
      data.customerName,
      data.phone,
      data.address,
      data.deliveryArea,
      data.items,
      data.subtotal,
      data.deliveryCharge,
      data.total
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({status: "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({status: "error", message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. `Deploy` > `New deployment` ক্লিক করুন
4. `Type` হিসেবে `Web app` সিলেক্ট করুন
5. `Execute as` এ `Me` সিলেক্ট করুন
6. `Who has access` এ `Anyone` সিলেক্ট করুন
7. `Deploy` ক্লিক করুন
8. যে URL পাবেন সেটি কপি করুন

#### ধাপ ৩: ওয়েবসাইটে কনফিগার করুন
1. `src/App.tsx` ফাইল খুলুন
2. `CONFIG` অবজেক্টে `GOOGLE_SHEETS_URL` এ আপনার URL পেস্ট করুন:

```typescript
const CONFIG = {
  WHATSAPP_NUMBER: "8801623858009",
  GOOGLE_SHEETS_URL: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
  // ...
};
```

3. ওয়েবসাইট রি-ডিপ্লয় করুন

---

### 📧 Email নোটিফিকেশন (ঐচ্ছিক - EmailJS ব্যবহার করে)

EmailJS ব্যবহার করে ইমেইল নোটিফিকেশন সেটআপ করতে:

1. [EmailJS](https://www.emailjs.com/) এ অ্যাকাউন্ট তৈরি করুন
2. একটি Email Service সেটআপ করুন (Gmail, Outlook ইত্যাদি)
3. একটি Email Template তৈরি করুন
4. Service ID, Template ID, এবং Public Key কপি করুন
5. `src/App.tsx` এ `CONFIG` অবজেক্টে এই তথ্যগুলো দিন:

```typescript
const CONFIG = {
  WHATSAPP_NUMBER: "8801623858009",
  GOOGLE_SHEETS_URL: "YOUR_URL",
  EMAIL_SERVICE_ID: "your_service_id",
  EMAIL_TEMPLATE_ID: "your_template_id",
  EMAIL_PUBLIC_KEY: "your_public_key",
};
```

6. EmailJS SDK ইনস্টল করুন:
```bash
npm install @emailjs/browser
```

7. `submitOrder` ফাংশনে EmailJS কোড যোগ করুন (নিচে উদাহরণ দেওয়া আছে)

---

## 🔐 অ্যাডমিন প্যানেল অ্যাক্সেস

### পদ্ধতি ১: URL Parameter
```
https://yoursite.com?admin=true
```

### পদ্ধতি ২: ফুটার লিংক
- ওয়েবসাইটের একদম নিচে ফুটারে "অ্যাডমিন প্যানেল" লিংকে ক্লিক করুন

### অ্যাডমিন প্যানেলে যা যা দেখতে পাবেন:
- ✅ মোট অর্ডার সংখ্যা
- ✅ মোট আয়
- ✅ গড় অর্ডার মূল্য
- ✅ সব অর্ডারের তালিকা
- ✅ প্রতিটি অর্ডারের বিস্তারিত তথ্য
- ✅ সার্চ ও ফিল্টার সুবিধা
- ✅ অর্ডার মুছে ফেলার অপশন

---

## 💡 গুরুত্বপূর্ণ তথ্য

### ডেটা সংরক্ষণ
- অর্ডারগুলো ব্রাউজারের **localStorage**-এ সেভ হয়
- ⚠️ ব্রাউজার ডেটা ক্লিয়ার করলে অর্ডার মুছে যাবে
- ✅ Google Sheets সেটআপ করলে ব্যাকআপ থাকবে

### নিরাপত্তা
- অ্যাডমিন প্যানেল বর্তমানে পাবলিক
- 🔒 প্রোডাকশনে password protection যোগ করা উচিত
- Google Sheets URL গোপন রাখুন

### সমস্যা সমাধান

**WhatsApp মেসেজ যাচ্ছে না?**
- WhatsApp নম্বর সঠিক আছে কিনা চেক করুন (country code সহ)
- WhatsApp Web/Desktop ইনস্টল আছে কিনা নিশ্চিত করুন

**Google Sheets-এ ডেটা যাচ্ছে না?**
- Apps Script সঠিকভাবে deploy হয়েছে কিনা চেক করুন
- URL সঠিক আছে কিনা নিশ্চিত করুন
- Browser console-এ error দেখুন

**অ্যাডমিন প্যানেল খালি দেখাচ্ছে?**
- অর্ডারগুলো localStorage-এ আছে কিনা চেক করুন
- Browser DevTools > Application > Local Storage দেখুন

---

## 🚀 পরবর্তী উন্নয়ন

ভবিষ্যতে এই ফিচারগুলো যোগ করা যেতে পারে:

1. **Firebase/Supabase Integration** - রিয়েল-টাইম ডাটাবেস
2. **SMS নোটিফিকেশন** - SSL Wireless বা BulkSMSBD ব্যবহার করে
3. **Admin Login** - পাসওয়ার্ড প্রোটেক্টেড অ্যাডমিন প্যানেল
4. **Order Status** - Pending, Confirmed, Delivered ইত্যাদি
5. **Analytics Dashboard** - বিস্তারিত রিপোর্ট ও গ্রাফ
6. **Inventory Management** - স্টক ট্র্যাকিং
7. **Customer Database** - গ্রাহকদের ইতিহাস

---

## 📞 সাহায্য প্রয়োজন?

কোনো সমস্যা হলে বা কাস্টম ফিচার যোগ করতে চাইলে যোগাযোগ করুন।

---

**দইকো বাংলাদেশ** 🍶  
বগুড়ার দইয়ের নতুন ঠিকানা
