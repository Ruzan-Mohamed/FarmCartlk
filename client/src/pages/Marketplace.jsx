import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/marketplace/ProductCard";
import LoadingState from "../components/common/LoadingState";
import EmptyState from "../components/common/EmptyState";
import { Search, Filter, Sparkles, RefreshCw, SlidersHorizontal } from "lucide-react";

export default function Marketplace() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.set("search", search);
        if (selectedCategory) queryParams.set("category", selectedCategory);
        if (minPrice) queryParams.set("minPrice", minPrice);
        if (maxPrice) queryParams.set("maxPrice", maxPrice);
        if (organicOnly) queryParams.set("organic", "true");
        if (sort) queryParams.set("sort", sort);

        const res = await api.get(`/products?${queryParams.toString()}`);
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, selectedCategory, minPrice, maxPrice, organicOnly, sort]);

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setOrganicOnly(false);
    setSort("newest");
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#001D0D] text-white rounded-3xl p-8 border-b-4 border-[#31A464] relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-bold text-[#31A464] uppercase tracking-wider bg-[#31A464]/20 px-3 py-1 rounded-full border border-[#31A464]/30">
            SRI LANKAN AGRICULTURAL MARKETPLACE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading">
            Fresh Produce Market
          </h1>
          <p className="text-stone-300 text-sm leading-relaxed">
            Directly browse and purchase harvest.
          </p>
        </div>
      </div>

      {/* Filter & Control Bar */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-4 relative">
            <input
              type="text"
              placeholder="Search produce name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#F5F5F4] text-sm text-stone-800 placeholder-stone-400 rounded-xl pl-3.5 pr-9 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464]"
            />
            <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#F5F5F4] text-sm text-stone-800 rounded-xl px-3.5 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464]"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id || cat.id} value={cat._id || cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full bg-[#F5F5F4] text-sm text-stone-800 rounded-xl px-3.5 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464]"
            >
              <option value="newest">Sort: Latest Harvest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Produce Name</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="md:col-span-2 text-right">
            <button
              onClick={handleResetFilters}
              className="w-full bg-[#F5F5F4] hover:bg-stone-200 text-stone-700 text-xs font-bold px-3 py-2.5 rounded-xl border border-stone-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

        </div>

        {/* Secondary Filter Row: Price Range & Organic Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-stone-100 text-xs">
          
          <div className="flex items-center gap-3">
            <span className="font-bold text-stone-600 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Price (Rs.):
            </span>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-20 bg-[#F5F5F4] rounded-lg px-2.5 py-1.5 border border-stone-200"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-20 bg-[#F5F5F4] rounded-lg px-2.5 py-1.5 border border-stone-200"
            />
          </div>

        

        </div>

      </div>

      {/* Product Results Grid */}
      {loading ? (
        <LoadingState message="Filtering fresh harvest produce..." />
      ) : products.length === 0 ? (
        <EmptyState
          title="No produce found"
          message="No agricultural produce matches your search filters. Try adjusting your category or price range."
          actionText="Reset Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {products.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
