import React, { useEffect, useState } from "react";
import api from "../services/api";
import FarmerCard from "../components/marketplace/FarmerCard";
import LoadingState from "../components/common/LoadingState";
import { Tractor, MapPin } from "lucide-react";

export default function FarmerDirectory() {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const res = await api.get("/farms");
        setFarms(res.data.farms || []);
      } catch (err) {
        console.error("Failed to load farmer directory:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFarms();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="bg-[#001D0D] text-white rounded-3xl p-8 border-b-4 border-[#31A464] relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="text-xs font-bold text-[#C77F1F] uppercase tracking-wider bg-[#C77F1F]/20 px-3 py-1 rounded-full border border-[#C77F1F]/30">
            LOCAL SRI LANKAN FARMERS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading">
            Verified Farmer Directory
          </h1>
          <p className="text-stone-300 text-sm leading-relaxed">
            Connect directly with verified farmers.
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading verified Sri Lankan farmers..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map((farm) => (
            <FarmerCard key={farm._id || farm.id} farm={farm} />
          ))}
        </div>
      )}

    </div>
  );
}
