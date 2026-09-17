import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/marketplace/ProductCard";
import LoadingState from "../components/common/LoadingState";
import { MapPin, Phone, CheckCircle, Star, Tractor, Sprout, ArrowLeft } from "lucide-react";

export default function FarmerProfile() {
  const { id } = useParams();
  const [farm, setFarm] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmProfile = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/farms/${id}`);
        setFarm(res.data.farm);
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Failed to load farmer profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmProfile();
  }, [id]);

  if (loading) return <LoadingState message="Loading farmer profile..." />;
  if (!farm) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-900">Farm Profile Not Found</h2>
        <Link to="/farmers" className="inline-block bg-[#31A464] text-white px-6 py-2.5 rounded-full font-bold text-sm">
          Return to Farmers Directory
        </Link>
      </div>
    );
  }

  const farmer = farm.farmer || {};
  const avatarUrl = farmer.profileImage || farm.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      <Link to="/farmers" className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#31A464]">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Farmers Directory</span>
      </Link>

      {/* Farm Profile Header */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
        
        {/* Cover Photo */}
        <div className="h-56 bg-stone-800 relative">
          <img
            src={farm.image || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80"}
            alt={farm.farmName}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        </div>

        {/* Profile Card Overlay */}
        <div className="p-6 sm:p-8 relative -mt-16 sm:-mt-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white shrink-0">
                <img src={avatarUrl} alt={farmer.name} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1 text-stone-900 sm:text-white">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">{farm.farmName}</h1>
                  <CheckCircle className="w-5 h-5 text-[#31A464] fill-white" />
                </div>
                <p className="text-sm font-semibold text-stone-600 sm:text-stone-300">
                  Grown by: {farmer.name || "Local Farmer"}
                </p>
                <div className="flex items-center gap-3 text-xs text-stone-500 sm:text-stone-300">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C77F1F]" />
                    {farm.district || farm.location}, Sri Lanka
                  </span>
                  <span>•</span>
               
                </div>
              </div>
            </div>

            <div className="bg-[#F5F5F4] p-4 rounded-2xl border border-stone-200 text-xs space-y-1 sm:text-right w-full sm:w-auto">
              <p className="text-stone-500 font-semibold">Farm Size: <span className="text-stone-900 font-bold">{farm.farmSize || 2} Acres</span></p>
              <p className="text-stone-500 font-semibold">Farm Type: <span className="text-emerald-700 font-bold">{farm.farmType || "Organic Produce"}</span></p>
              {farm.contactNumber && (
                <p className="text-stone-500 font-semibold flex items-center gap-1 sm:justify-end">
                  <Phone className="w-3.5 h-3.5 text-[#31A464]" />
                  <span>{farm.contactNumber}</span>
                </p>
              )}
            </div>

          </div>

          {/* Farm Description */}
          {farm.description && (
            <div className="mt-6 pt-6 border-t border-stone-100">
              <h3 className="text-sm font-bold text-stone-900 font-heading mb-1">About Our Farm & Methods</h3>
              <p className="text-stone-600 text-sm leading-relaxed max-w-3xl">
                {farm.description}
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Available Produce Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-bold text-[#31A464] uppercase tracking-wider">DIRECT FROM FIELD</span>
            <h2 className="text-2xl font-extrabold text-stone-900 font-heading">
              Produce Harvested by {farmer.name || "Farmer"}
            </h2>
          </div>
          <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
            {products.length} Items Listed
          </span>
        </div>

        {products.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-2xl border border-stone-200">
            <Sprout className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-stone-600 text-sm font-semibold">No active produce listed by this farmer currently.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
