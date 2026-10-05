import { ShoppingBag, X } from "lucide-react";
import type { OrderItem } from "../lib/pricing";
import { formatPrice, calculateSubtotal } from "../lib/pricing";

interface OrderSummaryProps {
  items: OrderItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export default function OrderSummary({ items, onRemoveItem, onUpdateQuantity }: OrderSummaryProps) {
  if (items.length === 0) {
    return (
      <div className="bg-cream-100 rounded-2xl p-6 text-center border border-cream-200">
        <ShoppingBag className="w-10 h-10 text-clay-300 mx-auto mb-3" />
        <p className="text-clay-500 font-medium">আপনার অর্ডার খালি</p>
        <p className="text-sm text-clay-400 mt-1">উপর থেকে পণ্য নির্বাচন করুন</p>
      </div>
    );
  }

  const subtotal = calculateSubtotal(items);

  return (
    <div className="bg-white rounded-2xl border border-clay-100 shadow-sm overflow-hidden">
      <div className="bg-clay-50 px-5 py-3 border-b border-clay-100">
        <h3 className="font-bold text-clay-800 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          আপনার অর্ডার
        </h3>
      </div>

      <div className="divide-y divide-cream-100">
        {items.map((item) => (
          <div key={item.productId} className="px-5 py-3 flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-clay-800 text-sm truncate">{item.name}</p>
              <p className="text-xs text-clay-500">
                {formatPrice(item.price)} × {item.quantity}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-clay-700 text-sm whitespace-nowrap">
                {formatPrice(item.price * item.quantity)}
              </span>
              <button
                onClick={() => onRemoveItem(item.productId)}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-cream-100 hover:bg-red-50 text-clay-400 hover:text-red-500 transition-colors"
                aria-label={`${item.name} সরান`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-cream-50 px-5 py-3 border-t border-clay-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-clay-600">পণ্যের মোট</span>
          <span className="font-bold text-clay-800 text-lg">{formatPrice(subtotal)}</span>
        </div>
      </div>
    </div>
  );
}
