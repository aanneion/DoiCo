# 🚀 GitHub-এ আপডেট করার গাইড

## 📋 প্রথমে চেক করুন

আপনার প্রজেক্টে Git সেটআপ আছে কিনা দেখুন:

```bash
git status
```

যদি Git সেটআপ না থাকে, নিচের ধাপগুলো অনুসরণ করুন।

---

## 🆕 নতুন করে Git সেটআপ করতে হলে

### ধাপ ১: Git initialize করুন
```bash
git init
```

### ধাপ ২: .gitignore ফাইল তৈরি করুন
```bash
echo "node_modules/" > .gitignore
echo "dist/" >> .gitignore
echo ".env" >> .gitignore
```

### ধাপ ৩: প্রথম commit করুন
```bash
git add .
git commit -m "Initial commit - DoiCo Bangladesh website"
```

### ধাপ ৪: GitHub-এ repository তৈরি করুন
1. [GitHub](https://github.com) এ যান
2. **New repository** ক্লিক করুন
3. Repository এর নাম দিন: `doico-bangladesh`
4. **Public** বা **Private** সিলেক্ট করুন
5. **Create repository** ক্লিক করুন
6. যে URL পাবেন সেটি কপি করুন (যেমন: `https://github.com/yourusername/doico-bangladesh.git`)

### ধাপ ৫: GitHub-এ push করুন
```bash
git remote add origin https://github.com/YOUR_USERNAME/doico-bangladesh.git
git branch -M main
git push -u origin main
```

---

## 🔄 পরিবর্তন আপডেট করতে হলে (যদি Git আগে থেকেই সেটআপ থাকে)

### ধাপ ১: পরিবর্তন চেক করুন
```bash
git status
```

### ধাপ ২: সব পরিবর্তন add করুন
```bash
git add .
```

### ধাপ ৩: Commit করুন
```bash
git commit -m "Update: Add product images and gallery feature"
```

### ধাপ ৪: GitHub-এ push করুন
```bash
git push origin main
```

---

## 📝 Commit Message এর উদাহরণ

আপনার পরিবর্তন অনুযায়ী commit message দিন:

```bash
# প্রোডাক্ট আপডেট করলে
git commit -m "Update: Add cup doi and sora doi products"

# ইমেজ গ্যালারি যোগ করলে
git commit -m "Feature: Add image gallery for sora/pot"

# ডেলিভারি জোন যোগ করলে
git commit -m "Feature: Add BAU delivery zone with free delivery"

# WhatsApp সরিয়ে Email যোগ করলে
git commit -m "Update: Remove WhatsApp, add EmailJS notification"

# সব পরিবর্তন একসাথে
git commit -m "Update: Complete product and notification system overhaul"
```

---

## 🖼️ ইমেজ ফাইলগুলো GitHub-এ রাখতে হলে

### গুরুত্বপূর্ণ:
GitHub-এ বড় ফাইল রাখা ভালো নয়। ইমেজগুলো আলাদা রাখুন:

### উপায় ১: ইমেজ GitHub-এ রাখুন (ছোট ইমেজের জন্য)
```bash
git add public/images/
git commit -m "Add product images"
git push origin main
```

### উপায় ২: ইমেজ আলাদা রাখুন (বড় ইমেজের জন্য)
- ইমেজগুলো GitHub-এ না রেখে hosting এ রাখুন
- কোডে শুধু URL ব্যবহার করুন

---

## 🆘 সমস্যা হলে

### "Please tell me who you are" error?
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### "rejected" error?
```bash
git pull origin main
git push origin main
```

### Authentication error?
- GitHub Personal Access Token ব্যবহার করুন
- অথবা GitHub CLI ব্যবহার করুন: `gh auth login`

---

## ✅ চেকলিস্ট

- [ ] Git initialize করেছেন (`git init`)
- [ ] .gitignore ফাইল তৈরি করেছেন
- [ ] GitHub-এ repository তৈরি করেছেন
- [ ] Remote add করেছেন
- [ ] প্রথম commit করেছেন
- [ ] Push করেছেন
- [ ] GitHub-এ গিয়ে চেক করেছেন

---

## 📞 সাহায্য প্রয়োজন?

কোনো সমস্যা হলে:
1. Error message কপি করুন
2. Google করে সমাধান খুঁজুন
3. অথবা আমাকে জানান

---

**দইকো বাংলাদেশ** 🍶  
বগুড়ার দইয়ের নতুন ঠিকানা
