import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import EmptyState from "../components/common/EmptyState";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sprout, Tractor } from "lucide-react";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <EmptyState
          title="Your cart is waiting for a fresh harvest"
          message="Explore fresh vegetables, fruits, indigenous rice, and spices direct from Sri Lankan farmers."
          actionText="Shop Fresh Produce"
          onAction={() => navigate("/products")}
        />
      </div>
    );
  }

  const deliveryFee = 0; // Fixed Sri Lanka local delivery fee estimate in LKR
  const totalAmount = subtotal + deliveryFee;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs font-bold text-[#31A464] uppercase tracking-wider">HARVEST BASKET</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-heading">
            Your FarmCart Items ({cartItems.length})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Cart Item List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.product}
              className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image || "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop&q=80"}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover border border-stone-200 shrink-0 bg-stone-100"
                />

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#4C9AAD] flex items-center gap-1">
                    <Tractor className="w-3 h-3" /> {item.farmerName || "Local Farmer"}
                  </span>
                  <h3 className="font-bold text-stone-900 text-base">{item.name}</h3>
                  <p className="text-xs text-stone-500 font-semibold">
                    Rs. {item.price} /{item.unit || "kg"}
                  </p>
                </div>
              </div>

              {/* Quantity & Subtotal Controls */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
                
                {/* Quantity Buttons */}
                <div className="flex items-center border border-stone-300 rounded-xl bg-[#F5F5F4] p-1">
                  <button
                    onClick={() => updateQuantity(item.product, item.quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center text-stone-700 hover:bg-stone-200 rounded-lg"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-xs text-stone-900">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-stone-700 hover:bg-stone-200 rounded-lg"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Item Subtotal */}
                <div className="text-right">
                  <p className="text-[10px] text-stone-400 font-semibold">Subtotal</p>
                  <p className="text-base font-extrabold text-[#C77F1F] font-heading">
                    Rs. {item.price * item.quantity}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.product)}
                  className="p-2 text-stone-400 hover:text-rose-600 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

              </div>

            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-6 shadow-xs sticky top-24">
            <h3 className="font-bold text-stone-900 text-lg font-heading border-b border-stone-100 pb-3">
              Harvest Order Summary
            </h3>

            <div className="space-y-3 text-sm text-stone-600">
              <div className="flex justify-between">
                <span>Produce Subtotal</span>
                <span className="font-bold text-stone-900">Rs. {subtotal}</span>
              </div>
              

              <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                <span className="font-extrabold text-stone-900 text-base">Grand Total (LKR)</span>
                <span className="font-black text-2xl text-[#C77F1F] font-heading">Rs. {totalAmount}</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-[#31A464] hover:bg-[#24824e] text-white font-bold py-3.5 rounded-full shadow-xs transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1">
              <Sprout className="w-3.5 h-3.5 text-[#31A464]" />
              <span>Direct Payment to Sri Lankan Farmers on Delivery</span>
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
