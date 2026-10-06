# 🌐 Cloudflare Pages এ ডিপ্লয় করার সম্পূর্ণ গাইড

## ✅ প্রস্তুতি

আপনার repo এখন Cloudflare Pages এর জন্য প্রস্তুত:
- ✅ GitHub Pages ফাইল সরানো হয়েছে
- ✅ Vite config ঠিক করা হয়েছে
- ✅ Build সফল হয়েছে

---

## 🚀 ধাপ ১: GitHub এ Push করুন

Qwen Coder থেকে **"Sync"** বা **"Push"** বাটন ক্লিক করুন।

---

## 🚀 ধাপ ২: Cloudflare Pages এ যান

1. [dash.cloudflare.com](https://dash.cloudflare.com) এ লগইন করুন
2. বাম পাশের মেনু থেকে **"Workers & Pages"** ক্লিক করুন
3. **"Create application"** বাটনে ক্লিক করুন
4. **"Pages"** ট্যাবে ক্লিক করুন
5. **"Connect to Git"** ক্লিক করুন

---

## 🚀 ধাপ ৩: GitHub Repository কানেক্ট করুন

1. আপনার GitHub account সিলেক্ট করুন
2. **"DoiCo"** repository সিলেক্ট করুন
3. **"Begin setup"** ক্লিক করুন

---

## 🚀 ধাপ ৪: Build Settings কনফিগার করুন

নিচের সেটিংস দিন:

| Setting | Value |
|---------|-------|
| **Framework preset** | `Vite` (অথবা None) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (খালি রাখুন) |

### Environment Variables (ঐচ্ছিক)

যদি EmailJS বা Google Sheets সেটআপ করে থাকেন:

| Variable | Value |
|----------|-------|
| `GOOGLE_SHEETS_URL` | আপনার Google Sheets URL |
| `EMAIL_SERVICE_ID` | আপনার EmailJS Service ID |
| `EMAIL_TEMPLATE_ID` | আপনার EmailJS Template ID |
| `EMAIL_PUBLIC_KEY` | আপনার EmailJS Public Key |

---

## 🚀 ধাপ ৫: Deploy করুন

1. **"Save and Deploy"** ক্লিক করুন
2. ২-৩ মিনিট অপেক্ষা করুন
3. ✅ সবুজ চেকমার্ক দেখলে deploy সফল!

---

## 🎯 আপনার সাইটের URL

```
https://doico.pages.dev
```

অথবা আপনার পছন্দের নাম:
```
https://doico-bangladesh.pages.dev
```

---

## 🔄 স্বয়ংক্রিয় ডিপ্লয়মেন্ট

একবার সেটআপ হয়ে গেলে:
- ✅ `main` branch এ push করলে স্বয়ংক্রিয়ভাবে deploy হবে
- ✅ Preview deployments পাবেন প্রতিটি pull request এ
- ✅ Rollback করতে পারবেন যেকোনো সময়

---

## 🌍 কাস্টম ডোমেইন (ঐচ্ছিক)

যদি আপনি কাস্টম ডোমেইন ব্যবহার করতে চান (যেমন: `doico.com.bd`):

### ধাপ ১: Cloudflare Pages Settings এ যান
1. আপনার Pages project এ ক্লিক করুন
2. **"Custom domains"** ট্যাবে ক্লিক করুন
3. **"Set up a custom domain"** ক্লিক করুন

### ধাপ ২: ডোমেইন যোগ করুন
1. আপনার ডোমেইন লিখুন (যেমন: `doico.com.bd`)
2. **"Continue"** ক্লিক করুন
3. DNS records সেটআপ করুন

### ধাপ ৩: DNS সেটআপ
আপনার ডোমেইন provider এ এই records যোগ করুন:

**Type:** `CNAME`  
**Name:** `@`  
**Value:** `doico-bangladesh.pages.dev`

অথবা Cloudflare DNS ব্যবহার করলে স্বয়ংক্রিয়ভাবে সেটআপ হবে।

---

## 📊 Monitoring ও Analytics

### Cloudflare Dashboard এ:
1. আপনার Pages project এ ক্লিক করুন
2. **"Analytics"** ট্যাবে ক্লিক করুন
3. দেখুন:
   - কতজন ভিজিটর এসেছে
   - কোন পেজ বেশি দেখা হয়েছে
   - Bandwidth usage
   - Request counts

---

## 🔧 সমস্যা সমাধান

### ❌ Build failed
**সমাধান:**
1. Cloudflare Dashboard এ **"Deployments"** ট্যাবে যান
2. সর্বশেষ deployment এ ক্লিক করুন
3. **"Build logs"** দেখুন
4. Error message অনুযায়ী সমস্যা সমাধান করুন

### ❌ ইমেজ লোড হচ্ছে না
**সমাধান:**
1. চেক করুন ইমেজগুলো GitHub repo তে আছে কিনা
2. সঠিক branch name ব্যবহার করছেন কিনা দেখুন
3. Image URL সঠিক কিনা চেক করুন

### ❌ WhatsApp বাটন কাজ করছে না
**সমাধান:**
1. নম্বর সঠিক আছে কিনা চেক করুন (country code সহ)
2. `https://wa.me/8801623858009` ফরম্যাট ব্যবহার করুন

---

## 💡 প্রো টিপস

### ১. Preview Deployments
- প্রতিটি pull request এ preview URL পাবেন
- মার্জ করার আগে টেস্ট করতে পারবেন

### ২. Environment Variables
- সেন্সিটিভ তথ্য environment variables এ রাখুন
- কোডে hardcode করবেন না

### ৩. Custom 404 Page
- `public/404.html` ফাইল তৈরি করুন
- সুন্দর 404 পেজ দেখান

### ৪. Performance Optimization
- ইমেজ অপ্টিমাইজ করুন (TinyPNG ব্যবহার করুন)
- Lazy loading ব্যবহার করুন
- Code splitting ব্যবহার করুন

---

## 📞 সাহায্য প্রয়োজন?

### Cloudflare Documentation:
- [Pages Documentation](https://developers.cloudflare.com/pages/)
- [Build Configuration](https://developers.cloudflare.com/pages/platform/build-configuration/)
- [Custom Domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)

### Support:
- Cloudflare Community Forum
- Cloudflare Dashboard > Help

---

## ✅ চেকলিস্ট

- [ ] GitHub এ push করেছেন
- [ ] Cloudflare Pages এ গিয়েছেন
- [ ] GitHub repository কানেক্ট করেছেন
- [ ] Build settings কনফিগার করেছেন
- [ ] Deploy করেছেন
- [ ] সাইট চেক করেছেন
- [ ] কাস্টম ডোমেইন সেটআপ করেছেন (ঐচ্ছিক)

---

**ব্যাস! আপনার সাইট এখন Cloudflare Pages এ লাইভ!** 🎉

---

**দইকো বাংলাদেশ** 🍶  
বগুড়ার দইয়ের নতুন ঠিকানা
