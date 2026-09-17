import React from "react";
import { Link } from "react-router-dom";
import { Sprout } from "lucide-react";

export default function CategoryCard({ category }) {
  const imageUrl = category.image || "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80";

  return (
    <Link
      to={`/products?category=${category._id || category.id}`}
      className="group relative rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-300 bg-white flex flex-col h-44"
    >
      <img
        src={imageUrl}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80";
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#001D0D]/90 via-[#001D0D]/40 to-transparent p-4 flex flex-col justify-end">
        <div className="flex items-center gap-1.5 text-[#31A464] text-xs font-bold uppercase tracking-wider mb-0.5">
          <Sprout className="w-3.5 h-3.5" />
          <span>Category</span>
        </div>
        <h3 className="text-white font-extrabold text-lg group-hover:text-[#31A464] transition-colors line-clamp-1">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-stone-300 text-xs line-clamp-1 font-normal opacity-90">
            {category.description}
          </p>
        )}
      </div>
    </Link>
  );
}
