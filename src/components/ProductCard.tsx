import { ShoppingCart } from "lucide-react";
import type { Product } from "../data/products";
import QuantitySelector from "./QuantitySelector";
import { formatPrice } from "../lib/pricing";

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export default function ProductCard({ product, quantity, onQuantityChange }: ProductCardProps) {
  const handleIncrease = () => onQuantityChange(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 0) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-clay-100 overflow-hidden transition-all hover:shadow-md">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-cream-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        {quantity > 0 && (
          <div className="absolute top-3 right-3 bg-clay-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {quantity}টি
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-bold text-clay-800 text-base mb-1">{product.name}</h3>
        <p className="text-sm text-clay-500 mb-3 line-clamp-2 leading-relaxed">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-clay-700">{formatPrice(product.price)}</span>
          
          {quantity === 0 ? (
            <button
              onClick={handleIncrease}
              className="flex items-center gap-1.5 bg-clay-600 hover:bg-clay-700 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              যোগ করুন
            </button>
          ) : (
            <QuantitySelector
              quantity={quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          )}
        </div>
      </div>
    </div>
  );
}
