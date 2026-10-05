interface HeroProps {
  onOrderClick: () => void;
  onProductsClick: () => void;
}

export default function Hero({ onOrderClick, onProductsClick }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/5d17f715-99c3-4076-b691-c6a54a044509/_result.png"
          alt="দইকো বাংলাদেশ - বগুড়ার ঐতিহ্যবাহী দই"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-clay-900/70 via-clay-900/50 to-clay-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 sm:py-28 text-center">
        <div className="animate-fade-in-up">
          <p className="text-cream-200 text-sm sm:text-base font-medium tracking-wide mb-3 uppercase">
            বগুড়ার গর্ব, আপনার টেবিলে
          </p>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            দইকো বাংলাদেশ
          </h2>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-cream-200 font-semibold mb-4">
            বগুড়ার দইয়ের নতুন ঠিকানা
          </p>
          
          <p className="text-base sm:text-lg text-cream-100/90 max-w-xl mx-auto mb-8 leading-relaxed">
            ঐতিহ্যবাহী স্বাদ, মানসম্মত প্রস্তুতি এবং প্রতিদিনের সতেজতা।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-up stagger-2">
          <button
            onClick={onOrderClick}
            className="w-full sm:w-auto bg-warm-500 hover:bg-warm-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-warm-500/30 transition-all hover:scale-105 active:scale-95"
          >
            এখনই অর্ডার করুন
          </button>
          <button
            onClick={onProductsClick}
            className="w-full sm:w-auto bg-white/15 hover:bg-white/25 text-white font-semibold text-lg px-8 py-4 rounded-xl border border-white/30 backdrop-blur-sm transition-all"
          >
            দই দেখুন
          </button>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream-50 to-transparent" />
    </section>
  );
}
