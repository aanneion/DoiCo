# 🚀 Google Sheets সেটআপ গাইড - দ্রুত শুরু

আপনার শিট: https://docs.google.com/spreadsheets/d/1B6bOTS_84E_mZd6_JXbReUsyIEP5tLo7Ht7a2POhpzY/edit

## ⚡ ৫ মিনিটে সেটআপ করুন

### ধাপ ১: আপনার Google Sheet এ যান
👉 [এখানে ক্লিক করুন](https://docs.google.com/spreadsheets/d/1B6bOTS_84E_mZd6_JXbReUsyIEP5tLo7Ht7a2POhpzY/edit)

### ধাপ ২: Apps Script খুলুন
1. মেনু থেকে **Extensions** > **Apps Script** ক্লিক করুন
2. নতুন ট্যাবে Apps Script এডিটর খুলবে

### ধাপ ৩: কোড পেস্ট করুন
এডিটরে যে কোড আছে সেটি **সব মুছে ফেলুন** এবং এই কোড **পেস্ট** করুন:

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

### ধাপ ৪: সেভ করুন
- **File** > **Save** ক্লিক করুন (Ctrl+S)
- প্রজেক্টের নাম দিন: "দইকো অর্ডার"

### ধাপ ৫: Deploy করুন
1. ডান পাশে **Deploy** বাটনে ক্লিক করুন
2. **New deployment** সিলেক্ট করুন
3. ⚙️ গিয়ার আইকনে ক্লিক করুন, **Web app** সিলেক্ট করুন
4. নিচের সেটিংস দিন:
   - **Description:** দইকো অর্ডার
   - **Execute as:** Me
   - **Who has access:** Anyone
5. **Deploy** ক্লিক করুন
6. Google permission চাইবে - **Allow** দিন

### ধাপ ৬: URL কপি করুন
Deploy হলে একটি URL পাবেন:
```
https://script.google.com/macros/s/AKfycbx.../exec
```

**এই URL টি কপি করুন!**

### ধাপ ৭: ওয়েবসাইটে URL দিন
`src/App.tsx` ফাইলে এই লাইনটি খুঁজুন:

```typescript
GOOGLE_SHEETS_URL: "https://script.google.com/macros/s/AKfycbzX84E_mZd6_JXbReUsyIEP5tLo7Ht7a2POhpzY/exec",
```

আপনার কপি করা URL দিয়ে **প্রতিস্থাপন** করুন।

### ধাপ ৮: ওয়েবসাইট রি-ডিপ্লয় করুন
```bash
npm run build
```

---

## ✅ টেস্ট করুন

1. ওয়েবসাইটে একটি টেস্ট অর্ডার প্লেস করুন
2. Google Sheet এ গিয়ে রিফ্রেশ করুন
3. নতুন row দেখতে পাবেন!

---

## 📊 আপনার শিটে এই কলামগুলো থাকবে

| Order ID | Timestamp | Customer Name | Phone | Address | Delivery Area | Items | Subtotal | Delivery Charge | Total |
|----------|-----------|---------------|-------|---------|---------------|-------|----------|-----------------|-------|
| DC-LX7F2A | 2024-01-15 | রহিম উদ্দিন | 01712345678 | মিরপুর, ঢাকা | ঢাকার ভিতরে | মিষ্টি দই x2 | 220 | 60 | 280 |

---

## 🆘 সমস্যা হলে

### "Permission denied" error?
- Apps Script এ **Deploy** > **Manage deployments** যান
- সর্বশেষ deployment এ **Edit** (পেন্সিল আইকন) ক্লিক করুন
- **Version** এ **New version** সিলেক্ট করুন
- **Who has access** আবার **Anyone** দিন
- **Deploy** ক্লিক করুন

### ডেটা শিটে যাচ্ছে না?
- Browser Console (F12) চেক করুন
- Apps Script > **Executions** ট্যাবে error log দেখুন

---

**ব্যাস! আপনার Google Sheets সেটআপ সম্পন্ন!** 🎉
