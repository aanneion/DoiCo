import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BrandIntro from "./components/BrandIntro";
import ProductSection from "./components/ProductSection";
import OrderSummary from "./components/OrderSummary";
import DeliverySelector from "./components/DeliverySelector";
import CustomerForm from "./components/CustomerForm";
import OrderSuccess from "./components/OrderSuccess";
import Footer from "./components/Footer";
import Divider from "./components/Divider";
import { products } from "./data/products";
import type { OrderItem } from "./lib/pricing";
import {
  calculateSubtotal,
  calculateDeliveryCharge,
  calculateTotal,
  formatPrice,
} from "./lib/pricing";
import { validateOrder } from "./lib/validation";
import { submitOrder } from "./lib/order";
import { ShoppingBag, ChevronUp, AlertCircle } from "lucide-react";

type AppStep = "browse" | "review" | "success";

export default function App() {
  // Product quantities
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  
  // Order state
  const [deliveryArea, setDeliveryArea] = useState<"dhaka-inside" | "dhaka-outside">("dhaka-inside");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  // UI state
  const [step, setStep] = useState<AppStep>("browse");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | undefined>();
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Refs
  const productsRef = useRef<HTMLDivElement>(null);
  const orderSectionRef = useRef<HTMLDivElement>(null);

  // Computed values
  const orderItems: OrderItem[] = useMemo(() => {
    return products
      .filter((p) => (quantities[p.id] || 0) > 0)
      .map((p) => ({
        productId: p.id,
        name: p.name,
        price: p.price,
        quantity: quantities[p.id],
      }));
  }, [quantities]);

  const subtotal = useMemo(() => calculateSubtotal(orderItems), [orderItems]);
  const deliveryCharge = useMemo(() => calculateDeliveryCharge(deliveryArea), [deliveryArea]);
  const total = useMemo(() => calculateTotal(subtotal, deliveryCharge), [subtotal, deliveryCharge]);
  const totalItems = useMemo(() => orderItems.reduce((s, i) => s + i.quantity, 0), [orderItems]);

  // Handlers
  const handleQuantityChange = useCallback((productId: string, quantity: number) => {
    setQuantities((prev) => {
      const next = { ...prev };
      if (quantity === 0) {
        delete next[productId];
      } else {
        next[productId] = quantity;
      }
      return next;
    });
  }, []);

  const handleRemoveItem = useCallback((productId: string) => {
    handleQuantityChange(productId, 0);
  }, [handleQuantityChange]);

  const scrollToProducts = useCallback(() => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToOrder = useCallback(() => {
    orderSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmitOrder = useCallback(async () => {
    // Validate all fields
    const validationErrors = validateOrder(customerName, phone, address, orderItems.length > 0);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors({ ...validationErrors });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await submitOrder({
        customerName,
        phone,
        address,
        deliveryArea,
        items: orderItems,
        subtotal,
        deliveryCharge,
        total,
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
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      {/* Spacer for fixed header */}
      <div className="h-14" />

      {step === "browse" && (
        <>
          <Hero onOrderClick={scrollToOrder} onProductsClick={scrollToProducts} />
          
          <BrandIntro />
          
          <Divider />

          <div ref={productsRef}>
            <ProductSection quantities={quantities} onQuantityChange={handleQuantityChange} />
          </div>

          {/* Delivery Info Banner */}
          <div className="bg-clay-50 border-y border-clay-100 py-6 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-2xl mb-1">🏠</span>
                  <p className="text-sm font-semibold text-clay-800">ঢাকার ভিতরে</p>
                  <p className="text-clay-600">ডেলিভারি চার্জ: ৳৬০</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl mb-1">🚚</span>
                  <p className="text-sm font-semibold text-clay-800">ঢাকার বাইরে</p>
                  <p className="text-clay-600">ডেলিভারি চার্জ: ৳১২০</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl mb-1">📞</span>
                  <p className="text-sm font-semibold text-clay-800">অর্ডার হেল্পলাইন</p>
                  <a href="tel:01623858009" className="text-clay-600 hover:text-clay-800" dir="ltr">01623-858009</a>
                </div>
              </div>
            </div>
          </div>

          {/* Order Section */}
          {totalItems > 0 && (
            <section ref={orderSectionRef} className="py-12 sm:py-16 px-4">
              <div className="max-w-2xl mx-auto space-y-5">
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-clay-800 mb-2">
                    অর্ডার সম্পূর্ণ করুন
                  </h2>
                  <p className="text-clay-500">আপনার তথ্য দিন এবং অর্ডার নিশ্চিত করুন</p>
                </div>

                <OrderSummary
                  items={orderItems}
                  onRemoveItem={handleRemoveItem}
                  onUpdateQuantity={handleQuantityChange}
                />

                <DeliverySelector selectedArea={deliveryArea} onChange={setDeliveryArea} />

                {/* Delivery charge display */}
                <div className="bg-cream-100 rounded-xl p-4 flex justify-between items-center border border-cream-200">
                  <span className="text-clay-600 font-medium">ডেলিভারি চার্জ</span>
                  <span className="font-bold text-clay-800">{formatPrice(deliveryCharge)}</span>
                </div>

                {/* Grand Total */}
                <div className="bg-clay-700 rounded-xl p-5 text-center">
                  <p className="text-cream-200 text-sm mb-1">সর্বমোট</p>
                  <p className="text-3xl font-extrabold text-white">{formatPrice(total)}</p>
                </div>

                <CustomerForm
                  name={customerName}
                  phone={phone}
                  address={address}
                  errors={errors}
                  onNameChange={(v) => { setCustomerName(v); setErrors((e) => ({ ...e, customerName: undefined })); }}
                  onPhoneChange={(v) => { setPhone(v); setErrors((e) => ({ ...e, phone: undefined })); }}
                  onAddressChange={(v) => { setAddress(v); setErrors((e) => ({ ...e, address: undefined })); }}
                />

                {errors.items && (
                  <p className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errors.items}
                  </p>
                )}

                {errors.submit && (
                  <p className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errors.submit}
                  </p>
                )}

                <button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="w-full bg-clay-600 hover:bg-clay-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-clay-600/20 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      পাঠানো হচ্ছে...
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      অর্ডার নিশ্চিত করুন — {formatPrice(total)}
                    </>
                  )}
                </button>
              </div>
            </section>
          )}

          {/* Empty state prompt when no items */}
          {totalItems === 0 && (
            <section className="py-12 px-4">
              <div className="max-w-md mx-auto text-center bg-white rounded-2xl border border-clay-100 p-8">
                <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-clay-300" />
                </div>
                <h3 className="font-bold text-clay-800 text-lg mb-2">আপনার অর্ডার খালি</h3>
                <p className="text-clay-500 text-sm mb-4">
                  উপর থেকে আপনার পছন্দের দই নির্বাচন করুন
                </p>
                <button
                  onClick={scrollToProducts}
                  className="bg-clay-600 hover:bg-clay-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
                >
                  দই দেখুন
                </button>
              </div>
            </section>
          )}
        </>
      )}

      {step === "success" && (
        <OrderSuccess
          items={orderItems}
          total={total}
          orderId={orderId}
          onNewOrder={handleNewOrder}
        />
      )}

      {/* Spacer for sticky mobile CTA */}
      {step === "browse" && totalItems > 0 && <div className="h-20 sm:h-0" />}

      <Footer />

      {/* Sticky Mobile CTA */}
      {step === "browse" && totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-clay-100 p-3 sm:hidden safe-bottom">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-xs text-clay-500">{totalItems}টি পণ্য</p>
              <p className="font-bold text-clay-800">{formatPrice(total)}</p>
            </div>
            <button
              onClick={scrollToOrder}
              className="bg-clay-600 hover:bg-clay-700 text-white font-bold px-6 py-3 rounded-xl transition-all active:scale-95"
            >
              অর্ডার করুন
            </button>
          </div>
        </div>
      )}

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 sm:bottom-6 right-4 z-30 w-10 h-10 bg-clay-600 hover:bg-clay-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all animate-fade-in"
          aria-label="উপরে যান"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
