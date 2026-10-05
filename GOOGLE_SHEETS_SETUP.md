# Google Sheets অর্ডার ট্র্যাকিং সেটআপ গাইড

এই গাইডটি আপনাকে ধাপে ধাপে দেখাবে কিভাবে Google Sheets-এ স্বয়ংক্রিয়ভাবে অর্ডার সেভ করবেন।

---

## 📋 প্রয়োজনীয় জিনিস

- ✅ Google Account
- ✅ ১০-১৫ মিনিট সময়
- ✅ আপনার ওয়েবসাইটের অ্যাক্সেস

---

## 🚀 ধাপ ১: Google Sheet তৈরি করুন

### ১.১ নতুন Sheet তৈরি করুন
1. [Google Sheets](https://sheets.google.com) এ যান
2. বাম পাশে `+ Blank` বা `ফাঁকা` এ ক্লিক করুন
3. শিটের নাম দিন: **"দইকো অর্ডার"**

### ১.২ হেডার সেটআপ করুন
প্রথম সারিতে (Row 1) এই হেডারগুলো লিখুন:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Order ID | Timestamp | Customer Name | Phone | Address | Delivery Area | Items | Subtotal | Delivery Charge | Total |

**টিপস:**
- হেডারগুলো **bold** করুন
- প্রথম সারি ফ্রিজ করুন (View > Freeze > 1 row)

---

## 🔧 ধাপ ২: Apps Script সেটআপ

### ২.১ Apps Script খুলুন
1. আপনার Google Sheet এ
2. মেনু থেকে `Extensions` > `Apps Script` ক্লিক করুন
3. একটি নতুন ট্যাব খুলবে

### ২.২ কোড পেস্ট করুন
Apps Script এডিটরে যে কোড আছে সেটি মুছে ফেলুন এবং এই কোড পেস্ট করুন:

```javascript
/**
 * দইকো বাংলাদেশ - অর্ডার ট্র্যাকিং সিস্টেম
 * Google Apps Script
 */

function doPost(e) {
  try {
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Append the order data as a new row
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
    
    // Format the timestamp column
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 2).setNumberFormat("yyyy-MM-dd HH:mm:ss");
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Order saved successfully",
        orderId: data.orderId
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - run this manually to test
function testDoPost() {
  var testData = {
    orderId: "TEST-001",
    timestamp: new Date().toISOString(),
    customerName: "টেস্ট গ্রাহক",
    phone: "01712345678",
    address: "ঢাকা, বাংলাদেশ",
    deliveryArea: "ঢাকার ভিতরে",
    items: "মিষ্টি দই x2, টক দই x1",
    subtotal: 220,
    deliveryCharge: 60,
    total: 280
  };
  
  var mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  var result = doPost(mockEvent);
  Logger.log(result.getContent());
}
```

### ২.৩ কোড সেভ করুন
1. `File` > `Save` ক্লিক করুন (Ctrl+S)
2. প্রজেক্টের নাম দিন: **"দইকো অর্ডার সিস্টেম"**

### ২.৪ টেস্ট করুন (ঐচ্ছিক)
1. ফাংশন ড্রপডাউন থেকে `testDoPost` সিলেক্ট করুন
2. `Run` বাটনে ক্লিক করুন
3. প্রয়োজনীয় permissions দিন
4. `View` > `Logs` চেক করুন - সফল হলে "Order saved successfully" দেখাবে
5. Google Sheet এ গিয়ে দেখুন নতুন row যোগ হয়েছে কিনা

---

## 🌐 ধাপ ৩: Web App Deploy করুন

### ৩.১ Deployment তৈরি করুন
1. Apps Script এ ডান পাশে `Deploy` বাটনে ক্লিক করুন
2. `New deployment` সিলেক্ট করুন

### ৩.২ Deployment Settings
1. **Type:** `Web app` সিলেক্ট করুন (গিয়ার আইকনে ক্লিক করুন)
2. **Description:** "দইকো অর্ডার API" লিখুন
3. **Execute as:** `Me (your-email@gmail.com)` সিলেক্ট করুন
4. **Who has access:** `Anyone` সিলেক্ট করুন

### ৩.৩ Deploy করুন
1. `Deploy` বাটনে ক্লিক করুন
2. Google আপনাকে permissions চাইবে - `Allow` দিন
3. একটি URL পাবেন যেটি দেখতে এরকম:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```
4. **এই URL টি কপি করুন** - এটিই আপনার API endpoint

---

## 🔗 ধাপ ৪: ওয়েবসাইটে কনফিগার করুন

### ৪.১ কোড এডিট করুন
আপনার প্রজেক্টের `src/App.tsx` ফাইল খুলুন

### ৪.২ CONFIG আপডেট করুন
`CONFIG` অবজেক্ট খুঁজুন এবং আপনার Google Sheets URL পেস্ট করুন:

```typescript
const CONFIG = {
  // WhatsApp number (with country code, no + or spaces)
  WHATSAPP_NUMBER: "8801623858009",
  
  // Google Sheets Web App URL
  GOOGLE_SHEETS_URL: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
  
  // Email configuration (optional)
  EMAIL_SERVICE_ID: "",
  EMAIL_TEMPLATE_ID: "",
  EMAIL_PUBLIC_KEY: "",
};
```

**গুরুত্বপূর্ণ:** `YOUR_SCRIPT_ID` এর জায়গায় আপনার কপি করা URL পেস্ট করুন

### ৪.৩ ওয়েবসাইট রি-ডিপ্লয় করুন
```bash
npm run build
```

অথবা আপনার hosting platform এ deploy করুন

---

## ✅ ধাপ ৫: টেস্ট করুন

### ৫.১ টেস্ট অর্ডার প্লেস করুন
1. আপনার ওয়েবসাইটে যান
2. একটি টেস্ট অর্ডার প্লেস করুন
3. অর্ডার সম্পূর্ণ করুন

### ৫.২ Google Sheet চেক করুন
1. আপনার Google Sheet এ যান
2. রিফ্রেশ করুন
3. নতুন row দেখতে পাবেন:
   - Order ID
   - Timestamp
   - Customer details
   - Items
   - Total amount

### ৫.৩ Troubleshooting
যদি ডেটা না আসে:

1. **Browser Console চেক করুন**
   - F12 চাপুন
   - Console ট্যাবে যান
   - কোনো error আছে কিনা দেখুন

2. **Apps Script Logs চেক করুন**
   - Apps Script এ যান
   - `Executions` ট্যাবে ক্লিক করুন
   - সর্বশেষ execution এ ক্লিক করুন
   - Error message দেখুন

3. **Permissions চেক করুন**
   - Apps Script এ `Deploy` > `Manage deployments`
   - সঠিক permissions আছে কিনা নিশ্চিত করুন

---

## 🎨 ধাপ ৬: Sheet ফরম্যাটিং (ঐচ্ছিক)

আপনার Google Sheet আরও সুন্দর ও ব্যবহারযোগ্য করতে:

### ৬.১ Conditional Formatting
1. `Total` কলাম (J) সিলেক্ট করুন
2. `Format` > `Conditional formatting`
3. Rule যোগ করুন:
   - "Greater than or equal to" 500
   - Background color: Light green

### ৬.২ Filter Views
1. প্রথম row সিলেক্ট করুন
2. `Data` > `Create a filter`
3. এখন আপনি সহজেই ফিল্টার ও সর্ট করতে পারবেন

### ৬.৩ Chart তৈরি করুন
1. ডেটা সিলেক্ট করুন
2. `Insert` > `Chart`
3. বিভিন্ন ধরনের chart তৈরি করুন:
   - Daily sales
   - Product-wise sales
   - Delivery area distribution

---

## 🔒 নিরাপত্তা টিপস

### ⚠️ গুরুত্বপূর্ণ
- Google Sheets URL কাউকে শেয়ার করবেন না
- URL জানলে যেকোনো কে ডেটা যোগ করতে পারবে

### 🔐 অতিরিক্ত নিরাপত্তা (ঐচ্ছিক)
Apps Script কোডে এই পরিবর্তন করুন:

```javascript
function doPost(e) {
  // Add secret key validation
  var SECRET_KEY = "your-secret-key-123";
  
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Validate secret key
    if (data.secretKey !== SECRET_KEY) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: "error",
          message: "Unauthorized"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // ... rest of the code
  }
}
```

এবং `src/App.tsx` এ:

```typescript
await fetch(CONFIG.GOOGLE_SHEETS_URL, {
  method: "POST",
  mode: "no-cors",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    secretKey: "your-secret-key-123", // Same as Apps Script
    // ... other data
  }),
});
```

---

## 📊 Sample Data Structure

আপনার Google Sheet এ ডেটা এরকম দেখাবে:

| Order ID | Timestamp | Customer Name | Phone | Address | Delivery Area | Items | Subtotal | Delivery Charge | Total |
|----------|-----------|---------------|-------|---------|---------------|-------|----------|-----------------|-------|
| DC-LX7F2A | 2024-01-15 14:30:00 | রহিম উদ্দিন | 01712345678 | মিরপুর, ঢাকা | ঢাকার ভিতরে | মিষ্টি দই x2, টক দই x1 | 220 | 60 | 280 |
| DC-LX7F2B | 2024-01-15 15:45:00 | করিম মিয়া | 01898765432 | চট্টগ্রাম সদর | ঢাকার বাইরে | নলেন গুরের দই x3 | 360 | 120 | 480 |

---

## 🎯 পরবর্তী ধাপ

Google Sheets সেটআপ সম্পন্ন হলে:

1. ✅ **WhatsApp নোটিফিকেশন** ইতিমধ্যে কাজ করছে
2. ✅ **Admin Dashboard** ওয়েবসাইটেই আছে
3. ✅ **Google Sheets** ব্যাকআপ ও ট্র্যাকিং
4. 🔜 **Email নোটিফিকেশন** যোগ করতে পারেন
5. 🔜 **SMS নোটিফিকেশন** যোগ করতে পারেন
6. 🔜 **Advanced Analytics** তৈরি করতে পারেন

---

## 📞 সাহায্য প্রয়োজন?

কোনো সমস্যা হলে:
1. Browser Console চেক করুন
2. Apps Script Executions logs দেখুন
3. Google Sheet permissions চেক করুন

---

**দইকো বাংলাদেশ** 🍶  
বগুড়ার দইয়ের নতুন ঠিকানা
