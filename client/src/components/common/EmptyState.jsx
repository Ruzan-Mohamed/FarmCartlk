import React from "react";
import { Sprout } from "lucide-react";

export default function EmptyState({ title = "No items found", message = "There is no harvest available for this selection right now.", actionText, onAction }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto my-8 shadow-2xs">
      <div className="w-16 h-16 bg-emerald-50 text-[#31A464] rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
        <Sprout className="w-8 h-8" />
      </div>
      <h3 className="text-stone-900 font-extrabold text-lg mb-1 font-heading">{title}</h3>
      <p className="text-stone-500 text-sm mb-6 leading-relaxed">{message}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="bg-[#31A464] hover:bg-[#24824e] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all shadow-xs"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
