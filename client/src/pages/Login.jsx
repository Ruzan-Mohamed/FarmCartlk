import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Sprout, Lock, Mail, ArrowRight, Tractor, ShieldAlert } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loggedUser = await loginUser(email, password);
      toast.success(`Welcome back, ${loggedUser.name}!`);

      if (loggedUser.role === "farmer") {
        navigate("/farmer/dashboard");
      } else if (loggedUser.role === "admin" || loggedUser.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/products");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword("password123");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-stone-200 p-8 shadow-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#31A464] text-white rounded-2xl flex items-center justify-center mx-auto shadow-xs">
            <Tractor className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900 font-heading">
            Welcome to FarmCart<span className="text-[#C77F1F]">LK</span>
          </h2>
          <p className="text-xs text-stone-500">Sign in to your direct agricultural marketplace account</p>
        </div>

        {/* Demo Quick Accounts */}
        <div className="bg-[#F5F5F4] p-3 rounded-2xl border border-stone-200 space-y-2">
          <p className="text-[11px] font-bold text-stone-600 uppercase text-center">Quick Demo Login</p>
          <div className="grid grid-cols-3 gap-1.5 text-[11px]">
            <button
              type="button"
              onClick={() => handleQuickLogin("buyer@farmcart.lk")}
              className="bg-white hover:bg-emerald-50 text-stone-800 p-1.5 rounded-lg border border-stone-200 font-medium"
            >
              Buyer
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("farmer@farmcart.lk")}
              className="bg-white hover:bg-emerald-50 text-stone-800 p-1.5 rounded-lg border border-stone-200 font-medium"
            >
              Farmer
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("admin@farmcart.lk")}
              className="bg-white hover:bg-amber-50 text-stone-800 p-1.5 rounded-lg border border-stone-200 font-medium"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="buyer@farmcart.lk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F5F5F4] text-sm text-stone-800 rounded-xl pl-9 pr-3.5 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464]"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F5F5F4] text-sm text-stone-800 rounded-xl pl-9 pr-3.5 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464]"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#31A464] hover:bg-[#24824e] disabled:bg-stone-300 text-white font-bold py-3 rounded-full shadow-xs transition-all flex items-center justify-center gap-2 text-sm"
          >
            {loading ? (
              <span>Signing In...</span>
            ) : (
              <>
                <span>Sign In to Market</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100">
          <span>Don't have an account yet? </span>
          <Link to="/register" className="font-bold text-[#31A464] hover:underline">
            Register Here
          </Link>
        </div>

      </div>
    </div>
  );
}
