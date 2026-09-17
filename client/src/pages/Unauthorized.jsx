import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, Home } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 text-center">
      <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 max-w-md mx-auto space-y-4 shadow-sm">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-xs border-2 border-rose-300">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold font-heading text-stone-900">403</h1>
        <h2 className="text-lg font-bold text-stone-800">Access Restricted</h2>
        <p className="text-stone-500 text-xs leading-relaxed">
          You do not have permission to access this section of FarmCartLK. Please log in with the correct account role.
        </p>
        <Link
          to="/"
          className="bg-[#31A464] hover:bg-[#24824e] text-white font-bold text-xs px-6 py-3 rounded-full inline-flex items-center gap-2 transition-all shadow-xs"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
