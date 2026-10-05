import { User, Phone, MapPin, AlertCircle } from "lucide-react";
import type { ValidationErrors } from "../lib/validation";

interface CustomerFormProps {
  name: string;
  phone: string;
  address: string;
  errors: ValidationErrors;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onAddressChange: (value: string) => void;
}

export default function CustomerForm({
  name,
  phone,
  address,
  errors,
  onNameChange,
  onPhoneChange,
  onAddressChange,
}: CustomerFormProps) {
  return (
    <div className="bg-white rounded-2xl border border-clay-100 shadow-sm overflow-hidden">
      <div className="bg-clay-50 px-5 py-3 border-b border-clay-100">
        <h3 className="font-bold text-clay-800 flex items-center gap-2">
          <User className="w-5 h-5" />
          আপনার তথ্য
        </h3>
      </div>

      <div className="p-5 space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="customer-name" className="flex items-center gap-2 text-sm font-medium text-clay-700 mb-1.5">
            <User className="w-4 h-4" />
            নাম <span className="text-red-500">*</span>
          </label>
          <input
            id="customer-name"
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="আপনার নাম লিখুন"
            autoComplete="name"
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.customerName ? "border-red-300 bg-red-50" : "border-cream-200"
            } focus:border-clay-400 focus:ring-2 focus:ring-clay-100 outline-none transition-all text-clay-800 placeholder:text-clay-300`}
          />
          {errors.customerName && (
            <p className="flex items-center gap-1 mt-1.5 text-sm text-red-600">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.customerName}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="customer-phone" className="flex items-center gap-2 text-sm font-medium text-clay-700 mb-1.5">
            <Phone className="w-4 h-4" />
            মোবাইল নম্বর <span className="text-red-500">*</span>
          </label>
          <input
            id="customer-phone"
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="01XXXXXXXXX"
            autoComplete="tel"
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.phone ? "border-red-300 bg-red-50" : "border-cream-200"
            } focus:border-clay-400 focus:ring-2 focus:ring-clay-100 outline-none transition-all text-clay-800 placeholder:text-clay-300`}
            dir="ltr"
            inputMode="tel"
          />
          {errors.phone && (
            <p className="flex items-center gap-1 mt-1.5 text-sm text-red-600">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="customer-address" className="flex items-center gap-2 text-sm font-medium text-clay-700 mb-1.5">
            <MapPin className="w-4 h-4" />
            ঠিকানা <span className="text-red-500">*</span>
          </label>
          <textarea
            id="customer-address"
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
            rows={3}
            autoComplete="street-address"
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.address ? "border-red-300 bg-red-50" : "border-cream-200"
            } focus:border-clay-400 focus:ring-2 focus:ring-clay-100 outline-none transition-all text-clay-800 placeholder:text-clay-300 resize-none`}
          />
          {errors.address && (
            <p className="flex items-center gap-1 mt-1.5 text-sm text-red-600">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.address}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
