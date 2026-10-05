export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  customerName: string;
  phone: string;
  address: string;
  deliveryArea: "dhaka-inside" | "dhaka-outside";
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
}

export const DELIVERY_CHARGES = {
  "dhaka-inside": 60,
  "dhaka-outside": 120,
} as const;

export function calculateSubtotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateDeliveryCharge(area: "dhaka-inside" | "dhaka-outside"): number {
  return DELIVERY_CHARGES[area];
}

export function calculateTotal(subtotal: number, deliveryCharge: number): number {
  return subtotal + deliveryCharge;
}

export function formatPrice(amount: number): string {
  return `৳${amount}`;
}

export function toBanglaNumber(num: number): string {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/[0-9]/g, (d) => banglaDigits[parseInt(d)]);
}
