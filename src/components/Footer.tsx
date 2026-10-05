import { Phone, Mail, Facebook, MapPin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-clay-800 text-cream-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🍶</span>
              <div>
                <h3 className="text-xl font-bold text-white">দইকো বাংলাদেশ</h3>
                <p className="text-sm text-cream-300">DoiCo Bangladesh</p>
              </div>
            </div>
            <p className="text-cream-200 text-sm leading-relaxed">
              বগুড়ার দইয়ের নতুন ঠিকানা। ঐতিহ্যবাহী স্বাদ, মানসম্মত প্রস্তুতি এবং প্রতিদিনের সতেজতা।
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">যোগাযোগ</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:01623858009"
                  className="flex items-center gap-2 text-cream-200 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">01623-858009</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:doicobangladesh@gmail.com"
                  className="flex items-center gap-2 text-cream-200 hover:text-white transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  doicobangladesh@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61592847131521"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cream-200 hover:text-white transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  DoiCo Bangladesh
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Info */}
          <div>
            <h4 className="font-bold text-white mb-4">তথ্য</h4>
            <ul className="space-y-2 text-sm text-cream-200">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cream-400" />
                ঢাকার ভিতরে ডেলিভারি: ৳৬০
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cream-400" />
                ঢাকার বাইরে ডেলিভারি: ৳১২০
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-clay-700 mt-8 pt-6 text-center">
          <p className="text-sm text-cream-300 flex items-center justify-center gap-1">
            তৈরি করেছে <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> দইকো বাংলাদেশ
          </p>
          <p className="text-xs text-cream-400 mt-1">
            © {new Date().getFullYear()} সর্বস্বত্ব সংরক্ষিত
          </p>
        </div>
      </div>
    </footer>
  );
}
