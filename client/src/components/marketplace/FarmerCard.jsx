import React from "react";
import { Link } from "react-router-dom";
import { MapPin, CheckCircle, Star, Tractor } from "lucide-react";

export default function FarmerCard({ farm }) {
  const farmerName = farm.farmer?.name || "Sri Lankan Farmer";
  const avatarUrl = farm.farmer?.profileImage || farm.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80";

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 hover:border-[#31A464] hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
      
      {/* Header Info */}
      <div className="flex items-start gap-3.5">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#31A464] shrink-0 bg-stone-100">
          <img src={avatarUrl} alt={farmerName} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <h4 className="font-bold text-stone-900 text-base truncate">{farmerName}</h4>
            <CheckCircle className="w-4 h-4 text-[#31A464] shrink-0" title="Verified Sri Lankan Farmer" />
          </div>

          <p className="text-xs text-[#4C9AAD] font-semibold truncate mt-0.5">{farm.farmName}</p>

          <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C77F1F]" />
              <span>{farm.district || farm.location || "Nuwara Eliya"}</span>
            </div>
            <span>•</span>
            
          </div>
        </div>
      </div>

      {/* Description Snippet */}
      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed bg-[#F5F5F4] p-2.5 rounded-xl border border-stone-200/60">
        "{farm.description || `Fresh produce harvested with passion from ${farm.location}. Direct farm selling with transparent pricing.`}"
      </p>

      {/* Footer Tag & CTA */}
      <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
          {farm.farmType || "Vegetables & Fruits"}
        </span>

        <Link
          to={`/farmers/${farm._id || farm.id}`}
          className="text-xs font-bold text-[#31A464] hover:text-[#24824e] flex items-center gap-1"
        >
          <Tractor className="w-3.5 h-3.5" />
          <span>Visit Farm</span>
        </Link>
      </div>

    </div>
  );
}
