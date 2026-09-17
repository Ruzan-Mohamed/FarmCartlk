import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/marketplace/ProductCard";
import CategoryCard from "../components/marketplace/CategoryCard";
import FarmerCard from "../components/marketplace/FarmerCard";
import LoadingState from "../components/common/LoadingState";
import { 
  Sprout, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  MapPin, 
  ShoppingBag, 
  Users, 
  CheckCircle2, 
  Sparkles,
  Tractor
} from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [prodRes, catRes, farmRes] = await Promise.all([
          api.get("/products?limit=8"),
          api.get("/categories"),
          api.get("/farms")
        ]);

        setProducts(prodRes.data.products || []);
        setCategories(catRes.data.categories || []);
        setFarms(farmRes.data.farms || []);
      } catch (err) {
        console.error("Failed to load homepage data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative bg-[#001D0D] text-white pt-16 pb-24 px-4 overflow-hidden border-b-4 border-[#31A464]">
        {/* Subtle Background Farm Lines Pattern */}
        <div className="absolute inset-0 bg-farm-pattern opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#31A464]/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Sri Lankan Agricultural Badge */}
            <div className="inline-flex items-center gap-2 bg-[#31A464]/20 border border-[#31A464]/40 text-[#31A464] text-xs font-bold px-3 py-1.5 rounded-full">
              <Sprout className="w-4 h-4 text-[#C77F1F]" />
              <span>Sri Lanka's Direct Farm Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-tight">
              Fresh From <span className="text-[#31A464]">Sri Lankan Farms</span> Straight to Your Cart.
            </h1>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Discover fresh vegetables, fruits, indigenous rice, and spices directly cultivated by local farmers. No middlemen, 100% transparent prices.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/products"
                className="w-full sm:w-auto bg-[#31A464] hover:bg-[#24824e] text-white font-bold text-base px-8 py-3.5 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>Shop Fresh Produce</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/register?role=farmer"
                className="w-full sm:w-auto bg-stone-900/80 hover:bg-stone-800 border border-stone-700 text-stone-200 font-bold text-base px-8 py-3.5 rounded-full transition-all flex items-center justify-center gap-2"
              >
                <Tractor className="w-5 h-5 text-[#C77F1F]" />
                <span>Sell Your Harvest</span>
              </Link>
            </div>

            {/* Platform Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-800/80 max-w-md mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-2xl font-black text-white font-heading">100%</p>
                <p className="text-xs text-stone-400 font-medium">Direct Selling</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#C77F1F] font-heading">Rs. LKR</p>
                <p className="text-xs text-stone-400 font-medium">Fair Farm Price</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#31A464] font-heading">24h</p>
                <p className="text-xs text-stone-400 font-medium">Fresh Harvest</p>
              </div>
            </div>

          </div>

          {/* Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-stone-800 shadow-2xl bg-stone-900">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
                alt="Sri Lankan Farmer Market"
                className="w-full h-[400px] object-cover"
              />
              
              {/* Overlay Farm Badge */}
            
            </div>
          </div>

        </div>
      </section>

      {/* FARM-TO-CART JOURNEY VISUAL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs text-center space-y-8">
          
          <div>
            <span className="text-xs font-bold text-[#31A464] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              TRANSPARENT AGRICULTURAL PROCESS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-heading mt-2">
              The Farm-to-Cart Journey
            </h2>
            <p className="text-stone-500 text-sm max-w-xl mx-auto mt-1">
              How FarmCartLK connects Sri Lankan field produce directly to your household dining table.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center relative">
            
            {/* Step 1 */}
            <div className="bg-[#F5F5F4] p-5 rounded-2xl border border-stone-200 space-y-2 text-center">
              <div className="w-12 h-12 bg-[#31A464] text-white rounded-2xl flex items-center justify-center mx-auto shadow-xs font-bold text-lg">
                1
              </div>
              <h4 className="font-bold text-stone-900 text-sm">Grown by Farmers</h4>
              <p className="text-xs text-stone-500">Cultivated in Sri Lankan soil with passion</p>
            </div>

            <div className="hidden md:block text-stone-300 font-bold">→</div>

            {/* Step 2 */}
            <div className="bg-[#F5F5F4] p-5 rounded-2xl border border-stone-200 space-y-2 text-center">
              <div className="w-12 h-12 bg-[#4C9AAD] text-white rounded-2xl flex items-center justify-center mx-auto shadow-xs font-bold text-lg">
                2
              </div>
              <h4 className="font-bold text-stone-900 text-sm">Listed on FarmCart</h4>
              <p className="text-xs text-stone-500">Fair transparent unit prices in LKR</p>
            </div>

            <div className="hidden md:block text-stone-300 font-bold">→</div>

            {/* Step 3 */}
            <div className="bg-[#F5F5F4] p-5 rounded-2xl border border-stone-200 space-y-2 text-center">
              <div className="w-12 h-12 bg-[#C77F1F] text-white rounded-2xl flex items-center justify-center mx-auto shadow-xs font-bold text-lg">
                3
              </div>
              <h4 className="font-bold text-stone-900 text-sm">Delivered to Cart</h4>
              <p className="text-xs text-stone-500">Fresh harvest shipped straight to buyers</p>
            </div>

          </div>

        </div>
      </section>

      {/* FEATURED HARVEST PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-bold text-[#C77F1F] uppercase tracking-wider">FRESH DAILY SELECTION</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-heading">
              Featured Harvest Produce
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-bold text-[#31A464] hover:text-[#24824e] flex items-center gap-1"
          >
            <span>View All Produce</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <LoadingState message="Fetching fresh Sri Lankan produce..." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}

      </section>

      {/* SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs font-bold text-[#31A464] uppercase tracking-wider">CURATED PRODUCE</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-heading">
            Shop By Agricultural Category
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category._id || category.id} category={category} />
          ))}
        </div>
      </section>

      {/* FEATURED FARMERS DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-bold text-[#4C9AAD] uppercase tracking-wider">MEET THE GROWERS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-heading">
              Verified Sri Lankan Farmers
            </h2>
          </div>
          <Link
            to="/farmers"
            className="text-sm font-bold text-[#31A464] hover:text-[#24824e] flex items-center gap-1"
          >
            <span>View All Farmers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {farms.slice(0, 3).map((farm) => (
            <FarmerCard key={farm._id || farm.id} farm={farm} />
          ))}
        </div>
      </section>

      {/* WHY FARMCART BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#001D0D] text-white rounded-3xl p-8 sm:p-12 border-4 border-[#31A464] grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#31A464] rounded-2xl flex items-center justify-center shrink-0 text-white font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base font-heading">100% Direct Selling</h4>
              <p className="text-xs text-stone-400 leading-relaxed mt-1">
                Zero intermediaries taking hefty commissions. Farmers receive full value for their hard labor.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#C77F1F] rounded-2xl flex items-center justify-center shrink-0 text-white font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base font-heading">Guaranteed Freshness</h4>
              <p className="text-xs text-stone-400 leading-relaxed mt-1">
                Produce is harvested right before shipment directly from mountain and lowland Sri Lankan fields.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#4C9AAD] rounded-2xl flex items-center justify-center shrink-0 text-white font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base font-heading">Community Trust</h4>
              <p className="text-xs text-stone-400 leading-relaxed mt-1">
                Transparent farmer profiles, ratings, and location markers to know exactly who grew your food.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
