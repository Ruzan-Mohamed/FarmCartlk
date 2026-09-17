import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import LoadingState from "../components/common/LoadingState";
import ProductCard from "../components/marketplace/ProductCard";
import { 
  ShoppingBag, 
  MapPin, 
  Sparkles, 
  Plus, 
  Minus, 
  CheckCircle, 
  Tractor, 
  ArrowLeft,
  Calendar,
  ShieldCheck
} from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [farm, setFarm] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.product);
        setFarm(res.data.farm);
        
        const img = res.data.product.image || (res.data.product.images && res.data.product.images[0]) || "";
        setActiveImage(img);

        // Fetch related products in category
        if (res.data.product.category?._id || res.data.product.category) {
          const catId = res.data.product.category._id || res.data.product.category;
          const relatedRes = await api.get(`/products?category=${catId}&limit=4`);
          setRelatedProducts(
            (relatedRes.data.products || []).filter((p) => (p._id || p.id) !== id)
          );
        }
      } catch (err) {
        console.error("Failed to load product detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <LoadingState message="Loading produce details..." />;
  if (!product) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-900">Produce Not Found</h2>
        <p className="text-stone-500 text-sm">The agricultural listing you requested could not be located.</p>
        <Link to="/products" className="inline-block bg-[#31A464] text-white px-6 py-2.5 rounded-full font-bold text-sm">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const isAvailable = product.isAvailable && product.quantity > 0;
  const images = product.images && product.images.length > 0 ? product.images : [activeImage];

  const handleIncrement = () => {
    if (quantity < product.quantity) setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Back Button */}
      <Link to="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#31A464] transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Marketplace</span>
      </Link>

      {/* Main Detail Grid */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Image Showcase */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-4/3 w-full bg-[#F5F5F4] rounded-2xl overflow-hidden border border-stone-200 relative">
            <img
              src={activeImage || "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80"}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80";
              }}
            />
            {product.isOrganic && (
              <span className="absolute top-4 left-4 bg-[#31A464] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> ORGANIC CERTIFIED
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImage === img ? "border-[#31A464] scale-95" : "border-stone-200"
                  }`}
                >
                  <img src={img} alt="Produce thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Details & Purchase Actions */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          
          <div className="space-y-4">
            {/* Category & Location Badges */}
            <div className="flex items-center justify-between text-xs">
              <span className="bg-emerald-50 text-[#31A464] font-bold px-3 py-1 rounded-full border border-emerald-200">
                {product.category?.name || "Vegetables"}
              </span>
              <span className="flex items-center gap-1 text-stone-500 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#C77F1F]" />
                {product.location || "Nuwara Eliya, Sri Lanka"}
              </span>
            </div>

            {/* Produce Title */}
            <h1 className="text-3xl font-extrabold text-stone-900 font-heading">
              {product.name}
            </h1>

            {/* Price Breakdown */}
            <div className="bg-[#F5F5F4] p-4 rounded-2xl border border-stone-200 flex items-baseline justify-between">
              <div>
                <p className="text-xs text-stone-500 font-semibold">Direct Farm Unit Price</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl font-black text-[#C77F1F] font-heading">Rs. {product.price}</span>
                  <span className="text-sm font-bold text-stone-600">/{product.unit || "kg"}</span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-stone-500 font-semibold">Stock Status</p>
                {isAvailable ? (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md inline-block mt-1">
                    {product.quantity} {product.unit || "kg"} Available
                  </span>
                ) : (
                  <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-1 rounded-md inline-block mt-1">
                    Harvest Sold Out
                  </span>
                )}
              </div>
            </div>

            {/* Harvest Details */}
            <div className="flex items-center gap-4 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200">
              <div className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-[#31A464]" />
                <span>Harvest: {product.harvestDate || "Fresh Daily"}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#4C9AAD]" />
                <span>Freshness Guaranteed</span>
              </div>
            </div>

            {/* Produce Description */}
            <div>
              <h4 className="font-bold text-stone-900 text-sm font-heading mb-1">About This Produce</h4>
              <p className="text-stone-600 text-sm leading-relaxed">
                {product.description || "Fresh Sri Lankan produce cultivated with care in local soil. Direct farm supply with zero chemical preservatives."}
              </p>
            </div>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-stone-700">Quantity ({product.unit || "kg"}):</span>
              <div className="flex items-center border border-stone-300 rounded-xl bg-[#F5F5F4] p-1">
                <button
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-200 rounded-lg disabled:opacity-40"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-sm text-stone-900">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  disabled={quantity >= product.quantity}
                  className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-200 rounded-lg disabled:opacity-40"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!isAvailable}
                className="bg-[#31A464] hover:bg-[#24824e] disabled:bg-stone-300 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-xs transition-all text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Harvest to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!isAvailable}
                className="bg-[#C77F1F] hover:bg-[#b06f19] disabled:bg-stone-300 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all text-sm"
              >
                <span>Direct Checkout</span>
              </button>
            </div>

          </div>

          {/* Farmer Card Snippet */}
          <div className="bg-[#F5F5F4] p-4 rounded-2xl border border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#31A464] text-white rounded-full flex items-center justify-center font-bold text-sm">
                {product.farmer?.name ? product.farmer.name.charAt(0) : "F"}
              </div>
              <div>
                <p className="text-xs text-stone-500 font-semibold">Grown By Local Farmer</p>
                <p className="text-sm font-bold text-stone-900 flex items-center gap-1">
                  {product.farmer?.name || "Local Sri Lankan Farmer"}
                  <CheckCircle className="w-3.5 h-3.5 text-[#31A464]" />
                </p>
              </div>
            </div>

            <Link
              to={`/farmers/${farm?._id || farm?.id || product.farmer?._id}`}
              className="text-xs font-bold text-[#4C9AAD] hover:text-[#31A464] flex items-center gap-1"
            >
              <Tractor className="w-4 h-4" />
              <span>View Farm</span>
            </Link>
          </div>

        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-extrabold text-stone-900 font-heading">
            More Harvest From This Category
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel._id || rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
