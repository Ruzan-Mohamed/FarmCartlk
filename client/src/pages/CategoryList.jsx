import React, { useEffect, useState } from "react";
import api from "../services/api";
import CategoryCard from "../components/marketplace/CategoryCard";
import LoadingState from "../components/common/LoadingState";
import { Sprout } from "lucide-react";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="bg-[#001D0D] text-white rounded-3xl p-8 border-b-4 border-[#31A464]">
        <div className="max-w-xl space-y-2">
          <span className="text-xs font-bold text-[#31A464] uppercase tracking-wider bg-[#31A464]/20 px-3 py-1 rounded-full">
            AGRICULTURAL CLASSIFICATION
          </span>
          <h1 className="text-3xl font-extrabold font-heading">Produce Categories</h1>
          <p className="text-stone-300 text-sm">
            Explore Sri Lankan agricultural products grouped by crop variety and farming method.
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading agricultural categories..." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category._id || category.id} category={category} />
          ))}
        </div>
      )}

    </div>
  );
}
