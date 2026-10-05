import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantitySelector({ quantity, onIncrease, onDecrease }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-1 bg-cream-100 rounded-lg p-1">
      <button
        onClick={onDecrease}
        className="w-9 h-9 flex items-center justify-center rounded-md bg-white shadow-sm hover:bg-cream-200 active:bg-cream-300 transition-colors"
        aria-label="পরিমাণ কমান"
        disabled={quantity <= 0}
      >
        <Minus className="w-4 h-4 text-clay-700" />
      </button>
      <span className="w-8 text-center font-semibold text-clay-800 text-sm">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className="w-9 h-9 flex items-center justify-center rounded-md bg-white shadow-sm hover:bg-cream-200 active:bg-cream-300 transition-colors"
        aria-label="পরিমাণ বাড়ান"
      >
        <Plus className="w-4 h-4 text-clay-700" />
      </button>
    </div>
  );
}
