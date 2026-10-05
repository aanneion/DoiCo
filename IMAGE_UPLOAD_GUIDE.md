# 🖼️ ইমেজ যোগ করার গাইড

## 📁 ধাপ ১: ইমেজ ফাইলগুলো রাখুন

আপনার ইমেজগুলো `public/images/` ফোল্ডারে রাখুন:

```
public/
└── images/
    ├── banner.png          ← DoiCo ব্যানার
    ├── mishti-doi.png      ← মিষ্টি দইয়ের ছবি
    ├── tok-doi.png         ← টক দইয়ের ছবি
    └── nolen-gur-doi.png   ← নলেন গুরের দইয়ের ছবি
```

### ইমেজের নামকরণ:
- ইংরেজিতে নাম দিন (কোনো স্পেস বা বাংলা অক্ষর নয়)
- ছোট হাতের অক্ষর ব্যবহার করুন
- উদাহরণ: `mishti-doi.png`, `banner.jpg`

### সাপোর্টেড ফরম্যাট:
- `.png` (সুপারিশকৃত)
- `.jpg` বা `.jpeg`
- `.webp` (সবচেয়ে ছোট সাইজ)

---

## 🎨 ধাপ ২: ব্যানার ইমেজ যোগ করুন

### হিরো সেকশনে ব্যানার যোগ করতে:

`src/App.tsx` ফাইলে এই লাইনটি খুঁজুন:

```typescript
<img src="https://image.qwenlm.ai/generated-images/..." alt="দইকো বাংলাদেশ" />
```

এটি পরিবর্তন করুন:

```typescript
<img src="/images/banner.png" alt="দইকো বাংলাদেশ" />
```

---

## 🍶 ধাপ ৩: প্রোডাক্ট ইমেজ যোগ করুন

### প্রোডাক্ট ডেটা আপডেট করুন:

`src/App.tsx` ফাইলে `products` অ্যারে খুঁজুন এবং ইমেজ URL আপডেট করুন:

```typescript
const products: Product[] = [
  {
    id: "mishti-doi-matir-bhar",
    name: "মিষ্টি দই (মাটির ভাঁড়)",
    description: "বগুড়ার ঐতিহ্যবাহী মিষ্টি দই, মাটির ভাঁড়ে পরিবেশিত। ক্যারামেলাইজড স্বাদে ভরপুর।",
    price: 80,
    image: "/images/mishti-doi.png",  // ← এখানে আপনার ইমেজের পাথ
    available: true,
  },
  {
    id: "plain-doi",
    name: "টক দই",
    description: "খাঁটি ও সতেজ টক দই। প্রতিদিনের স্বাস্থ্যকর খাবার।",
    price: 60,
    image: "/images/tok-doi.png",  // ← এখানে আপনার ইমেজের পাথ
    available: true,
  },
  {
    id: "nolen-gur-doi",
    name: "নলেন গুরের দই",
    description: "নলেন গুরের বিশেষ স্বাদে তৈরি প্রিমিয়াম দই। শীতের ঐতিহ্য।",
    price: 120,
    image: "/images/nolen-gur-doi.png",  // ← এখানে আপনার ইমেজের পাথ
    available: true,
  },
];
```

---

## 📏 ধাপ ৪: ইমেজ অপ্টিমাইজেশন (গুরুত্বপূর্ণ)

### ইমেজ সাইজ:
- **ব্যানার:** 1920×1080 px (বা এর কাছাকাছি)
- **প্রোডাক্ট:** 800×800 px (স্কয়ার)
- **ফাইল সাইজ:** 500KB এর কম রাখার চেষ্টা করুন

### ইমেজ অপ্টিমাইজ করার টুলস:
- [TinyPNG](https://tinypng.com/) - অনলাইনে কমপ্রেস করুন
- [Squoosh](https://squoosh.app/) - Google এর ফ্রি টুল
- Photoshop বা GIMP ব্যবহার করে

---

## ✅ ধাপ ৫: টেস্ট করুন

1. ইমেজগুলো `public/images/` ফোল্ডারে রাখুন
2. `src/App.tsx` এ পাথ আপডেট করুন
3. `npm run dev` চালান
4. ব্রাউজারে দেখুন ইমেজ লোড হচ্ছে কিনা

---

## 🆘 সমস্যা সমাধান

### ইমেজ লোড হচ্ছে না?
- পাথ সঠিক কিনা চেক করুন (`/images/filename.png`)
- ফাইলের নামে কোনো স্পেস বা বাংলা অক্ষর নেই তো?
- ফাইল এক্সটেনশন সঠিক কিনা দেখুন (.png, .jpg)

### ইমেজ খুব বড় দেখাচ্ছে?
- ইমেজ সাইজ কমিয়ে আনুন (800×800 px প্রোডাক্টের জন্য)
- TinyPNG দিয়ে কমপ্রেস করুন

### ইমেজ ছোট দেখাচ্ছে?
- বড় রেজোলিউশনের ইমেজ ব্যবহার করুন
- কমপক্ষে 800×800 px প্রোডাক্টের জন্য

---

## 💡 প্রো টিপস

### WebP ফরম্যাট ব্যবহার করুন:
```
banner.webp (ছোট সাইজ, ভালো কোয়ালিটি)
```

### ইমেজের নাম:
```
✅ ভালো: mishti-doi-matir-bhar.png
❌ খারাপ: মিষ্টি দই.png
❌ খারাপ: IMG_20240115_123456.jpg
```

### ফোল্ডার স্ট্রাকচার:
```
public/
└── images/
    ├── banner.png
    ├── products/
    │   ├── mishti-doi.png
    │   ├── tok-doi.png
    │   └── nolen-gur-doi.png
    └── logo.png
```

---

## 📝 উদাহরণ

### আপনার ফাইল:
```
public/images/my-doico-banner.jpg
public/images/my-mishti-doi.jpg
public/images/my-tok-doi.jpg
public/images/my-nolen-gur-doi.jpg
```

### কোডে ব্যবহার:
```typescript
// ব্যানার
<img src="/images/my-doico-banner.jpg" alt="দইকো বাংলাদেশ" />

// প্রোডাক্ট
{
  id: "mishti-doi-matir-bhar",
  name: "মিষ্টি দই (মাটির ভাঁড়)",
  image: "/images/my-mishti-doi.jpg",
  // ...
}
```

---

## 🚀 দ্রুত শুরু

1. ইমেজগুলো `public/images/` এ কপি করুন
2. `src/App.tsx` এ পাথ আপডেট করুন
3. `npm run build`
4. ডিপ্লয় করুন

**ব্যাস! আপনার নিজস্ব ইমেজ লাইভ!** 🎉

---

**দইকো বাংলাদেশ** 🍶  
বগুড়ার দইয়ের নতুন ঠিকানা
