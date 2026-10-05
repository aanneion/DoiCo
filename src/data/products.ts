export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
}

export const products: Product[] = [
  {
    id: "mishti-doi-matir-bhar",
    name: "মিষ্টি দই (মাটির ভাঁড়)",
    description: "বগুড়ার ঐতিহ্যবাহী মিষ্টি দই, মাটির ভাঁড়ে পরিবেশিত। ক্যারামেলাইজড স্বাদে ভরপুর।",
    price: 80,
    image: "https://image.qwenlm.ai/generated-images/a446dec8-5423-4345-83eb-3a03f7e481bb/_result.png",
    available: true,
  },
  {
    id: "plain-doi",
    name: "টক দই",
    description: "খাঁটি ও সতেজ টক দই। প্রতিদিনের স্বাস্থ্যকর খাবার।",
    price: 60,
    image: "https://image.qwenlm.ai/generated-images/ca76dcef-0640-4d49-a777-d2b01700c01d/_result.png",
    available: true,
  },
  {
    id: "nolen-gur-doi",
    name: "নলেন গুরের দই",
    description: "নলেন গুরের বিশেষ স্বাদে তৈরি প্রিমিয়াম দই। শীতের ঐতিহ্য।",
    price: 120,
    image: "https://image.qwenlm.ai/generated-images/ff9787f5-bccc-4cf4-ac2a-99a5cb44f5c3/_result.png",
    available: true,
  },
];
