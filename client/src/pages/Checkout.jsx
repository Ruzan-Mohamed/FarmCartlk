import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import toast from "react-hot-toast";
import { User, Sprout, Info, MapPin, Phone, ArrowRight } from "lucide-react";

export default function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();

  const navigate = useNavigate();

  const [farmers, setFarmers] = useState({});
  const [farmersLoading, setFarmersLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  // Get unique farmer IDs from cart
  const farmerIds = [
    ...new Set(
      cartItems
        .map((item) => {
          if (!item.farmer) {
            return null;
          }

          if (typeof item.farmer === "object") {
            return item.farmer._id;
          }

          return item.farmer;
        })
        .filter(Boolean),
    ),
  ];

  // Load farmer and farm information
  useEffect(() => {
    const loadFarmers = async () => {
      try {
        if (farmerIds.length === 0) {
          setFarmersLoading(false);
          return;
        }

        const farmerData = {};

        for (const farmerId of farmerIds) {
          try {
            const response = await api.get(`/farms/farmer/${farmerId}`);

            if (response.data?.farm) {
              farmerData[farmerId] = response.data.farm;
            }
          } catch (error) {
            console.error(
              "Could not load farmer information:",
              farmerId,
              error.response?.data || error.message,
            );
          }
        }

        setFarmers(farmerData);
      } catch (error) {
        console.error("Failed to load farmer information:", error);
      } finally {
        setFarmersLoading(false);
      }
    };

    loadFarmers();
  }, [cartItems.length]);

  // Place order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          product: item.product,
          farmer:
            typeof item.farmer === "object" ? item.farmer._id : item.farmer,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
          unit: item.unit || "kg",
        })),

        paymentMethod: "Cash on Delivery",
      };

      console.log("Sending order:", orderPayload);

      const response = await api.post("/orders", orderPayload);

      console.log("Order response:", response.data);

      if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || "Failed to create order");
      }

      toast.success("Order placed successfully!");

      clearCart();

      const orderId = response.data.order?._id || response.data.order?.id;

      if (orderId) {
        navigate(`/order-confirmation/${orderId}`);
      } else {
        navigate("/buyer/dashboard");
      }
    } catch (error) {
      console.error("Place order error:", error);

      console.error("Server response:", error.response?.data);

      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-[#001D0D] text-white rounded-3xl p-8 border-b-4 border-[#31A464]">
        <span className="text-xs font-bold text-[#31A464] uppercase tracking-wider bg-[#31A464]/20 px-3 py-1 rounded-full">
          DIRECT FARM ORDER
        </span>

        <h1 className="text-3xl font-extrabold font-heading mt-2">
          Farm Order Checkout
        </h1>

        <p className="text-stone-300 text-sm mt-1">
          Review the farmer details and confirm your harvest order.
        </p>
      </div>

      <form
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        <div className="lg:col-span-7">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-5">
            <h3 className="font-bold text-stone-900 text-lg font-heading flex items-center gap-2">
              <User className="w-5 h-5 text-[#31A464]" />

              <span>Farmer Information</span>
            </h3>

            {farmersLoading ? (
              <div className="bg-[#F5F5F4] rounded-2xl p-5 text-sm text-stone-500">
                Loading farmer information...
              </div>
            ) : (
              farmerIds.map((farmerId) => {
                const farm = farmers[farmerId];

                const farmer = farm?.farmer;

                const farmerItems = cartItems.filter((item) => {
                  const itemFarmer =
                    typeof item.farmer === "object"
                      ? item.farmer._id
                      : item.farmer;

                  return itemFarmer === farmerId;
                });

                return (
                  <div key={farmerId} className="space-y-3">
                    <div className="bg-[#F5F5F4] rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-[#31A464]" />

                        <span className="text-xs font-semibold text-stone-500">
                          Farmer Name
                        </span>
                      </div>

                      <p className="font-bold text-stone-900 text-lg">
                        {farmer?.name || farmer?.username || "Farmer"}
                      </p>
                    </div>

                    <div className="bg-[#F5F5F4] rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Sprout className="w-4 h-4 text-[#31A464]" />

                        <span className="text-xs font-semibold text-stone-500">
                          Farm Name
                        </span>
                      </div>

                      <p className="font-bold text-stone-900">
                        {farm?.farmName || "Farm"}
                      </p>
                    </div>

                    <div className="bg-[#F5F5F4] rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4 text-[#31A464]" />

                        <span className="text-xs font-semibold text-stone-500">
                          Farmer Details
                        </span>
                      </div>

                      <p className="text-sm text-stone-700">
                        {farm?.description || "No farmer details available."}
                      </p>
                    </div>

                    <div className="bg-[#F5F5F4] rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-[#31A464]" />

                        <span className="text-xs font-semibold text-stone-500">
                          Farm Location
                        </span>
                      </div>

                      <p className="font-bold text-stone-900">
                        {farm?.location ||
                          farm?.district ||
                          "Location not available"}
                      </p>

                      {farm?.district &&
                        farm?.location &&
                        farm.district !== farm.location && (
                          <p className="text-xs text-stone-500 mt-1">
                            {farm.district}
                          </p>
                        )}

                      {farm?.address && (
                        <p className="text-xs text-stone-500 mt-1">
                          {farm.address}
                        </p>
                      )}
                    </div>

                    <div className="bg-[#F5F5F4] rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-[#31A464]" />

                        <span className="text-xs font-semibold text-stone-500">
                          Farmer Contact Number
                        </span>
                      </div>

                      {farm?.contactNumber || farmer?.phone ? (
                        <a
                          href={`tel:${farm?.contactNumber || farmer?.phone}`}
                          className="font-bold text-[#31A464] hover:underline"
                        >
                          {farm?.contactNumber || farmer?.phone}
                        </a>
                      ) : (
                        <p className="font-bold text-stone-900">
                          Not available
                        </p>
                      )}
                    </div>

                    <div className="bg-white border border-stone-200 rounded-2xl p-4">
                      <p className="font-bold text-sm text-stone-800 mb-3">
                        Your Items From This Farmer
                      </p>

                      <div className="space-y-2">
                        {farmerItems.map((item) => (
                          <div
                            key={item.product}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-stone-700">
                              {item.name} × {item.quantity} {item.unit || "kg"}
                            </span>

                            <span className="font-bold text-[#C77F1F]">
                              Rs.{" "}
                              {(
                                Number(item.price) * Number(item.quantity)
                              ).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-6 shadow-xs sticky top-24">
            <h3 className="font-bold text-stone-900 text-lg font-heading border-b border-stone-100 pb-3">
              Order Breakdown ({cartItems.length} items)
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.product}
                  className="flex items-center justify-between text-xs py-2 border-b border-stone-100"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">
                      {item.name}
                    </span>

                    <span className="text-stone-500">
                      × {item.quantity} {item.unit || "kg"}
                    </span>
                  </div>

                  <span className="font-bold text-[#C77F1F]">
                    Rs.{" "}
                    {(
                      Number(item.price) * Number(item.quantity)
                    ).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t border-stone-200">
              <div className="flex justify-between text-stone-600 text-sm">
                <span>Subtotal</span>

                <span>Rs. {Number(subtotal).toLocaleString()}</span>
              </div>

              <div className="flex justify-between font-extrabold text-stone-900 text-base pt-3 border-t border-stone-100">
                <span>Total Amount (LKR)</span>

                <span className="text-2xl text-[#C77F1F] font-heading">
                  Rs. {Number(subtotal).toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#31A464] hover:bg-[#24824e] disabled:bg-stone-300 text-white font-bold py-3.5 rounded-full shadow-xs transition-all flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <span>Placing Order...</span>
              ) : (
                <>
                  <span>Place Harvest Order</span>

                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-stone-400">
              Your order will be sent directly to the farmer.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
