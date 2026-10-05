import { CheckCircle, Package, MapPin, User, Phone, Home } from "lucide-react";
import type { OrderItem } from "../lib/pricing";
import { formatPrice } from "../lib/pricing";

interface OrderReviewProps {
  items: OrderItem[];
  subtotal: number;
  deliveryArea: "dhaka-inside" | "dhaka-outside";
  deliveryCharge: number;
  total: number;
  customerName: string;
  phone: string;
  address: string;
  isSubmitting: boolean;
  onSubmit: () => void;
  onBack: () => void;
}

export default function OrderReview({
  items,
  subtotal,
  deliveryArea,
  deliveryCharge,
  total,
  customerName,
  phone,
  address,
  isSubmitting,
  onSubmit,
  onBack,
}: OrderReviewProps) {
  return (
    <div className="bg-white rounded-2xl border border-clay-100 shadow-sm overflow-hidden">
      <div className="bg-clay-50 px-5 py-3 border-b border-clay-100">
        <h3 className="font-bold text-clay-800 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          অর্ডার পর্যালোচনা
        </h3>
      </div>

      <div className="p-5 space-y-5">
        {/* Items */}
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-clay-700 mb-2">
            <Package className="w-4 h-4" />
            পণ্য
          </h4>
          <div className="space-y-2 bg-cream-50 rounded-xl p-3">
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
        </div>

        {/* Customer Info */}
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-clay-700 mb-2">
            <User className="w-4 h-4" />
            গ্রাহকের তথ্য
          </h4>
          <div className="bg-cream-50 rounded-xl p-3 space-y-1.5 text-sm">
            <p className="text-clay-600">
              <span className="font-medium text-clay-800">নাম:</span> {customerName}
            </p>
            <p className="text-clay-600">
              <span className="font-medium text-clay-800">মোবাইল:</span>{" "}
              <a href={`tel:${phone}`} className="text-clay-700 underline" dir="ltr">{phone}</a>
            </p>
            <p className="text-clay-600">
              <span className="font-medium text-clay-800">ঠিকানা:</span> {address}
            </p>
          </div>
        </div>

        {/* Delivery */}
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-clay-700 mb-2">
            <MapPin className="w-4 h-4" />
            ডেলিভারি
          </h4>
          <div className="bg-cream-50 rounded-xl p-3 text-sm">
            <p className="text-clay-600">
              <span className="font-medium text-clay-800">এলাকা:</span>{" "}
              {deliveryArea === "dhaka-inside" ? "ঢাকার ভিতরে" : "ঢাকার বাইরে"}
            </p>
          </div>
        </div>

        {/* Total Breakdown */}
        <div className="border-t border-clay-100 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-clay-600">পণ্যের মোট</span>
            <span className="text-clay-800">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-clay-600">ডেলিভারি চার্জ</span>
            <span className="text-clay-800">{formatPrice(deliveryCharge)}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-dashed border-clay-200">
            <span className="font-bold text-clay-800 text-lg">সর্বমোট</span>
            <span className="font-extrabold text-clay-800 text-2xl">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onBack}
            disabled={isSubmitting}
            className="flex-1 py-3.5 rounded-xl border-2 border-clay-200 text-clay-700 font-semibold hover:bg-cream-50 transition-colors disabled:opacity-50"
          >
            ফিরে যান
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex-[2] py-3.5 rounded-xl bg-clay-600 hover:bg-clay-700 text-white font-bold text-lg transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                পাঠানো হচ্ছে...
              </>
            ) : (
              "অর্ডার নিশ্চিত করুন"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
