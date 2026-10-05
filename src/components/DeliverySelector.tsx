import { MapPin } from "lucide-react";
import { DELIVERY_CHARGES, formatPrice } from "../lib/pricing";

interface DeliverySelectorProps {
  selectedArea: "dhaka-inside" | "dhaka-outside";
  onChange: (area: "dhaka-inside" | "dhaka-outside") => void;
}

export default function DeliverySelector({ selectedArea, onChange }: DeliverySelectorProps) {
  return (
    <div className="bg-white rounded-2xl border border-clay-100 shadow-sm overflow-hidden">
      <div className="bg-clay-50 px-5 py-3 border-b border-clay-100">
        <h3 className="font-bold text-clay-800 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          ডেলিভারি এলাকা
        </h3>
      </div>

      <div className="p-4 space-y-3">
        <label
          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
            selectedArea === "dhaka-inside"
              ? "border-clay-500 bg-clay-50"
              : "border-cream-200 hover:border-clay-200"
          }`}
        >
          <input
            type="radio"
            name="deliveryArea"
            value="dhaka-inside"
            checked={selectedArea === "dhaka-inside"}
            onChange={() => onChange("dhaka-inside")}
            className="w-5 h-5 text-clay-600 accent-clay-600"
          />
          <div className="flex-1">
            <p className="font-semibold text-clay-800">ঢাকার ভিতরে</p>
            <p className="text-sm text-clay-500">ঢাকা মহানগরী এলাকা</p>
          </div>
          <span className="font-bold text-clay-700">{formatPrice(DELIVERY_CHARGES["dhaka-inside"])}</span>
        </label>

        <label
          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
            selectedArea === "dhaka-outside"
              ? "border-clay-500 bg-clay-50"
              : "border-cream-200 hover:border-clay-200"
          }`}
        >
          <input
            type="radio"
            name="deliveryArea"
            value="dhaka-outside"
            checked={selectedArea === "dhaka-outside"}
            onChange={() => onChange("dhaka-outside")}
            className="w-5 h-5 text-clay-600 accent-clay-600"
          />
          <div className="flex-1">
            <p className="font-semibold text-clay-800">ঢাকার বাইরে</p>
            <p className="text-sm text-clay-500">সারাদেশ (ঢাকা ব্যতীত)</p>
          </div>
          <span className="font-bold text-clay-700">{formatPrice(DELIVERY_CHARGES["dhaka-outside"])}</span>
        </label>
      </div>
    </div>
  );
}
