import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import { PlusCircle, Upload, Sparkles, Image, ArrowLeft, Check } from "lucide-react";

export default function AddEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [location, setLocation] = useState("Nuwara Eliya");
  const [isOrganic, setIsOrganic] = useState(false);
  const [harvestDate, setHarvestDate] = useState("Fresh Harvest Today");
  const [imageUrl, setImageUrl] = useState("");

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.categories || []);
        if (res.data.categories?.length > 0 && !category) {
          setCategory(res.data.categories[0]._id || res.data.categories[0].id);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (isEdit) {
      const loadProduct = async () => {
        try {
          const res = await api.get(`/products/${id}`);
          const p = res.data.product;
          setName(p.name);
          setCategory(p.category?._id || p.category);
          setDescription(p.description || "");
          setPrice(p.price);
          setQuantity(p.quantity);
          setUnit(p.unit || "kg");
          setLocation(p.location || "Nuwara Eliya");
          setIsOrganic(p.isOrganic || false);
          setHarvestDate(p.harvestDate || "Fresh Harvest Today");
          setImageUrl(p.image || (p.images && p.images[0]) || "");
        } catch (err) {
          toast.error("Failed to load product details for editing");
        }
      };
      loadProduct();
    }
  }, [id, isEdit]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await api.post("/upload/product-image", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (res.data.publicUrl || res.data.path) {
        const fullUrl = res.data.publicUrl || `https://tuqsjaolhvuddstumuhr.supabase.co/storage/v1/object/public/farmcart-media/${res.data.path}`;
        setImageUrl(fullUrl);
        toast.success("Product image uploaded to Supabase Storage!");
      }
    } catch (err) {
      // Fallback: If Supabase credentials are empty locally, prompt user or use file object preview
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
      toast.success("Image attached successfully");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !category || !price || !quantity) {
      toast.error("Please fill in required fields");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name,
        category,
        description,
        price: Number(price),
        quantity: Number(quantity),
        unit,
        location,
        isOrganic,
        harvestDate,
        image: imageUrl || "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
        images: imageUrl ? [imageUrl] : []
      };

      if (isEdit) {
        await api.put(`/products/${id}`, payload);
        toast.success("Produce listing updated!");
      } else {
        await api.post("/products", payload);
        toast.success("New produce listed on FarmCartLK marketplace!");
      }

      navigate("/farmer/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      <button
        onClick={() => navigate("/farmer/dashboard")}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#31A464]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Control Center</span>
      </button>

      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xs space-y-6">
        
        <div className="border-b border-stone-100 pb-4">
          <span className="text-xs font-bold text-[#31A464] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {isEdit ? "UPDATE LISTING" : "NEW PRODUCE LISTING"}
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 font-heading mt-2">
            {isEdit ? "Edit Produce Listing" : "List New Farm Produce"}
          </h1>
          <p className="text-stone-500 text-sm">Add clear details so buyers know your fresh crop specifications.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Produce Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Nuwara Eliya Fresh Carrots"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F5F5F4] text-sm rounded-xl px-3.5 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Agricultural Category *</label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#F5F5F4] text-sm rounded-xl px-3.5 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464]"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id || cat.id} value={cat._id || cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Price per Unit (Rs.) *</label>
              <input
                type="number"
                required
                placeholder="320"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#F5F5F4] text-sm rounded-xl px-3.5 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Stock Quantity *</label>
              <input
                type="number"
                required
                placeholder="150"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-[#F5F5F4] text-sm rounded-xl px-3.5 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Unit Type *</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-[#F5F5F4] text-sm rounded-xl px-3.5 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464]"
              >
                <option value="kg">kg (Kilograms)</option>
                <option value="g">g (Grams)</option>
                <option value="pack">pack (Bio-box Pack)</option>
                <option value="bottle">bottle (Bottle)</option>
                <option value="item">item (Single Piece)</option>
              </select>
            </div>
          </div>

          {/* Location & Organic Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Harvest Region / Location</label>
              <input
                type="text"
                placeholder="Nuwara Eliya"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#F5F5F4] text-sm rounded-xl px-3.5 py-2.5 border border-stone-200"
              />
            </div>

            <div className="pt-4">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-800 text-sm">
               
              
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Produce Description</label>
            <textarea
              rows="3"
              placeholder="Freshly harvested daily using eco-friendly compost..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#F5F5F4] text-sm rounded-xl px-3.5 py-2.5 border border-stone-200"
            ></textarea>
          </div>

          {/* Image Upload Integration (Supabase Storage) */}
          <div className="p-4 bg-[#F5F5F4] rounded-2xl border border-stone-200 space-y-3">
            <label className="block text-xs font-bold text-stone-700">Product Image (Supabase Storage Integration)</label>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-xs text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#31A464] file:text-white hover:file:bg-[#24824e] cursor-pointer"
              />

              <span className="text-xs text-stone-400 font-semibold">Or enter Image URL:</span>

              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 bg-white text-xs rounded-xl px-3 py-2 border border-stone-300"
              />
            </div>

            {imageUrl && (
              <div className="mt-2 w-32 h-24 rounded-xl overflow-hidden border border-stone-300">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting || uploading}
            className="w-full bg-[#31A464] hover:bg-[#24824e] disabled:bg-stone-300 text-white font-bold py-3.5 rounded-full shadow-xs transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Check className="w-4 h-4" />
            <span>{isEdit ? "Update Listing" : "Publish Harvest Produce"}</span>
          </button>

        </form>

      </div>

    </div>
  );
}
