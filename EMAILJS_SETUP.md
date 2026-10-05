# 📧 EmailJS সেটআপ গাইড - দইকো বাংলাদেশ

প্রতিটি অর্ডারের পর স্বয়ংক্রিয়ভাবে ইমেইল নোটিফিকেশন পেতে এই গাইড অনুসরণ করুন।

---

## ⚡ ১০ মিনিটে সেটআপ করুন

### ধাপ ১: EmailJS অ্যাকাউন্ট তৈরি করুন

1. [EmailJS](https://www.emailjs.com/) এ যান
2. **Sign Up** ক্লিক করুন
3. Google/GitHub দিয়ে সাইন আপ করুন বা ইমেইল দিয়ে অ্যাকাউন্ট তৈরি করুন
4. ফ্রি প্ল্যানে ২০০ ইমেইল/মাস পাঠাতে পারবেন

---

### ধাপ ২: Email Service সেটআপ করুন

1. EmailJS Dashboard এ **Email Services** এ যান
2. **Add New Service** ক্লিক করুন
3. **Gmail** সিলেক্ট করুন (অথবা আপনার পছন্দের email provider)
4. আপনার Gmail অ্যাকাউন্ট কানেক্ট করুন
5. Service এর নাম দিন: `service_doico` (অথবা যেকোনো নাম)
6. **Service ID** কপি করুন (যেমন: `service_abc123`)

---

### ধাপ ৩: Email Template তৈরি করুন

1. Dashboard এ **Email Templates** এ যান
2. **Create New Template** ক্লিক করুন
3. এই তথ্যগুলো দিন:

#### Template Content:

**Subject:**
```
🍶 নতুন অর্ডার - দইকো বাংলাদেশ | {{order_id}}
```

**Content (HTML):**
```html
<html>
<body style="font-family: 'Noto Sans Bengali', sans-serif; background-color: #fefdf8; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #b45309, #92400e); padding: 30px; text-align: center; color: white;">
      <h1 style="margin: 0; font-size: 28px;">🍶 দইকো বাংলাদেশ</h1>
      <p style="margin: 5px 0 0; opacity: 0.9;">নতুন অর্ডার এসেছে!</p>
    </div>
    
    <!-- Order Info -->
    <div style="padding: 30px;">
      
      <!-- Order ID & Time -->
      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0; color: #78350f;">
          <strong>অর্ডার নম্বর:</strong> {{order_id}}<br>
          <strong>সময়:</strong> {{order_time}}
        </p>
      </div>
      
      <!-- Customer Info -->
      <h2 style="color: #78350f; border-bottom: 2px solid #fde68a; padding-bottom: 10px;">👤 গ্রাহকের তথ্য</h2>
      <table style="width: 100%; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; color: #57534e;"><strong>নাম:</strong></td>
          <td style="padding: 8px 0; color: #292524;">{{customer_name}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #57534e;"><strong>মোবাইল:</strong></td>
          <td style="padding: 8px 0; color: #292524;">{{customer_phone}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #57534e;"><strong>ঠিকানা:</strong></td>
          <td style="padding: 8px 0; color: #292524;">{{customer_address}}</td>
        </tr>
      </table>
      
      <!-- Order Details -->
      <h2 style="color: #78350f; border-bottom: 2px solid #fde68a; padding-bottom: 10px;">🛒 অর্ডার বিবরণ</h2>
      <div style="background: #fefdf8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0; white-space: pre-line; color: #292524;">{{items}}</p>
      </div>
      
      <!-- Delivery Info -->
      <h2 style="color: #78350f; border-bottom: 2px solid #fde68a; padding-bottom: 10px;">🚚 ডেলিভারি তথ্য</h2>
      <table style="width: 100%; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; color: #57534e;"><strong>ডেলিভারি এলাকা:</strong></td>
          <td style="padding: 8px 0; color: #292524;">{{delivery_area}}</td>
        </tr>
      </table>
      
      <!-- Total -->
      <div style="background: linear-gradient(135deg, #b45309, #92400e); padding: 20px; border-radius: 8px; text-align: center; color: white;">
        <table style="width: 100%; color: white;">
          <tr>
            <td style="padding: 5px 0; text-align: left;">পণ্যের মোট:</td>
            <td style="padding: 5px 0; text-align: right;">{{subtotal}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; text-align: left;">ডেলিভারি চার্জ:</td>
            <td style="padding: 5px 0; text-align: right;">{{delivery_charge}}</td>
          </tr>
          <tr style="border-top: 2px solid rgba(255,255,255,0.3);">
            <td style="padding: 10px 0 0; text-align: left; font-size: 20px; font-weight: bold;">সর্বমোট:</td>
            <td style="padding: 10px 0 0; text-align: right; font-size: 24px; font-weight: bold;">{{total}}</td>
          </tr>
        </table>
      </div>
      
    </div>
    
    <!-- Footer -->
    <div style="background: #292524; padding: 20px; text-align: center; color: #fef3c7;">
      <p style="margin: 0; font-size: 14px;">
        <strong>দইকো বাংলাদেশ</strong><br>
        বগুড়ার দইয়ের নতুন ঠিকানা<br>
        📞 01623-858009
      </p>
    </div>
    
  </div>
</body>
</html>
```

**To Email:**
```
{{to_email}}
```

4. **Save Template** ক্লিক করুন
5. **Template ID** কপি করুন (যেমন: `template_xyz789`)

---

### ধাপ ৪: Public Key কপি করুন

1. Dashboard এ **Account** > **General** এ যান
2. **Public Key** সেকশনে যান
3. Public Key কপি করুন (যেমন: `user_abc123xyz`)

---

### ধাপ ৫: ওয়েবসাইটে কনফিগার করুন

`src/App.tsx` ফাইলে `CONFIG` অবজেক্ট খুঁজুন এবং আপনার তথ্য দিন:

```typescript
const CONFIG = {
  // Google Sheets Web App URL
  GOOGLE_SHEETS_URL: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
  
  // EmailJS Configuration
  EMAIL_SERVICE_ID: "service_abc123",      // আপনার Service ID
  EMAIL_TEMPLATE_ID: "template_xyz789",    // আপনার Template ID
  EMAIL_PUBLIC_KEY: "user_abc123xyz",      // আপনার Public Key
  EMAIL_TO: "doicobangladesh@gmail.com",   // নোটিফিকেশন কোন ইমেইলে যাবে
};
```

---

### ধাপ ৬: ওয়েবসাইট রি-ডিপ্লয় করুন

```bash
npm run build
```

অথবা আপনার hosting platform এ deploy করুন

---

## ✅ টেস্ট করুন

1. ওয়েবসাইটে একটি টেস্ট অর্ডার প্লেস করুন
2. আপনার ইমেইলে (doicobangladesh@gmail.com) নোটিফিকেশন চেক করুন
3. সুন্দর ফরম্যাটেড ইমেইল পাবেন!

---

## 📊 EmailJS ফ্রি প্ল্যান

- ✅ ২০০ ইমেইল/মাস ফ্রি
- ✅ ২টি Email Service
- ✅ ২টি Email Template
- ✅ Community support

অর্ডার সংখ্যা বাড়লে পেইড প্ল্যানে আপগ্রেড করতে পারবেন।

---

## 🔒 নিরাপত্তা

- Public Key ওয়েবসাইটে রাখা নিরাপদ (এটি public key)
- Service ID ও Template ID ও ওয়েবসাইটে রাখা যায়
- আপনার Gmail password কখনো কোডে দেবেন না

---

## 🆘 সমস্যা সমাধান

### ইমেইল যাচ্ছে না?
1. Browser Console (F12) চেক করুন
2. EmailJS Dashboard এ **History** দেখুন
3. Service ও Template সঠিকভাবে কনফিগার হয়েছে কিনা দেখুন

### "Unauthorized" error?
- Public Key সঠিক কিনা চেক করুন
- EmailJS অ্যাকাউন্ট verify হয়েছে কিনা দেখুন

### Template variables কাজ করছে না?
- Template এ `{{variable_name}}` সঠিকভাবে লেখা আছে কিনা দেখুন
- কোডে পাঠানো variable এর নাম মিলছে কিনা দেখুন

---

## 📧 ইমেইল নমুনা

আপনি এইরকম সুন্দর ইমেইল পাবেন:

```
Subject: 🍶 নতুন অর্ডার - দইকো বাংলাদেশ | DC-LX7F2A

┌─────────────────────────────────────┐
│  🍶 দইকো বাংলাদেশ                    │
│  নতুন অর্ডার এসেছে!                  │
├─────────────────────────────────────┤
│  অর্ডার নম্বর: DC-LX7F2A            │
│  সময়: ১৫/০১/২০২৪, ২:৩০ PM         │
├─────────────────────────────────────┤
│  👤 গ্রাহকের তথ্য                    │
│  নাম: রহিম উদ্দিন                   │
│  মোবাইল: 01712345678                │
│  ঠিকানা: মিরপুর, ঢাকা               │
├─────────────────────────────────────┤
│  🛒 অর্ডার বিবরণ                    │
│  মিষ্টি দই × ২ = ৳১৬০             │
│  টক দই × ১ = ৳৬০                   │
├─────────────────────────────────────┤
│  🚚 ডেলিভারি: ঢাকার ভিতরে           │
├─────────────────────────────────────┤
│  💰 সর্বমোট: ৳২৮০                   │
└─────────────────────────────────────┘
```

---

## 🎯 এখন আপনার অর্ডার নোটিফিকেশন সিস্টেম

✅ **Google Sheets** - সব অর্ডার সেভ হবে  
✅ **Email Notification** - প্রতিটি অর্ডারের ইমেইল নোটিফিকেশন  
✅ **সম্পূর্ণ স্বয়ংক্রিয়** - কোনো ম্যানুয়াল কাজ নেই  

---

**দইকো বাংলাদেশ** 🍶  
বগুড়ার দইয়ের নতুন ঠিকানা
