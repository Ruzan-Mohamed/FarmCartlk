import React from "react";
import { Sprout, ShieldCheck, Tractor, Users, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Banner */}
      <div className="bg-[#001D0D] text-white rounded-3xl p-8 sm:p-12 border-b-4 border-[#31A464] text-center space-y-4">
        <span className="text-xs font-bold text-[#31A464] uppercase tracking-wider bg-[#31A464]/20 px-3.5 py-1 rounded-full border border-[#31A464]/30">
          OUR MISSION & VISION
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading">
          Empowering Sri Lankan Farmers
        </h1>
        <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          FarmCartLK is a digital marketplace bridging the gap between hard-working Sri Lankan agricultural producers and conscious buyers.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold text-[#C77F1F] uppercase tracking-wider">WHY WE BUILT FARMCART</span>
          <h2 className="text-2xl font-extrabold text-stone-900 font-heading">
            Direct Farm Selling Without Intermediary Exploitation
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            For decades, Sri Lankan farmers in Nuwara Eliya, Dambulla, and Jaffna faced low profit margins due to multiple middlemen taking commissions. FarmCartLK gives farmers full control over their pricing, inventory, and brand identity.
          </p>
          <div className="space-y-2 pt-2 text-sm font-semibold text-stone-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#31A464]" />
              <span>100% Direct Farmer Pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <Tractor className="w-4 h-4 text-[#31A464]" />
              <span>Supporting Local Agriculture & Rural Economies</span>
            </div>
            <div className="flex items-center gap-2">
              <Sprout className="w-4 h-4 text-[#31A464]" />
              <span>Guaranteed Harvest Freshness for Buyers</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-md">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEDUW-xeFj3GohKJ3ISUmDFex_2ezLcj3kOxr7az9Qmw&s=10"
            alt="Sri Lankan Farming Community"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

    </div>
  );
}
