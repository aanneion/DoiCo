import { useState, useEffect } from "react";
import { Package, Phone, MapPin, Calendar, Trash2, Search, ArrowLeft } from "lucide-react";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  customerName: string;
  phone: string;
  address: string;
  deliveryArea: "dhaka-inside" | "dhaka-outside";
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  orderId: string;
  timestamp: string;
}

interface AdminDashboardProps {
  onBack: () => void;
}

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem("doico_orders") || "[]");
    setOrders(storedOrders);
  };

  const clearAllOrders = () => {
    if (confirm("সব অর্ডার মুছে ফেলতে চান?")) {
      localStorage.removeItem("doico_orders");
      setOrders([]);
      setSelectedOrder(null);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm) ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (amount: number) => `৳${amount}`;

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-amber-50/30">
      {/* Header */}
      <header className="bg-white border-b border-amber-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-amber-50 rounded-lg transition-colors"
              aria-label="ফিরে যান"
            >
              <ArrowLeft className="w-5 h-5 text-stone-700" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-stone-800">অর্ডার ড্যাশবোর্ড</h1>
              <p className="text-xs text-stone-500">দইকো বাংলাদেশ</p>
            </div>
          </div>
          <button
            onClick={clearAllOrders}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            সব মুছুন
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-amber-100 p-5">
            <p className="text-sm text-stone-500 mb-1">মোট অর্ডার</p>
            <p className="text-3xl font-bold text-stone-800">{orders.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-amber-100 p-5">
            <p className="text-sm text-stone-500 mb-1">মোট আয়</p>
            <p className="text-3xl font-bold text-amber-700">
              {formatPrice(orders.reduce((sum, o) => sum + o.total, 0))}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-amber-100 p-5">
            <p className="text-sm text-stone-500 mb-1">গড় অর্ডার মূল্য</p>
            <p className="text-3xl font-bold text-stone-800">
              {orders.length > 0
                ? formatPrice(Math.round(orders.reduce((sum, o) => sum + o.total, 0) / orders.length))
                : "৳০"}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="নাম, ফোন নম্বর বা অর্ডার আইডি দিয়ে খুঁজুন..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-amber-100 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all text-stone-800 placeholder:text-stone-400"
            />
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl border border-amber-100 p-12 text-center">
            <Package className="w-16 h-16 text-amber-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-stone-800 mb-2">
              {orders.length === 0 ? "কোনো অর্ডার নেই" : "কোনো অর্ডার পাওয়া যায়নি"}
            </h3>
            <p className="text-stone-500 text-sm">
              {orders.length === 0
                ? "নতুন অর্ডার আসলে এখানে দেখা যাবে"
                : "আপনার খোঁজ পরিবর্তন করে দেখুন"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-xl border border-amber-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-stone-500 mb-1" dir="ltr">
                        {order.orderId}
                      </p>
                      <h3 className="font-bold text-stone-800 text-lg">{order.customerName}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-amber-700">{formatPrice(order.total)}</p>
                      <p className="text-xs text-stone-500 flex items-center gap-1 justify-end">
                        <Calendar className="w-3 h-3" />
                        {formatDate(order.timestamp)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-stone-600 mb-3">
                    <a href={`tel:${order.phone}`} className="flex items-center gap-1 hover:text-amber-700">
                      <Phone className="w-4 h-4" />
                      <span dir="ltr">{order.phone}</span>
                    </a>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {order.deliveryArea === "dhaka-inside" ? "ঢাকার ভিতরে" : "ঢাকার বাইরে"}
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-3 mb-3">
                    <p className="text-xs text-stone-500 mb-1">পণ্য:</p>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-stone-700">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-medium text-stone-800">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-stone-600 mb-3">
                    <span className="font-medium">ঠিকানা:</span> {order.address}
                  </p>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="w-full py-2 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-lg transition-colors"
                  >
                    বিস্তারিত দেখুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-amber-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-stone-800">অর্ডার বিস্তারিত</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-amber-50 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs text-stone-500 mb-1" dir="ltr">
                  {selectedOrder.orderId}
                </p>
                <p className="text-sm text-stone-500">{formatDate(selectedOrder.timestamp)}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-stone-500 mb-1">গ্রাহকের নাম</p>
                  <p className="font-semibold text-stone-800">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-stone-500 mb-1">মোবাইল নম্বর</p>
                  <a
                    href={`tel:${selectedOrder.phone}`}
                    className="font-semibold text-amber-700 hover:underline"
                    dir="ltr"
                  >
                    {selectedOrder.phone}
                  </a>
                </div>
              </div>

              <div>
                <p className="text-sm text-stone-500 mb-1">ঠিকানা</p>
                <p className="font-semibold text-stone-800">{selectedOrder.address}</p>
              </div>

              <div>
                <p className="text-sm text-stone-500 mb-1">ডেলিভারি এলাকা</p>
                <p className="font-semibold text-stone-800">
                  {selectedOrder.deliveryArea === "dhaka-inside" ? "ঢাকার ভিতরে" : "ঢাকার বাইরে"}
                </p>
              </div>

              <div className="bg-amber-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-stone-700 mb-3">পণ্যের তালিকা</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-stone-700">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium text-stone-800">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-amber-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">পণ্যের মোট</span>
                  <span className="font-medium text-stone-800">{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">ডেলিভারি চার্জ</span>
                  <span className="font-medium text-stone-800">{formatPrice(selectedOrder.deliveryCharge)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-amber-100">
                  <span className="text-stone-800">সর্বমোট</span>
                  <span className="text-amber-700">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
