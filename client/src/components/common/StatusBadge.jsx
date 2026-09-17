import React from "react";

export default function StatusBadge({ status }) {
  let badgeStyle = "bg-stone-100 text-stone-700 border-stone-300";

  switch (status) {
    case "Pending":
      badgeStyle = "bg-amber-50 text-amber-800 border-amber-300";
      break;
    case "Confirmed":
      badgeStyle = "bg-blue-50 text-blue-800 border-blue-300";
      break;
    case "Processing":
      badgeStyle = "bg-purple-50 text-purple-800 border-purple-300";
      break;
    case "Ready":
      badgeStyle = "bg-teal-50 text-teal-800 border-teal-300";
      break;
    case "Completed":
    case "Delivered":
      badgeStyle = "bg-emerald-50 text-emerald-800 border-emerald-300";
      break;
    case "Cancelled":
      badgeStyle = "bg-rose-50 text-rose-800 border-rose-300";
      break;
    default:
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeStyle}`}>
      {status}
    </span>
  );
}
