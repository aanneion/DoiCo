import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import {
  Phone,
  Mail,
  Facebook,
  MapPin,
  Heart,
  Leaf,
  Shield,
  ShoppingCart,
  ShoppingBag,
  Minus,
  Plus,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  X,
  User,
} from "lucide-react";
import emailjs from "@emailjs/browser";

// ─── DATA ────────────────────────────────────────────────────────────────────

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🖼️ আপনার নিজস্ব ইমেজ যোগ করতে এই পাথগুলো পরিবর্তন করুন
// ইমেজগুলো public/images/ ফোল্ডারে রাখুন
// বিস্তারিত গাইড: IMAGE_UPLOAD_GUIDE.md
// ═══════════════════════════════════════════════════════════════════════════════
const products: Product[] = [
  {
    id: "mishti-doi-matir-bhar",
    name: "মিষ্টি দই (মাটির ভাঁড়)",
    description: "বগুড়ার ঐতিহ্যবাহী মিষ্টি দই, মাটির ভাঁড়ে পরিবেশিত। ক্যারামেলাইজড স্বাদে ভরপুর।",
    price: 80,
    image: "/images/mishti-doi.png", // ← আপনার মিষ্টি দইয়ের ছবি
    available: true,
  },
  {
    id: "plain-doi",
    name: "টক দই",
    description: "খাঁটি ও সতেজ টক দই। প্রতিদিনের স্বাস্থ্যকর খাবার।",
    price: 60,
    image: "/images/tok-doi.png", // ← আপনার টক দইয়ের ছবি
    available: true,
  },
  {
    id: "nolen-gur-doi",
    name: "নলেন গুরের দই",
    description: "নলেন গুরের বিশেষ স্বাদে তৈরি প্রিমিয়াম দই। শীতের ঐতিহ্য।",
    price: 120,
    image: "/images/nolen-gur-doi.png", // ← আপনার নলেন গুরের দইয়ের ছবি
    available: true,
  },
];

// ─── PRICING ─────────────────────────────────────────────────────────────────

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

const DELIVERY_CHARGES = {
  "dhaka-inside": 60,
  "dhaka-outside": 120,
  "bau-area": 0,
} as const;

type DeliveryArea = "dhaka-inside" | "dhaka-outside" | "bau-area";

function formatPrice(amount: number): string {
  return `৳${amount}`;
}

// ─── VALIDATION ──────────────────────────────────────────────────────────────

interface ValidationErrors {
  customerName?: string;
  phone?: string;
  address?: string;
  items?: string;
  submit?: string;
}

function validateOrder(
  name: string,
  phone: string,
  address: string,
  hasItems: boolean
): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!name.trim()) errors.customerName = "আপনার নাম লিখুন।";
  else if (name.trim().length < 2) errors.customerName = "নাম কমপক্ষে ২ অক্ষরের হতে হবে।";

  const cleaned = phone.replace(/[\s-]/g, "");
  if (!cleaned) errors.phone = "মোবাইল নম্বর দিন।";
  else if (!/^01[3-9]\d{8}$/.test(cleaned)) errors.phone = "সঠিক মোবাইল নম্বর দিন। (০১XXXXXXXXX)";

  if (!address.trim()) errors.address = "আপনার ঠিকানা লিখুন।";
  else if (address.trim().length < 10) errors.address = "সম্পূর্ণ ঠিকানা লিখুন।";

  if (!hasItems) errors.items = "কমপক্ষে একটি পণ্য নির্বাচন করুন।";

  return errors;
}

// ─── ORDER SERVICE ────────────────────────────────────────────────────────────

interface Order {
  customerName: string;
  phone: string;
  address: string;
  deliveryArea: DeliveryArea;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  orderId: string;
  timestamp: string;
}

// Configuration - Replace with your actual credentials
const CONFIG = {
  // Google Sheets Web App URL
  GOOGLE_SHEETS_URL: "https://script.google.com/macros/s/AKfycbyk89ANqAESSmIwNK8oz7a1U9zkHuOG8LNAK4CXt1vrcdj0eMfPSSPGMkpTW0OW4XOSuw/exec",
  
  // EmailJS Configuration
  // Get these from https://www.emailjs.com/
  EMAIL_SERVICE_ID: "service_doico", // Replace with your EmailJS service ID
  EMAIL_TEMPLATE_ID: "template_doico", // Replace with your EmailJS template ID
  EMAIL_PUBLIC_KEY: "YOUR_PUBLIC_KEY", // Replace with your EmailJS public key
  EMAIL_TO: "doicobangladesh@gmail.com", // Where to send order notifications
};

// Save order to localStorage (for admin dashboard)
function saveOrderToLocalStorage(order: Order): void {
  const existingOrders = JSON.parse(localStorage.getItem("doico_orders") || "[]");
  existingOrders.push(order);
  localStorage.setItem("doico_orders", JSON.stringify(existingOrders));
}

// Send order notification via EmailJS
async function sendEmailNotification(order: Order): Promise<void> {
  if (!CONFIG.EMAIL_SERVICE_ID || !CONFIG.EMAIL_TEMPLATE_ID || !CONFIG.EMAIL_PUBLIC_KEY) {
    console.log("EmailJS not configured");
    return;
  }

  try {
    const deliveryAreaText = 
      order.deliveryArea === "dhaka-inside" ? "ঢাকার ভিতরে" :
      order.deliveryArea === "dhaka-outside" ? "ঢাকার বাইরে" :
      "বাকৃবি এলাকা";

    const itemsList = order.items
      .map((item) => `${item.name} × ${item.quantity} = ৳${item.price * item.quantity}`)
      .join("\n");

    const templateParams = {
      to_email: CONFIG.EMAIL_TO,
      order_id: order.orderId,
      order_time: new Date(order.timestamp).toLocaleString("bn-BD"),
      customer_name: order.customerName,
      customer_phone: order.phone,
      customer_address: order.address,
      delivery_area: deliveryAreaText,
      items: itemsList,
      subtotal: `৳${order.subtotal}`,
      delivery_charge: order.deliveryCharge === 0 ? "ফ্রি" : `৳${order.deliveryCharge}`,
      total: `৳${order.total}`,
    };

    await emailjs.send(
      CONFIG.EMAIL_SERVICE_ID,
      CONFIG.EMAIL_TEMPLATE_ID,
      templateParams,
      CONFIG.EMAIL_PUBLIC_KEY
    );
  } catch (error) {
    console.error("Failed to send email notification:", error);
  }
}

// Send order to Google Sheets
async function sendToGoogleSheets(order: Order): Promise<void> {
  if (!CONFIG.GOOGLE_SHEETS_URL) {
    console.log("Google Sheets URL not configured");
    return;
  }

  try {
    const deliveryAreaText = 
      order.deliveryArea === "dhaka-inside" ? "ঢাকার ভিতরে" :
      order.deliveryArea === "dhaka-outside" ? "ঢাকার বাইরে" :
      "বাকৃবি এলাকা";

    await fetch(CONFIG.GOOGLE_SHEETS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: order.orderId,
        timestamp: order.timestamp,
        customerName: order.customerName,
        phone: order.phone,
        address: order.address,
        deliveryArea: deliveryAreaText,
        items: order.items.map(i => `${i.name} x${i.quantity}`).join(", "),
        subtotal: order.subtotal,
        deliveryCharge: order.deliveryCharge,
        total: order.total,
      }),
    });
  } catch (error) {
    console.error("Failed to send to Google Sheets:", error);
  }
}



// Main order submission function
async function submitOrder(orderData: Omit<Order, "orderId" | "timestamp">): Promise<{ success: boolean; orderId?: string; message?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const orderId = `DC-${Date.now().toString(36).toUpperCase()}`;
  const timestamp = new Date().toISOString();
  
  const order: Order = {
    ...orderData,
    orderId,
    timestamp,
  };

  // Save to localStorage
  saveOrderToLocalStorage(order);
  
  // Send to Google Sheets (if configured)
  await sendToGoogleSheets(order);
  
  // Send email notification
  await sendEmailNotification(order);

  return { success: true, orderId, message: "আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।" };
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [deliveryArea, setDeliveryArea] = useState<DeliveryArea>("dhaka-inside");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [step, setStep] = useState<"browse" | "success">("browse");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string>();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showScrollTop, setShowScrollTop] = useState(false);

  const productsRef = useRef<HTMLDivElement>(null);
  const orderSectionRef = useRef<HTMLDivElement>(null);

  // Computed
  const orderItems: OrderItem[] = useMemo(
    () =>
      products
        .filter((p) => (quantities[p.id] || 0) > 0)
        .map((p) => ({ productId: p.id, name: p.name, price: p.price, quantity: quantities[p.id] })),
    [quantities]
  );

  const subtotal = useMemo(() => orderItems.reduce((s, i) => s + i.price * i.quantity, 0), [orderItems]);
  const deliveryCharge = DELIVERY_CHARGES[deliveryArea];
  const total = subtotal + deliveryCharge;
  const totalItems = useMemo(() => orderItems.reduce((s, i) => s + i.quantity, 0), [orderItems]);

  // Handlers
  const handleQuantityChange = useCallback((productId: string, quantity: number) => {
    setQuantities((prev) => {
      const next = { ...prev };
      if (quantity === 0) delete next[productId];
      else next[productId] = quantity;
      return next;
    });
  }, []);

  const scrollToProducts = useCallback(() => productsRef.current?.scrollIntoView({ behavior: "smooth" }), []);
  const scrollToOrder = useCallback(() => orderSectionRef.current?.scrollIntoView({ behavior: "smooth" }), []);

  const handleSubmitOrder = useCallback(async () => {
    const validationErrors = validateOrder(customerName, phone, address, orderItems.length > 0);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      const result = await submitOrder({
        customerName, phone, address, deliveryArea,
        items: orderItems, subtotal, deliveryCharge, total,
      });
      if (result.success) {
        setOrderId(result.orderId);
        setStep("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setErrors({ submit: result.message });
      }
    } catch {
      setErrors({ submit: "অর্ডার পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।" });
    } finally {
      setIsSubmitting(false);
    }
  }, [customerName, phone, address, deliveryArea, orderItems, subtotal, deliveryCharge, total]);

  const handleNewOrder = useCallback(() => {
    setQuantities({});
    setCustomerName("");
    setPhone("");
    setAddress("");
    setStep("browse");
    setOrderId(undefined);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-amber-50/30">
      {/* ─── HEADER ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-amber-50/95 backdrop-blur-sm border-b border-amber-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍶</span>
            <div>
              <h1 className="text-lg font-bold text-stone-800 leading-tight">দইকো বাংলাদেশ</h1>
              <p className="text-xs text-stone-500 leading-tight hidden sm:block">বগুড়ার দইয়ের নতুন ঠিকানা</p>
            </div>
          </div>
          <a href="tel:01623858009" className="flex items-center gap-1.5 bg-amber-700 hover:bg-amber-800 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors" aria-label="কল করুন">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">কল করুন</span>
          </a>
        </div>
      </header>

      <div className="h-14" />

      {step === "browse" && (
        <>
          {/* ─── HERO ─── */}
          {/* 🖼️ আপনার DoiCo ব্যানার যোগ করতে: public/images/banner.png ফাইলটি রাখুন */}
          <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden">
            <div className="absolute inset-0">
              <img src="/images/banner.png" alt="দইকো বাংলাদেশ - বগুড়ার দই" className="w-full h-full object-cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/80" />
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 sm:py-28 text-center">
              <div className="animate-fade-in-up">
                <p className="text-amber-200 text-sm sm:text-base font-medium tracking-wide mb-3">বগুড়ার গর্ব, আপনার টেবিলে</p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">দইকো বাংলাদেশ</h2>
                <p className="text-xl sm:text-2xl md:text-3xl text-amber-100 font-semibold mb-4">বগুড়ার দইয়ের নতুন ঠিকানা</p>
                <p className="text-base sm:text-lg text-amber-50/90 max-w-xl mx-auto mb-8 leading-relaxed">ঐতিহ্যবাহী স্বাদ, মানসম্মত প্রস্তুতি এবং প্রতিদিনের সতেজতা।</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-up stagger-2">
                <button onClick={scrollToOrder} className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:scale-105 active:scale-95">এখনই অর্ডার করুন</button>
                <button onClick={scrollToProducts} className="w-full sm:w-auto bg-white/15 hover:bg-white/25 text-white font-semibold text-lg px-8 py-4 rounded-xl border border-white/30 backdrop-blur-sm transition-all">দই দেখুন</button>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-50/30 to-transparent" />
          </section>

          {/* ─── BRAND INTRO ─── */}
          <section className="py-16 sm:py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-4">বগুড়ার ঐতিহ্যবাহী দইয়ের স্বাদ, এখন আপনার টেবিলে।</h2>
              <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">বগুড়ার দই বাংলার এক অবিচ্ছেদ্য ঐতিহ্য। দইকো বাংলাদেশ সেই ঐতিহ্যবাহী স্বাদ মানসম্মত প্রস্তুতিতে আপনার কাছে পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ।</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: Leaf, title: "খাঁটি উপাদান", desc: "প্রাকৃতিক দুধ ও ঐতিহ্যবাহী পদ্ধতি" },
                  { icon: Heart, title: "যত্নসহকারে প্রস্তুতি", desc: "প্রতিটি ভাঁড়ে ভালোবাসা মেশানো" },
                  { icon: Shield, title: "সতেজতা নিশ্চিত", desc: "প্রতিদিনের তাজা ডেলিভারি" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center p-6 rounded-2xl bg-white shadow-sm border border-amber-100">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                      <item.icon className="w-6 h-6 text-amber-700" />
                    </div>
                    <h3 className="font-semibold text-stone-800 mb-1">{item.title}</h3>
                    <p className="text-sm text-stone-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── DIVIDER ─── */}
          <div className="flex items-center justify-center py-2 px-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
            <span className="mx-4 text-amber-300 text-lg">✦</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
          </div>

          {/* ─── PRODUCTS ─── */}
          <section ref={productsRef} className="py-16 sm:py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-2">আমাদের দই</h2>
                <p className="text-stone-500">আপনার পছন্দের দই বেছে নিন</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {products.map((product) => {
                  const qty = quantities[product.id] || 0;
                  return (
                    <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden transition-all hover:shadow-md">
                      <div className="relative aspect-square overflow-hidden bg-amber-50">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                        {qty > 0 && (
                          <div className="absolute top-3 right-3 bg-amber-700 text-white text-xs font-bold px-2 py-1 rounded-full">{qty}টি</div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-stone-800 text-base mb-1">{product.name}</h3>
                        <p className="text-sm text-stone-500 mb-3 line-clamp-2 leading-relaxed">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-amber-800">{formatPrice(product.price)}</span>
                          {qty === 0 ? (
                            <button onClick={() => handleQuantityChange(product.id, 1)} className="flex items-center gap-1.5 bg-amber-700 hover:bg-amber-800 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors active:scale-95">
                              <ShoppingCart className="w-4 h-4" />
                              যোগ করুন
                            </button>
                          ) : (
                            <div className="flex items-center gap-1 bg-amber-50 rounded-lg p-1">
                              <button onClick={() => handleQuantityChange(product.id, qty - 1)} className="w-9 h-9 flex items-center justify-center rounded-md bg-white shadow-sm hover:bg-amber-100 active:bg-amber-200 transition-colors" aria-label="পরিমাণ কমান">
                                <Minus className="w-4 h-4 text-stone-700" />
                              </button>
                              <span className="w-8 text-center font-semibold text-stone-800 text-sm">{qty}</span>
                              <button onClick={() => handleQuantityChange(product.id, qty + 1)} className="w-9 h-9 flex items-center justify-center rounded-md bg-white shadow-sm hover:bg-amber-100 active:bg-amber-200 transition-colors" aria-label="পরিমাণ বাড়ান">
                                <Plus className="w-4 h-4 text-stone-700" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ─── DELIVERY INFO BANNER ─── */}
          <div className="bg-amber-50 border-y border-amber-100 py-6 px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">🏠</span>
                <p className="text-sm font-semibold text-stone-800">ঢাকার ভিতরে</p>
                <p className="text-stone-600">ডেলিভারি চার্জ: ৳৬০</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">🚚</span>
                <p className="text-sm font-semibold text-stone-800">ঢাকার বাইরে</p>
                <p className="text-stone-600">ডেলিভারি চার্জ: ৳১২০</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">⚡</span>
                <p className="text-sm font-semibold text-stone-800">বাকৃবি এলাকা</p>
                <p className="text-green-600 font-medium">ফ্রি ডেলিভারি</p>
                <p className="text-xs text-stone-500">১৫ মিনিটে ডেলিভারি</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">📞</span>
                <p className="text-sm font-semibold text-stone-800">অর্ডার হেল্পলাইন</p>
                <a href="tel:01623858009" className="text-stone-600 hover:text-stone-800" dir="ltr">01623-858009</a>
              </div>
            </div>
          </div>

          {/* ─── ORDER SECTION ─── */}
          {totalItems > 0 && (
            <section ref={orderSectionRef} className="py-12 sm:py-16 px-4">
              <div className="max-w-2xl mx-auto space-y-5">
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-2">অর্ডার সম্পূর্ণ করুন</h2>
                  <p className="text-stone-500">আপনার তথ্য দিন এবং অর্ডার নিশ্চিত করুন</p>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden">
                  <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
                    <h3 className="font-bold text-stone-800 flex items-center gap-2"><ShoppingBag className="w-5 h-5" /> আপনার অর্ডার</h3>
                  </div>
                  <div className="divide-y divide-amber-50">
                    {orderItems.map((item) => (
                      <div key={item.productId} className="px-5 py-3 flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-stone-800 text-sm truncate">{item.name}</p>
                          <p className="text-xs text-stone-500">{formatPrice(item.price)} × {item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-stone-700 text-sm whitespace-nowrap">{formatPrice(item.price * item.quantity)}</span>
                          <button onClick={() => handleQuantityChange(item.productId, 0)} className="w-7 h-7 flex items-center justify-center rounded-full bg-amber-50 hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors" aria-label={`${item.name} সরান`}>
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-amber-50/50 px-5 py-3 border-t border-amber-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-stone-600">পণ্যের মোট</span>
                      <span className="font-bold text-stone-800 text-lg">{formatPrice(subtotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Selector */}
                <div className="bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden">
                  <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
                    <h3 className="font-bold text-stone-800 flex items-center gap-2"><MapPin className="w-5 h-5" /> ডেলিভারি এলাকা</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {([
                      { value: "dhaka-inside" as const, label: "ঢাকার ভিতরে", desc: "ঢাকা মহানগরী এলাকা", charge: 60, time: "" },
                      { value: "dhaka-outside" as const, label: "ঢাকার বাইরে", desc: "সারাদেশ (ঢাকা ব্যতীত)", charge: 120, time: "" },
                      { value: "bau-area" as const, label: "বাংলাদেশ কৃষি বিশ্ববিদ্যালয় এলাকা", desc: "বাকৃবি ক্যাম্পাস ও আশেপাশে", charge: 0, time: "১৫ মিনিটের মধ্যে ডেলিভারি" },
                    ]).map((option) => (
                      <label key={option.value} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryArea === option.value ? "border-amber-500 bg-amber-50" : "border-amber-100 hover:border-amber-200"}`}>
                        <input type="radio" name="deliveryArea" checked={deliveryArea === option.value} onChange={() => setDeliveryArea(option.value)} className="w-5 h-5 accent-amber-600" />
                        <div className="flex-1">
                          <p className="font-semibold text-stone-800">{option.label}</p>
                          <p className="text-sm text-stone-500">{option.desc}</p>
                          {option.time && <p className="text-xs text-green-600 font-medium mt-1">⚡ {option.time}</p>}
                        </div>
                        <span className="font-bold text-stone-700">{option.charge === 0 ? "ফ্রি" : formatPrice(option.charge)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Delivery charge + Total */}
                <div className="bg-amber-50 rounded-xl p-4 flex justify-between items-center border border-amber-100">
                  <span className="text-stone-600 font-medium">ডেলিভারি চার্জ</span>
                  <span className="font-bold text-stone-800">{formatPrice(deliveryCharge)}</span>
                </div>
                <div className="bg-amber-800 rounded-xl p-5 text-center">
                  <p className="text-amber-200 text-sm mb-1">সর্বমোট</p>
                  <p className="text-3xl font-extrabold text-white">{formatPrice(total)}</p>
                </div>

                {/* Customer Form */}
                <div className="bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden">
                  <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
                    <h3 className="font-bold text-stone-800 flex items-center gap-2"><User className="w-5 h-5" /> আপনার তথ্য</h3>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-1.5"><User className="w-4 h-4" /> নাম <span className="text-red-500">*</span></label>
                      <input id="name" type="text" value={customerName} onChange={(e) => { setCustomerName(e.target.value); setErrors((prev) => ({ ...prev, customerName: undefined })); }} placeholder="আপনার নাম লিখুন" autoComplete="name" className={`w-full px-4 py-3 rounded-xl border ${errors.customerName ? "border-red-300 bg-red-50" : "border-amber-200"} focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all text-stone-800 placeholder:text-stone-300`} />
                      {errors.customerName && <p className="flex items-center gap-1 mt-1.5 text-sm text-red-600"><AlertCircle className="w-3.5 h-3.5" />{errors.customerName}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-1.5"><Phone className="w-4 h-4" /> মোবাইল নম্বর <span className="text-red-500">*</span></label>
                      <input id="phone" type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setErrors((prev) => ({ ...prev, phone: undefined })); }} placeholder="01XXXXXXXXX" autoComplete="tel" inputMode="tel" dir="ltr" className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-300 bg-red-50" : "border-amber-200"} focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all text-stone-800 placeholder:text-stone-300`} />
                      {errors.phone && <p className="flex items-center gap-1 mt-1.5 text-sm text-red-600"><AlertCircle className="w-3.5 h-3.5" />{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="address" className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-1.5"><MapPin className="w-4 h-4" /> ঠিকানা <span className="text-red-500">*</span></label>
                      <textarea id="address" value={address} onChange={(e) => { setAddress(e.target.value); setErrors((prev) => ({ ...prev, address: undefined })); }} placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন" rows={3} autoComplete="street-address" className={`w-full px-4 py-3 rounded-xl border ${errors.address ? "border-red-300 bg-red-50" : "border-amber-200"} focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all text-stone-800 placeholder:text-stone-300 resize-none`} />
                      {errors.address && <p className="flex items-center gap-1 mt-1.5 text-sm text-red-600"><AlertCircle className="w-3.5 h-3.5" />{errors.address}</p>}
                    </div>
                  </div>
                </div>

                {errors.items && <p className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-xl"><AlertCircle className="w-4 h-4 flex-shrink-0" />{errors.items}</p>}
                {errors.submit && <p className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-xl"><AlertCircle className="w-4 h-4 flex-shrink-0" />{errors.submit}</p>}

                <button onClick={handleSubmitOrder} disabled={isSubmitting} className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-amber-700/20 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> পাঠানো হচ্ছে...</>
                  ) : (
                    <><ShoppingBag className="w-5 h-5" /> অর্ডার নিশ্চিত করুন — {formatPrice(total)}</>
                  )}
                </button>
              </div>
            </section>
          )}

          {/* Empty state */}
          {totalItems === 0 && (
            <section className="py-12 px-4">
              <div className="max-w-md mx-auto text-center bg-white rounded-2xl border border-amber-100 p-8">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-amber-300" />
                </div>
                <h3 className="font-bold text-stone-800 text-lg mb-2">আপনার অর্ডার খালি</h3>
                <p className="text-stone-500 text-sm mb-4">উপর থেকে আপনার পছন্দের দই নির্বাচন করুন</p>
                <button onClick={scrollToProducts} className="bg-amber-700 hover:bg-amber-800 text-white font-medium px-6 py-2.5 rounded-lg transition-colors">দই দেখুন</button>
              </div>
            </section>
          )}
        </>
      )}

      {/* ─── SUCCESS ─── */}
      {step === "success" && (
        <section className="py-16 px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-in-up">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-stone-800 mb-3 animate-fade-in-up stagger-1">আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।</h2>
            <p className="text-stone-600 mb-6 animate-fade-in-up stagger-2">আমাদের প্রতিনিধি খুব শিগগিরই আপনার সঙ্গে যোগাযোগ করবেন।</p>
            {orderId && (
              <div className="bg-amber-50 rounded-xl p-4 mb-6 animate-fade-in-up stagger-2">
                <p className="text-sm text-stone-500">অর্ডার নম্বর</p>
                <p className="font-bold text-stone-800 text-lg" dir="ltr">{orderId}</p>
              </div>
            )}
            <div className="bg-white rounded-2xl border border-amber-100 p-5 mb-6 text-left animate-fade-in-up stagger-3">
              <h3 className="font-semibold text-stone-800 mb-3">অর্ডার সারাংশ</h3>
              <div className="space-y-2">
                {orderItems.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-stone-600">{item.name} × {item.quantity}</span>
                    <span className="font-medium text-stone-800">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-amber-100 mt-3 pt-3 flex justify-between">
                <span className="font-bold text-stone-800">সর্বমোট</span>
                <span className="font-extrabold text-stone-800 text-lg">{formatPrice(total)}</span>
              </div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 mb-6 animate-fade-in-up stagger-3">
              <p className="text-sm text-stone-600 mb-2">কোনো প্রশ্ন থাকলে যোগাযোগ করুন:</p>
              <a href="tel:01623858009" className="inline-flex items-center gap-2 text-stone-700 font-medium hover:text-stone-900 transition-colors"><Phone className="w-4 h-4" /> 01623-858009</a>
            </div>
            <button onClick={handleNewOrder} className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 rounded-xl transition-all active:scale-95 animate-fade-in-up stagger-4">নতুন অর্ডার করুন</button>
          </div>
        </section>
      )}

      {/* Spacer for sticky CTA */}
      {step === "browse" && totalItems > 0 && <div className="h-20 sm:h-0" />}

      {/* ─── FOOTER ─── */}
      <footer className="bg-stone-800 text-amber-50">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🍶</span>
                <div>
                  <h3 className="text-xl font-bold text-white">দইকো বাংলাদেশ</h3>
                  <p className="text-sm text-amber-200">DoiCo Bangladesh</p>
                </div>
              </div>
              <p className="text-amber-100 text-sm leading-relaxed">বগুড়ার দইয়ের নতুন ঠিকানা। ঐতিহ্যবাহী স্বাদ, মানসম্মত প্রস্তুতি এবং প্রতিদিনের সতেজতা।</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">যোগাযোগ</h4>
              <ul className="space-y-3">
                <li><a href="tel:01623858009" className="flex items-center gap-2 text-amber-100 hover:text-white transition-colors"><Phone className="w-4 h-4" /><span dir="ltr">01623-858009</span></a></li>
                <li><a href="mailto:doicobangladesh@gmail.com" className="flex items-center gap-2 text-amber-100 hover:text-white transition-colors text-sm"><Mail className="w-4 h-4" />doicobangladesh@gmail.com</a></li>
                <li><a href="https://www.facebook.com/profile.php?id=61592847131521" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-amber-100 hover:text-white transition-colors"><Facebook className="w-4 h-4" />DoiCo Bangladesh</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">তথ্য</h4>
              <ul className="space-y-2 text-sm text-amber-100">
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-300" />ঢাকার ভিতরে: ৳৬০</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-300" />ঢাকার বাইরে: ৳১২০</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-300" />বাকৃবি এলাকা: ফ্রি</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-700 mt-8 pt-6 text-center">
            <p className="text-sm text-amber-200 flex items-center justify-center gap-1">তৈরি করেছে <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> দইকো বাংলাদেশ</p>
            <p className="text-xs text-amber-300 mt-1">© {new Date().getFullYear()} সর্বস্বত্ব সংরক্ষিত</p>
          </div>
        </div>
      </footer>

      {/* ─── STICKY MOBILE CTA ─── */}
      {step === "browse" && totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-amber-100 p-3 sm:hidden safe-bottom">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-xs text-stone-500">{totalItems}টি পণ্য</p>
              <p className="font-bold text-stone-800">{formatPrice(total)}</p>
            </div>
            <button onClick={scrollToOrder} className="bg-amber-700 hover:bg-amber-800 text-white font-bold px-6 py-3 rounded-xl transition-all active:scale-95">অর্ডার করুন</button>
          </div>
        </div>
      )}

      {/* Scroll to top */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-20 sm:bottom-6 right-4 z-30 w-10 h-10 bg-amber-700 hover:bg-amber-800 text-white rounded-full shadow-lg flex items-center justify-center transition-all animate-fade-in" aria-label="উপরে যান">
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
