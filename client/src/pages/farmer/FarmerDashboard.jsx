import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import LoadingState from "../../components/common/LoadingState";
import StatusBadge from "../../components/common/StatusBadge";
import {
  Tractor,
  PlusCircle,
  ShoppingBag,
  Package,
  MapPin,
  ArrowRight
} from "lucide-react";

export default function FarmerDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [farm, setFarm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const [prodRes, ordRes] = await Promise.all([
          api.get("/products/my/list"),
          api.get("/orders/farmer-orders")
        ]);

        setProducts(prodRes.data.products || []);
        setOrders(ordRes.data.orders || []);
        setFarm(user?.farm || null);
      } catch (err) {
        console.error("Failed to load farmer dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerData();
  }, [user]);

  if (loading) {
    return (
      <LoadingState message="Connecting to Farm Digital Control Center..." />
    );
  }

  const totalRevenue = orders.reduce(
    (sum, ord) => sum + (ord.totalAmount || 0),
    0
  );

  const activeListings = products.filter(
    (p) => p.isActive
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Farm Control Header */}
      <div className="bg-[#001D0D] text-white rounded-3xl p-8 border-b-4 border-[#31A464] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">

          <div className="inline-flex items-center gap-2 bg-[#31A464]/20 border border-[#31A464]/40 text-[#31A464] text-xs font-bold px-3 py-1 rounded-full">
            <Tractor className="w-4 h-4 text-[#C77F1F]" />
            <span>FARM DIGITAL CONTROL CENTER</span>
          </div>

          <h1 className="text-3xl font-extrabold font-heading">
            {farm?.farmName || `${user?.name}'s Harvest Hub`}
          </h1>

          <p className="text-stone-300 text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C77F1F]" />
            <span>
              {farm?.district ||
                farm?.location ||
                "Nuwara Eliya"}
              , Sri Lanka
            </span>
          </p>
        </div>

        <Link
          to="/farmer/products/add"
          className="bg-[#31A464] hover:bg-[#24824e] text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg transition-all flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-5 h-5" />
          <span>List New Harvest Produce</span>
        </Link>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* Total Sales Income */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Total Sales Income
          </p>

          <p className="text-2xl font-black text-[#C77F1F] font-heading">
            Rs. {totalRevenue}
          </p>

          <p className="text-[11px] text-stone-400 font-medium">
            Direct farm earnings
          </p>
        </div>

        {/* Orders Received */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Orders Received
          </p>

          <p className="text-2xl font-black text-stone-900 font-heading">
            {orders.length}
          </p>

          <p className="text-[11px] text-emerald-700 font-medium">
            From verified buyers
          </p>
        </div>

        {/* Active Produce Listings */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Active Produce Listings
          </p>

          <p className="text-2xl font-black text-[#31A464] font-heading">
            {activeListings}
          </p>

          <p className="text-[11px] text-stone-400 font-medium">
            Items live in market
          </p>
        </div>

      </div>

      {/* Inventory and Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Farm Inventory Stock Monitor */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 space-y-6 shadow-xs">

          <div className="flex items-center justify-between border-b border-stone-100 pb-3">

            <h3 className="font-bold text-stone-900 text-lg font-heading flex items-center gap-2">
              <Package className="w-5 h-5 text-[#31A464]" />
              <span>Live Crop Stock Inventory</span>
            </h3>

            <Link
              to="/farmer/products/add"
              className="text-xs font-bold text-[#31A464] hover:underline"
            >
              + Add Produce
            </Link>

          </div>

          {products.length === 0 ? (
            <p className="text-xs text-stone-500 text-center py-6">
              No produce listed yet. Click "+ List New Harvest Produce" to
              start selling!
            </p>
          ) : (
            <div className="space-y-4">

              {products.map((item) => {

                const maxCap = 200;

                const percent = Math.min(
                  100,
                  Math.round(
                    (item.quantity / maxCap) * 100
                  )
                );

                return (
                  <div
                    key={item._id || item.id}
                    className="p-3 bg-[#F5F5F4] rounded-2xl border border-stone-200 space-y-2"
                  >

                    <div className="flex items-center justify-between text-xs">

                      <div>
                        <span className="font-bold text-stone-900 text-sm">
                          {item.name}
                        </span>

                        <span className="text-stone-500 ml-2">
                          ({item.category?.name || "Category"})
                        </span>
                      </div>

                      <span className="font-extrabold text-[#C77F1F] text-sm">
                        Rs. {item.price} /{item.unit || "kg"}
                      </span>

                    </div>

                    {/* Stock Progress Bar */}
                    <div className="space-y-1">

                      <div className="flex justify-between text-[11px] text-stone-600 font-semibold">

                        <span>
                          Stock Remaining: {item.quantity}{" "}
                          {item.unit || "kg"}
                        </span>

                        <span>
                          {item.isAvailable
                            ? "Available"
                            : "Out of Stock"}
                        </span>

                      </div>

                      <div className="w-full bg-stone-300 h-2 rounded-full overflow-hidden">

                        <div
                          className={`h-full transition-all ${
                            item.quantity > 50
                              ? "bg-[#31A464]"
                              : item.quantity > 0
                              ? "bg-[#C77F1F]"
                              : "bg-rose-500"
                          }`}
                          style={{
                            width: `${percent}%`
                          }}
                        ></div>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

        {/* Received Orders */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 p-6 space-y-6 shadow-xs">

          <div className="flex items-center justify-between border-b border-stone-100 pb-3">

            <h3 className="font-bold text-stone-900 text-lg font-heading flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C77F1F]" />
              <span>Received Orders</span>
            </h3>

            <Link
              to="/farmer/orders"
              className="text-xs font-bold text-[#31A464] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

          </div>

          {orders.length === 0 ? (
            <p className="text-xs text-stone-500 text-center py-6">
              No orders received yet.
            </p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">

              {orders.slice(0, 5).map((ord) => (

                <div
                  key={ord._id || ord.id}
                  className="p-3.5 bg-[#F5F5F4] rounded-2xl border border-stone-200 text-xs space-y-2"
                >

                  <div className="flex items-center justify-between">

                    <span className="font-mono font-bold text-stone-900">
                      #{ord._id || ord.id}
                    </span>

                    <StatusBadge status={ord.status} />

                  </div>

                  <p className="text-stone-600 font-medium">
                    Buyer: {ord.buyer?.name || "Customer"}
                  </p>

                  <div className="flex justify-between items-baseline pt-1 border-t border-stone-200/80">

                    <span className="text-stone-500">
                      {ord.items?.length || 0} items
                    </span>

                    <span className="font-extrabold text-[#C77F1F] text-sm">
                      Rs. {ord.totalAmount}
                    </span>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}