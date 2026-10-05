import { Leaf, Heart, Shield } from "lucide-react";

export default function BrandIntro() {
  return (
    <section className="py-16 sm:py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-clay-800 mb-4">
          বগুড়ার ঐতিহ্যবাহী দইয়ের স্বাদ, এখন আপনার টেবিলে।
        </h2>
        
        <p className="text-clay-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          বগুড়ার দই বাংলার এক অবিচ্ছেদ্য ঐতিহ্য। দইকো বাংলাদেশ সেই ঐতিহ্যবাহী স্বাদ 
          মানসম্মত প্রস্তুতিতে আপনার কাছে পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ।
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center p-6 rounded-2xl bg-white shadow-sm border border-clay-100">
            <div className="w-12 h-12 rounded-full bg-clay-100 flex items-center justify-center mb-3">
              <Leaf className="w-6 h-6 text-clay-600" />
            </div>
            <h3 className="font-semibold text-clay-800 mb-1">খাঁটি উপাদান</h3>
            <p className="text-sm text-clay-500">প্রাকৃতিক দুধ ও ঐতিহ্যবাহী পদ্ধতি</p>
          </div>

          <div className="flex flex-col items-center p-6 rounded-2xl bg-white shadow-sm border border-clay-100">
            <div className="w-12 h-12 rounded-full bg-clay-100 flex items-center justify-center mb-3">
              <Heart className="w-6 h-6 text-clay-600" />
            </div>
            <h3 className="font-semibold text-clay-800 mb-1">যত্নসহকারে প্রস্তুতি</h3>
            <p className="text-sm text-clay-500">প্রতিটি ভাঁড়ে ভালোবাসা মেশানো</p>
          </div>

          <div className="flex flex-col items-center p-6 rounded-2xl bg-white shadow-sm border border-clay-100">
            <div className="w-12 h-12 rounded-full bg-clay-100 flex items-center justify-center mb-3">
              <Shield className="w-6 h-6 text-clay-600" />
            </div>
            <h3 className="font-semibold text-clay-800 mb-1">সতেজতা নিশ্চিত</h3>
            <p className="text-sm text-clay-500">প্রতিদিনের তাজা ডেলিভারি</p>
          </div>
        </div>
      </div>
    </section>
  );
}
