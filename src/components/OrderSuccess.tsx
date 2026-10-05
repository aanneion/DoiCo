import { CheckCircle, Phone } from "lucide-react";
import type { OrderItem } from "../lib/pricing";
import { formatPrice } from "../lib/pricing";

interface OrderSuccessProps {
  items: OrderItem[];
  total: number;
  orderId?: string;
  onNewOrder: () => void;
}

export default function OrderSuccess({ items, total, orderId, onNewOrder }: OrderSuccessProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-md mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-in-up">
          <CheckCircle className="w-10 h-10 text-brand-600" />
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-clay-800 mb-3 animate-fade-in-up stagger-1">
          আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
        </h2>
        
        <p className="text-clay-600 mb-6 animate-fade-in-up stagger-2">
          আমাদের প্রতিনিধি খুব শিগগিরই আপনার সঙ্গে যোগাযোগ করবেন।
        </p>

        {/* Order ID */}
        {orderId && (
          <div className="bg-cream-100 rounded-xl p-4 mb-6 animate-fade-in-up stagger-2">
            <p className="text-sm text-clay-500">অর্ডার নম্বর</p>
            <p className="font-bold text-clay-800 text-lg" dir="ltr">{orderId}</p>
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-clay-100 p-5 mb-6 text-left animate-fade-in-up stagger-3">
          <h3 className="font-semibold text-clay-800 mb-3">অর্ডার সারাংশ</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-clay-600">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium text-clay-800">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-clay-100 mt-3 pt-3 flex justify-between">
            <span className="font-bold text-clay-800">সর্বমোট</span>
            <span className="font-extrabold text-clay-800 text-lg">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-cream-50 rounded-xl p-4 mb-6 animate-fade-in-up stagger-3">
          <p className="text-sm text-clay-600 mb-2">কোনো প্রশ্ন থাকলে যোগাযোগ করুন:</p>
          <a
            href="tel:01623858009"
            className="inline-flex items-center gap-2 text-clay-700 font-medium hover:text-clay-900 transition-colors"
          >
            <Phone className="w-4 h-4" />
            01623-858009
          </a>
        </div>

        {/* New Order Button */}
        <button
          onClick={onNewOrder}
          className="w-full bg-clay-600 hover:bg-clay-700 text-white font-bold py-4 rounded-xl transition-all active:scale-95 animate-fade-in-up stagger-4"
        >
          নতুন অর্ডার করুন
        </button>
      </div>
    </section>
  );
}
