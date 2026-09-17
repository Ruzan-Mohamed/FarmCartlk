import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Sprout, Lock, Mail, User, Phone, MapPin, Tractor, ArrowRight } from "lucide-react";

export default function Register() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") === "farmer" ? "farmer" : "buyer";

  const [role, setRole] = useState(initialRole);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  
  // Farmer specific fields
  const [farmName, setFarmName] = useState("");
  const [location, setLocation] = useState("Nuwara Eliya");
  const [district, setDistrict] = useState("Nuwara Eliya");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);

  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const registerData = {
        name,
        email,
        password,
        role,
        phone,
        farmName: role === "farmer" ? farmName : undefined,
        location: role === "farmer" ? location : undefined,
        district: role === "farmer" ? district : undefined,
        address: role === "farmer" ? address : undefined
      };

      await registerUser(registerData);
      toast.success(`Account registered successfully as ${role.toUpperCase()}!`);

      if (role === "farmer") {
        navigate("/farmer/dashboard");
      } else {
        navigate("/products");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-stone-200 p-8 shadow-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#31A464] text-white rounded-2xl flex items-center justify-center mx-auto shadow-xs">
            <Sprout className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900 font-heading">
            Join FarmCart<span className="text-[#C77F1F]">LK</span>
          </h2>
          <p className="text-xs text-stone-500">Create a direct farm-to-buyer marketplace account</p>
        </div>

        {/* Role Toggle Selector */}
        <div className="grid grid-cols-2 gap-2 bg-[#F5F5F4] p-1.5 rounded-2xl border border-stone-200">
          <button
            type="button"
            onClick={() => setRole("buyer")}
            className={`py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              role === "buyer"
                ? "bg-[#31A464] text-white shadow-xs"
                : "text-stone-600 hover:bg-stone-200"
            }`}
          >
            <User className="w-4 h-4" />
            <span>I am a Produce Buyer</span>
          </button>

          <button
            type="button"
            onClick={() => setRole("farmer")}
            className={`py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              role === "farmer"
                ? "bg-[#31A464] text-white shadow-xs"
                : "text-stone-600 hover:bg-stone-200"
            }`}
          >
            <Tractor className="w-4 h-4" />
            <span>I am a Farmer / Seller</span>
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Bandara Jayasundara"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F5F5F4] text-sm text-stone-800 rounded-xl pl-9 pr-3.5 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464]"
                />
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Phone Number</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="0771234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#F5F5F4] text-sm text-stone-800 rounded-xl pl-9 pr-3.5 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464]"
                />
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F5F5F4] text-sm text-stone-800 rounded-xl pl-9 pr-3.5 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464]"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Password (min 8 chars)</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F5F5F4] text-sm text-stone-800 rounded-xl pl-9 pr-3.5 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464]"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Farmer Farm Profile Setup Section */}
          {role === "farmer" && (
            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
              <h4 className="text-xs font-bold text-[#31A464] uppercase tracking-wider flex items-center gap-1.5">
                <Tractor className="w-4 h-4" /> Farm Profile Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Farm Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Green Valley Farm"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="w-full bg-white text-xs rounded-xl px-3 py-2 border border-emerald-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">District / Region</label>
                  <select
                    value={district}
                    onChange={(e) => {
                      setDistrict(e.target.value);
                      setLocation(e.target.value);
                    }}
                    className="w-full bg-white text-xs rounded-xl px-3 py-2 border border-emerald-200"
                  >
                    <option value="Nuwara Eliya">Nuwara Eliya</option>
                    <option value="Dambulla">Dambulla / Matale</option>
                    <option value="Badulla">Badulla / Bandarawela</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Jaffna">Jaffna</option>
                    <option value="Polonnaruwa">Polonnaruwa</option>
                    <option value="Anuradhapura">Anuradhapura</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Farm Address</label>
                <input
                  type="text"
                  required
                  placeholder="Hakgala Farm Road, Nuwara Eliya"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white text-xs rounded-xl px-3 py-2 border border-emerald-200"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#31A464] hover:bg-[#24824e] disabled:bg-stone-300 text-white font-bold py-3 rounded-full shadow-xs transition-all flex items-center justify-center gap-2 text-sm"
          >
            {loading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100">
          <span>Already registered on FarmCartLK? </span>
          <Link to="/login" className="font-bold text-[#31A464] hover:underline">
            Log In
          </Link>
        </div>

      </div>
    </div>
  );
}
