import React from "react";
import { Link } from "react-router-dom";
import { Sprout, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 text-center">
      <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 max-w-md mx-auto space-y-4 shadow-sm">
        <div className="w-16 h-16 bg-emerald-100 text-[#31A464] rounded-full flex items-center justify-center mx-auto shadow-xs border-2 border-emerald-300">
          <Sprout className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold font-heading text-stone-900">404</h1>
        <h2 className="text-lg font-bold text-stone-800">Harvest Page Not Found</h2>
        <p className="text-stone-500 text-xs leading-relaxed">
          The requested page path does not exist on FarmCartLK digital marketplace.
        </p>
        <Link
          to="/"
          className="bg-[#31A464] hover:bg-[#24824e] text-white font-bold text-xs px-6 py-3 rounded-full inline-flex items-center gap-2 transition-all shadow-xs"
        >
          <Home className="w-4 h-4" />
          <span>Return to Marketplace Home</span>
        </Link>
      </div>
    </div>
  );
}
