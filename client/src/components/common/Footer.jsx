import React from "react";
import { Link } from "react-router-dom";
import { Sprout, MapPin, Phone, Mail, Heart, Tractor } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#001D0D] text-stone-300 pt-16 pb-8 border-t-4 border-[#31A464]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#31A464] rounded-xl flex items-center justify-center text-white">
                <Tractor className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl text-white font-heading tracking-tight">FarmCart<span className="text-[#C77F1F]">LK</span></span>
            </div>
            
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Sri Lanka's direct farm-to-buyer digital marketplace connecting hard-working local farmers with conscious buyers for fresh, transparent, and fair produce.
            </p>

            <div className="flex items-center gap-2 text-xs bg-stone-900/80 p-3 rounded-xl border border-stone-800 text-[#31A464] font-medium max-w-xs">
              <Sprout className="w-4 h-4 shrink-0 text-[#C77F1F]" />
              <span>Farm → Farmer → Produce → Buyer → Cart</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-heading">Explore Market</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><Link to="/products" className="hover:text-[#31A464] transition-colors">Fresh Harvest Marketplace</Link></li>
              <li><Link to="/categories" className="hover:text-[#31A464] transition-colors">Produce Categories</Link></li>
              <li><Link to="/farmers" className="hover:text-[#31A464] transition-colors">Verified Local Farmers</Link></li>
              <li><Link to="/about" className="hover:text-[#31A464] transition-colors">Our Story & Mission</Link></li>
            </ul>
          </div>

          {/* User Roles */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-heading">User Journeys</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><Link to="/register" className="hover:text-[#31A464] transition-colors">Sell Produce as Farmer</Link></li>
              <li><Link to="/register" className="hover:text-[#31A464] transition-colors">Buy Direct as Consumer</Link></li>
              <li><Link to="/login" className="hover:text-[#31A464] transition-colors">Farmer Control Center</Link></li>
              <li><Link to="/admin" className="hover:text-[#31A464] transition-colors">Platform Administration</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-heading">Sri Lanka Hub</h4>
            <div className="space-y-2 text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#31A464] shrink-0 mt-0.5" />
                <span>Anuradhapura, Mihinthale</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#31A464] shrink-0" />
                <span>+94 773796481</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#31A464] shrink-0" />
                <span>support@farmcart.lk</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} FarmCartLK. Built for Sri Lankan Farmers & Buyers.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Cultivated with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>in Sri Lanka</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
