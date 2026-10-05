import { Phone, MapPin } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream-50/95 backdrop-blur-sm border-b border-clay-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="দই">🍶</span>
          <div>
            <h1 className="text-lg font-bold text-clay-800 leading-tight">দইকো বাংলাদেশ</h1>
            <p className="text-xs text-clay-500 leading-tight hidden sm:block">বগুড়ার দইয়ের নতুন ঠিকানা</p>
          </div>
        </div>
        
        <a
          href="tel:01623858009"
          className="flex items-center gap-1.5 bg-clay-600 hover:bg-clay-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          aria-label="কল করুন"
        >
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">কল করুন</span>
        </a>
      </div>
    </header>
  );
}
