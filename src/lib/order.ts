import type { Order } from "./pricing";

/**
 * Order submission service.
 * 
 * Currently uses a mock implementation.
 * Easy to replace with:
 * - WhatsApp API
 * - Google Sheets API
 * - Supabase
 * - Firebase
 * - Custom REST API
 */

export interface OrderResult {
  success: boolean;
  orderId?: string;
  message?: string;
}

export async function submitOrder(order: Order): Promise<OrderResult> {
  // Mock submission - simulates network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Log order for debugging
  console.log("Order submitted:", order);

  // Simulate success (95% success rate for testing)
  if (Math.random() > 0.05) {
    const orderId = `DC-${Date.now().toString(36).toUpperCase()}`;
    return {
      success: true,
      orderId,
      message: "আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।",
    };
  }

  return {
    success: false,
    message: "অর্ডার পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
  };
}

/**
 * Format order for WhatsApp (future use)
 */
export function formatOrderForWhatsApp(order: Order): string {
  const itemsList = order.items
    .map((item) => `• ${item.name} × ${item.quantity} = ৳${item.price * item.quantity}`)
    .join("\n");

  return `*নতুন অর্ডার - দইকো বাংলাদেশ*

*পণ্য:*
${itemsList}

*পণ্যের মোট:* ৳${order.subtotal}
*ডেলিভারি এলাকা:* ${order.deliveryArea === "dhaka-inside" ? "ঢাকার ভিতরে" : "ঢাকার বাইরে"}
*ডেলিভারি চার্জ:* ৳${order.deliveryCharge}
*সর্বমোট:* ৳${order.total}

*গ্রাহকের তথ্য:*
নাম: ${order.customerName}
মোবাইল: ${order.phone}
ঠিকানা: ${order.address}`;
}
