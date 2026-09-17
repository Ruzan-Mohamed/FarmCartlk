import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ShoppingCart, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const isAvailable = product.isAvailable && product.quantity > 0;
  const imageUrl = product.image || (product.images && product.images[0]) || "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80";

  return (
    <div className="group bg-[#F5F5F4] rounded-[12px] border border-stone-300 hover:border-[#31A464] overflow-hidden transition-all duration-300 flex flex-col justify-between h-full shadow-2xs hover:shadow-md">
      
      {/* Product Image & Badges Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-200">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80";
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          {product.isOrganic ? (
            <span className="bg-[#31A464] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> ORGANIC
            </span>
          ) : (
            <span className="bg-[#001D0D]/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
              FRESH HARVEST
            </span>
          )}

          {isAvailable ? (
            <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
              In Stock
            </span>
          ) : (
            <span className="bg-rose-100 text-rose-800 border border-rose-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
              Sold Out
            </span>
          )}
        </div>

        {/* Location Tag Bottom */}
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-stone-200 text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
          <MapPin className="w-2.5 h-2.5 text-[#C77F1F]" />
          <span>{product.location || "Sri Lanka"}</span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Farmer Name */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="font-semibold text-[#4C9AAD]">
              {product.category?.name || "Agriculture"}
            </span>
            <span className="truncate max-w-[100px] text-stone-600">
              {product.farmer?.name || "Local Farmer"}
            </span>
          </div>

          {/* Product Title */}
          <Link to={`/products/${product._id || product.id}`} className="block">
            <h3 className="font-bold text-stone-900 text-sm group-hover:text-[#31A464] line-clamp-1 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Short Subtext / Quantity */}
          <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
            Available: {product.quantity} {product.unit || "kg"}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-stone-500 font-medium">Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold text-[#C77F1F]">Rs. {product.price}</span>
              <span className="text-[10px] text-stone-500 font-semibold">/{product.unit || "kg"}</span>
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={!isAvailable}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isAvailable
                ? "bg-[#31A464] text-white hover:bg-[#24824e] active:scale-95 shadow-xs cursor-pointer"
                : "bg-stone-300 text-stone-500 cursor-not-allowed"
            }`}
            title={isAvailable ? "Add harvest to cart" : "Out of stock"}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

      </div>

    </div>
  );
}
