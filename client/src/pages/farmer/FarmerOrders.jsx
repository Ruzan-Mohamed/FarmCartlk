import React, { useEffect, useState } from "react";
import api from "../../services/api";
import LoadingState from "../../components/common/LoadingState";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import toast from "react-hot-toast";
import { ShoppingBag, CheckCircle, MapPin, Phone, RefreshCw } from "lucide-react";

export default function FarmerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFarmerOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/orders/farmer-orders");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Failed to load farmer orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmerOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      toast.success(`Order status updated to ${newStatus}`);
      fetchFarmerOrders();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-[#001D0D] text-white rounded-3xl p-8 border-b-4 border-[#31A464] flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-[#31A464] uppercase tracking-wider bg-[#31A464]/20 px-3 py-1 rounded-full">
            FARM FULFILLMENT CENTER
          </span>
          <h1 className="text-3xl font-extrabold font-heading mt-2">Received Buyer Orders</h1>
          <p className="text-stone-300 text-sm">Update status as you harvest, pack, and ship produce.</p>
        </div>

        <button
          onClick={fetchFarmerOrders}
          className="bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold px-4 py-2.5 rounded-full border border-stone-700 flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {loading ? (
        <LoadingState message="Fetching received orders..." />
      ) : orders.length === 0 ? (
        <EmptyState
          title="No orders received yet"
          message="Orders placed by buyers containing your harvest products will appear here."
        />
      ) : (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div key={ord._id || ord.id} className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-xs">
              
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
                <div>
                  <span className="font-mono font-bold text-stone-900 text-base">Order #{ord._id || ord.id}</span>
                  <span className="text-xs text-stone-400 ml-3">
                    {new Date(ord.createdAt || ord.orderDate).toLocaleString("en-GB")}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={ord.status} />

                  {/* Status Change Dropdown */}
                  <select
                    value={ord.status}
                    onChange={(e) => handleUpdateStatus(ord._id || ord.id, e.target.value)}
                    className="bg-[#F5F5F4] text-xs font-bold text-stone-800 rounded-xl px-3 py-1.5 border border-stone-300 focus:outline-none focus:border-[#31A464]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing / Harvest Packed</option>
                    <option value="Ready">Ready for Pickup</option>
                    <option value="Completed">Completed / Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-2 text-xs">
                <p className="font-bold text-stone-700 uppercase">Ordered Harvest Produce:</p>
                <div className="bg-[#F5F5F4] p-3 rounded-2xl border border-stone-200 space-y-1.5">
                  {ord.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-stone-800 font-medium">
                      <span>{item.name} ({item.quantity} {item.unit || "kg"})</span>
                      <span className="font-bold text-[#C77F1F]">Rs. {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buyer & Delivery Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div>
                  <p className="font-bold text-stone-900 mb-0.5">Buyer Contact</p>
                  <p>{ord.buyer?.name || "Customer"}</p>
                  <p className="flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-[#31A464]" /> {ord.deliveryAddress?.phone || ord.buyer?.phone}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-stone-900 mb-0.5">Delivery Address</p>
                  <p className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C77F1F]" />
                    {ord.deliveryAddress?.addressLine}, {ord.deliveryAddress?.city}, {ord.deliveryAddress?.district}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
