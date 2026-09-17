import React from "react";
import { Sprout } from "lucide-react";

export default function LoadingState({ message = "Loading fresh Sri Lankan produce..." }) {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center">
      <div className="relative w-14 h-14 flex items-center justify-center mb-3">
        <div className="absolute inset-0 border-4 border-[#31A464]/20 border-t-[#31A464] rounded-full animate-spin"></div>
        <Sprout className="w-6 h-6 text-[#31A464]" />
      </div>
      <p className="text-sm font-semibold text-stone-600 animate-pulse">{message}</p>
    </div>
  );
}
