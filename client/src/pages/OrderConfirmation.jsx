import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import LoadingState from "../components/common/LoadingState";
import StatusBadge from "../components/common/StatusBadge";
import { CheckCircle, Package, MapPin, Calendar, ShoppingBag, ArrowRight } from "lucide-react";

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data.order);
      } catch (err) {
        console.error("Failed to load order:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <LoadingState message="Fetching order confirmation..." />;
  if (!order) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-900">Order Not Found</h2>
        <Link to="/products" className="inline-block bg-[#31A464] text-white px-6 py-2.5 rounded-full font-bold text-sm">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      
      {/* Success Receipt Banner */}
      <div className="bg-white rounded-3xl border border-stone-200 p-8 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 bg-emerald-100 text-[#31A464] rounded-full flex items-center justify-center mx-auto shadow-xs border-2 border-emerald-300">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold text-[#31A464] uppercase tracking-wider">ORDER CONFIRMED</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-heading">
            Thank You For Supporting Local Farmers!
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Order Reference: <span className="font-mono font-bold text-stone-800">#{order._id || order.id}</span>
          </p>
        </div>

        <div className="inline-block bg-stone-50 px-4 py-2 rounded-xl border border-stone-200 text-xs text-stone-600">
          Status: <StatusBadge status={order.status} /> • Payment: <span className="font-bold text-stone-900">{order.paymentMethod}</span> ({order.paymentStatus})
        </div>
      </div>

      {/* Items Breakdown */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-xs">
        <h3 className="font-bold text-stone-900 text-base font-heading border-b border-stone-100 pb-3 flex items-center gap-2">
          <Package className="w-4 h-4 text-[#31A464]" />
          <span>Harvest Items Ordered</span>
        </h3>

        <div className="space-y-3">
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-stone-100">
              <div>
                <p className="font-bold text-stone-900 text-sm">{item.name}</p>
                <p className="text-stone-500">Farmer: {item.farmer?.name || "Local Farmer"}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-stone-900">{item.quantity} {item.unit || "kg"}</p>
                <p className="font-extrabold text-[#C77F1F]">Rs. {item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-between items-baseline font-extrabold text-stone-900 text-base">
          <span>Total Order Value</span>
          <span className="text-xl text-[#C77F1F] font-heading">Rs. {order.totalAmount}</span>
        </div>
      </div>

      {/* Delivery Address Summary */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-2 text-xs text-stone-600 shadow-xs">
        <h3 className="font-bold text-stone-900 text-sm font-heading flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4 text-[#C77F1F]" />
          <span>Delivery Details</span>
        </h3>
        <p><span className="font-semibold text-stone-800">Address:</span> {order.deliveryAddress?.addressLine}, {order.deliveryAddress?.city}, {order.deliveryAddress?.district}</p>
        <p><span className="font-semibold text-stone-800">Phone:</span> {order.deliveryAddress?.phone}</p>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/buyer/dashboard"
          className="bg-[#31A464] hover:bg-[#24824e] text-white text-sm font-bold px-8 py-3 rounded-full transition-all inline-flex items-center gap-2 shadow-xs"
        >
          <span>View My Dashboard Orders</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
