import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import LoadingState from "../components/common/LoadingState";
import StatusBadge from "../components/common/StatusBadge";
import EmptyState from "../components/common/EmptyState";
import toast from "react-hot-toast";

import {
  User,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Check,
  Sprout,
} from "lucide-react";

export default function BuyerDashboard() {
  const { user, updateUserProfile } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit profile state
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  // Fetch buyer orders
  useEffect(() => {
    const fetchBuyerOrders = async () => {
      try {
        const res = await api.get("/orders/my-orders");

        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(
          "Failed to load buyer orders:",
          err
        );

        toast.error("Failed to load your orders");
      } finally {
        setLoading(false);
      }
    };

    fetchBuyerOrders();
  }, []);

  // Update buyer profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateUserProfile({
        name,
        phone,
      });

      toast.success(
        "Profile updated successfully!"
      );

      setIsEditing(false);
    } catch (err) {
      console.error(
        "Profile update error:",
        err
      );

      toast.error(
        "Failed to update profile"
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Dashboard Header */}
      <div className="bg-[#001D0D] text-white rounded-3xl p-8 border-b-4 border-[#31A464]">

        <span className="text-xs font-bold text-[#31A464] uppercase tracking-wider bg-[#31A464]/20 px-3 py-1 rounded-full">
          BUYER ACCOUNT
        </span>

        <h1 className="text-3xl font-extrabold font-heading mt-2">
          Buyer Dashboard
        </h1>

        <p className="text-stone-300 text-sm">
          Manage your account profile and track direct farm orders.
        </p>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Buyer Profile Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-stone-200 p-6 space-y-6 shadow-xs h-fit">

          <div className="flex items-center justify-between border-b border-stone-100 pb-3">

            <h3 className="font-bold text-stone-900 text-base font-heading">
              Personal Details
            </h3>

            <button
              onClick={() =>
                setIsEditing(!isEditing)
              }
              className="text-xs font-bold text-[#31A464] hover:underline flex items-center gap-1"
            >

              <Edit3 className="w-3.5 h-3.5" />

              <span>
                {isEditing ? "Cancel" : "Edit"}
              </span>

            </button>

          </div>

          {!isEditing ? (

            <div className="space-y-4">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 bg-[#31A464] text-white rounded-full flex items-center justify-center font-bold text-lg">

                  {user?.name
                    ? user.name
                        .charAt(0)
                        .toUpperCase()
                    : "B"}

                </div>

                <div>

                  <h4 className="font-bold text-stone-900 text-base">
                    {user?.name}
                  </h4>

                  <span className="text-xs text-[#31A464] font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    Verified Buyer
                  </span>

                </div>

              </div>

              <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">

                <p className="flex items-center gap-2">

                  <User className="w-4 h-4 text-stone-400" />

                  <span>
                    {user?.email}
                  </span>

                </p>

                <p className="flex items-center gap-2">

                  <Phone className="w-4 h-4 text-stone-400" />

                  <span>
                    {user?.phone ||
                      "No phone added"}
                  </span>

                </p>

              </div>

            </div>

          ) : (

            <form
              onSubmit={handleProfileUpdate}
              className="space-y-3"
            >

              <div>

                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Full Name
                </label>

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full bg-[#F5F5F4] text-xs rounded-xl px-3 py-2 border border-stone-200"
                />

              </div>

              <div>

                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Phone
                </label>

                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="w-full bg-[#F5F5F4] text-xs rounded-xl px-3 py-2 border border-stone-200"
                />

              </div>

              <button
                type="submit"
                className="w-full bg-[#31A464] text-white font-bold text-xs py-2 rounded-full flex items-center justify-center gap-1"
              >

                <Check className="w-3.5 h-3.5" />

                Save Changes

              </button>

            </form>

          )}

        </div>

        {/* Buyer Order History */}
        <div className="lg:col-span-8 space-y-4">

          <h3 className="font-bold text-stone-900 text-xl font-heading">
            Your Order History ({orders.length})
          </h3>

          {loading ? (

            <LoadingState message="Fetching your orders..." />

          ) : orders.length === 0 ? (

            <EmptyState
              title="No direct farm orders yet"
              message="When you order produce from local farmers, your items will appear here."
            />

          ) : (

            <div className="space-y-4">

              {orders.map((ord) => {

                // Get the first item for farmer information
                const firstItem =
                  ord.items?.[0];

                const farmer =
                  firstItem?.farmer;

                const farm =
                  firstItem?.farm;

                return (

                  <div
                    key={ord._id || ord.id}
                    className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 shadow-2xs"
                  >

                    {/* Order Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3 text-xs">

                      <div>

                        <span className="font-mono font-bold text-stone-900">

                          Order #
                          {ord._id ||
                            ord.id}

                        </span>

                        <span className="text-stone-400 ml-2">

                          {new Date(
                            ord.createdAt ||
                              ord.orderDate
                          ).toLocaleDateString(
                            "en-GB"
                          )}

                        </span>

                      </div>

                      <div className="flex items-center gap-2">

                        <StatusBadge
                          status={ord.status}
                        />

                        <span className="font-extrabold text-[#C77F1F] text-sm font-heading">

                          Rs.{" "}
                          {Number(
                            ord.totalAmount || 0
                          ).toLocaleString()}

                        </span>

                      </div>

                    </div>

                    {/* Ordered Items */}
                    <div className="space-y-2 text-xs text-stone-600">

                      <p className="font-semibold text-stone-800">
                        Items Ordered (
                        {ord.items?.length ||
                          0}
                        ):
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {ord.items?.map(
                          (item, idx) => (

                            <span
                              key={idx}
                              className="bg-[#F5F5F4] px-2.5 py-1 rounded-md text-[11px] font-medium border border-stone-200"
                            >

                              {item.name} (
                              {item.quantity}{" "}
                              {item.unit ||
                                "kg"}
                              )

                            </span>

                          )
                        )}

                      </div>

                    </div>

                    {/* Farmer Information */}
                    <div className="border-t border-stone-100 pt-4">

                      <p className="font-bold text-stone-800 text-sm mb-3 flex items-center gap-2">

                        <Sprout className="w-4 h-4 text-[#31A464]" />

                        Farmer Information

                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                        {/* Farmer Name */}
                        <div className="bg-[#F5F5F4] rounded-xl p-3">

                          <div className="flex items-center gap-2">

                            <User className="w-4 h-4 text-[#31A464]" />

                            <span className="text-[11px] text-stone-500 font-semibold">
                              Farmer Name
                            </span>

                          </div>

                          <p className="text-sm font-bold text-stone-900 mt-1">

                            {farmer?.name ||
                              "Local Farmer"}

                          </p>

                        </div>

                        {/* Farmer Phone */}
                        <div className="bg-[#F5F5F4] rounded-xl p-3">

                          <div className="flex items-center gap-2">

                            <Phone className="w-4 h-4 text-[#31A464]" />

                            <span className="text-[11px] text-stone-500 font-semibold">
                              Phone Number
                            </span>

                          </div>

                          {farmer?.phone ? (

                            <a
                              href={`tel:${farmer.phone}`}
                              className="text-sm font-bold text-[#31A464] hover:underline mt-1 block"
                            >
                              {farmer.phone}
                            </a>

                          ) : (

                            <p className="text-sm font-bold text-stone-900 mt-1">
                              Not available
                            </p>

                          )}

                        </div>

                        {/* Farm Name */}
                        <div className="bg-[#F5F5F4] rounded-xl p-3">

                          <div className="flex items-center gap-2">

                            <Sprout className="w-4 h-4 text-[#31A464]" />

                            <span className="text-[11px] text-stone-500 font-semibold">
                              Farm Name
                            </span>

                          </div>

                          <p className="text-sm font-bold text-stone-900 mt-1">

                            {farm?.farmName ||
                              "Local Farm"}

                          </p>

                        </div>

                        {/* Farm Location */}
                        <div className="bg-[#F5F5F4] rounded-xl p-3">

                          <div className="flex items-center gap-2">

                            <MapPin className="w-4 h-4 text-[#31A464]" />

                            <span className="text-[11px] text-stone-500 font-semibold">
                              Farm Location
                            </span>

                          </div>

                          <p className="text-sm font-bold text-stone-900 mt-1">

                            {farm?.location ||
                              farm?.district ||
                              "Sri Lanka"}

                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}