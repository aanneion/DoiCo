# 🚀 GitHub Pages-এ ডিপ্লয় করার সম্পূর্ণ গাইড

## ✅ স্বয়ংক্রিয় ডিপ্লয়মেন্ট সেটআপ করা আছে!

আপনার প্রজেক্টে ইতিমধ্যে **GitHub Actions workflow** সেটআপ করা আছে। এখন শুধু কিছু ধাপ অনুসরণ করুন।

---

## 📋 ধাপ ১: GitHub Repository Settings

### ১.১ Settings-এ যান
1. আপনার GitHub repository-তে যান: https://github.com/aanneion/DoiCo
2. **Settings** ট্যাবে ক্লিক করুন (উপরে ডান পাশে)

### ১.২ Pages সেকশনে যান
1. বাম পাশের মেনুতে **Pages** ক্লিক করুন
2. **Source** সেকশনে যান

### ১.৩ Source সিলেক্ট করুন
- **Source** ড্রপডাউন থেকে **GitHub Actions** সিলেক্ট করুন
- সেভ করার দরকার নেই

---

## 📋 ধাপ ২: কোড Push করুন

### Terminal-এ এই কমান্ডগুলো চালান:

```bash
# সব পরিবর্তন add করুন
git add .

# Commit করুন
git commit -m "Setup GitHub Pages deployment"

# GitHub-এ push করুন
git push origin main
```

---

## 📋 ধাপ ৩: Deploy হওয়া দেখুন

### ৩.১ Actions ট্যাবে যান
1. Repository-তে **Actions** ট্যাবে ক্লিক করুন
2. "Deploy to GitHub Pages" workflow দেখতে পাবেন
3. এটি চলছে কিনা দেখুন

### ৩.২ সফল হলে
- ✅ সবুজ চেকমার্ক দেখাবে
- আপনার সাইট লাইভ হবে

---

## 📋 ধাপ ৪: সাইট চেক করুন

### আপনার সাইটের URL:
```
https://aanneion.github.io/DoiCo/
```

**প্রথমবার ২-৩ মিনিট সময় লাগতে পারে।**

---

## 🔄 পরবর্তী আপডেট

যখনই আপনি কোড পরিবর্তন করবেন:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

**স্বয়ংক্রিয়ভাবে নতুন ভার্সন ডিপ্লয় হবে!** 🎉

---

## ⚠️ সমস্যা সমাধান

### সমস্যা: সাইট লোড হচ্ছে না

**সমাধান ১:** ৫ মিনিট অপেক্ষা করুন (প্রথমবার সময় লাগে)

**সমাধান ২:** Actions ট্যাবে গিয়ে error log চেক করুন

**সমাধান ৩:** Settings > Pages এ গিয়ে দেখুন:
- Source: GitHub Actions সিলেক্ট আছে কিনা
- Status: "Published" দেখাচ্ছে কিনা

### সমস্যা: CSS/JS লোড হচ্ছে না

**সমাধান:** `vite.config.js` এ `base` সেটিং চেক করুন:
```javascript
base: "/DoiCo/", // আপনার repository নাম
```

### সমস্যা: ইমেজ দেখা যাচ্ছে না

**সমাধান:** ইমেজগুলো `public/images/` ফোল্ডারে আছে কিনা চেক করুন।

---

## 📊 Deploy History দেখতে

1. **Actions** ট্যাবে যান
2. সব deploy দেখতে পাবেন
3. যেকোনো deploy এ ক্লিক করে details দেখুন

---

## 🎯 কাস্টম ডোমেইন (ঐচ্ছিক)

যদি আপনি কাস্টম ডোমেইন ব্যবহার করতে চান (যেমন: `doico.com.bd`):

### ধাপ ১: DNS সেটআপ
আপনার ডোমেইন provider-এ যান এবং এই records যোগ করুন:

**Type:** `CNAME`  
**Name:** `@`  
**Value:** `aanneion.github.io`

### ধাপ ২: GitHub Settings
1. Settings > Pages এ যান
2. **Custom domain** এ আপনার ডোমেইন লিখুন
3. **Save** ক্লিক করুন

### ধাপ ৩: CNAME ফাইল তৈরি করুন
`public/CNAME` ফাইল তৈরি করুন:
```
doico.com.bd
```

---

## ✅ চেকলিস্ট

- [ ] GitHub Settings > Pages এ গেছেন
- [ ] Source এ "GitHub Actions" সিলেক্ট করেছেন
- [ ] কোড push করেছেন (`git push origin main`)
- [ ] Actions ট্যাবে deploy চলছে দেখেছেন
- [ ] সাইট লাইভ হয়েছে চেক করেছেন
- [ ] URL কাজ করছে: https://aanneion.github.io/DoiCo/

---

## 🎉 ব্যাস! সম্পন্ন

এখন আপনার ওয়েবসাইট GitHub Pages-এ লাইভ!

**URL:** https://aanneion.github.io/DoiCo/

---

**দইকো বাংলাদেশ** 🍶  
বগুড়ার দইয়ের নতুন ঠিকানা
