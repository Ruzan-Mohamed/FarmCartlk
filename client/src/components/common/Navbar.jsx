import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { 
  ShoppingBag, 
  Search, 
  User, 
  LogOut, 
  Sprout, 
  LayoutDashboard, 
  Menu, 
  X,
  ChevronDown,
  ShieldAlert,
  Tractor
} from "lucide-react";

export default function Navbar() {
  const { user, isAuthenticated, logout, isBuyer, isFarmer, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-xs">
      {/* Top Banner Notice */}
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 bg-[#31A464] rounded-xl flex items-center justify-center text-white shadow-md group-hover:bg-[#24824e] transition-colors">
              <Tractor className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-2xl tracking-tight text-[#001D0D] font-heading">FarmCart</span>
                <span className="bg-[#C77F1F] text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-widest">LK</span>
              </div>
              <p className="text-[10px] text-stone-500 font-medium tracking-wide">Direct From Harvest</p>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F5F4] text-stone-800 placeholder-stone-400 text-sm rounded-full pl-4 pr-10 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464] focus:ring-2 focus:ring-[#31A464]/20 transition-all"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#31A464] text-white rounded-full flex items-center justify-center hover:bg-[#24824e] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
            <NavLink to="/" className={({ isActive }) => `hover:text-[#31A464] transition-colors ${isActive ? "text-[#31A464] font-semibold" : ""}`}>
              Home
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => `hover:text-[#31A464] transition-colors ${isActive ? "text-[#31A464] font-semibold" : ""}`}>
              Marketplace
            </NavLink>
            <NavLink to="/categories" className={({ isActive }) => `hover:text-[#31A464] transition-colors ${isActive ? "text-[#31A464] font-semibold" : ""}`}>
              Categories
            </NavLink>
            <NavLink to="/farmers" className={({ isActive }) => `hover:text-[#31A464] transition-colors ${isActive ? "text-[#31A464] font-semibold" : ""}`}>
              Farmers
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `hover:text-[#31A464] transition-colors ${isActive ? "text-[#31A464] font-semibold" : ""}`}>
              About Us
            </NavLink>
          </nav>

          {/* Right Actions: Cart & User Account */}
          <div className="flex items-center gap-3">
            
            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2.5 text-stone-700 hover:text-[#31A464] bg-[#F5F5F4] hover:bg-emerald-50 rounded-full transition-all flex items-center justify-center border border-stone-200"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-stone-800" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#C77F1F] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-xs animate-bounce">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth Button or User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-[#F5F5F4] hover:bg-stone-200 text-stone-800 px-3 py-2 rounded-full border border-stone-200 transition-all text-sm font-medium"
                >
                  <div className="w-7 h-7 bg-[#31A464] text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate">{user?.name}</span>
                  <ChevronDown className="w-4 h-4 text-stone-500" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    onClick={() => setUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <div className="px-4 py-2.5 border-b border-stone-100 bg-[#F5F5F4]/50">
                      <p className="text-xs font-semibold text-stone-900">{user?.name}</p>
                      <p className="text-[11px] text-stone-500 truncate">{user?.email}</p>
                      <div className="mt-1">
                        <span className="inline-block bg-[#31A464]/10 text-[#31A464] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                          {user?.role} Role
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      {isFarmer && (
                        <Link to="/farmer/dashboard" className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-700 hover:bg-emerald-50 hover:text-[#31A464]">
                          <Tractor className="w-4 h-4 text-[#31A464]" />
                          <span>Farmer Dashboard</span>
                        </Link>
                      )}

                      {isAdmin && (
                        <Link to="/admin" className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-700 hover:bg-amber-50 hover:text-[#C77F1F]">
                          <ShieldAlert className="w-4 h-4 text-[#C77F1F]" />
                          <span>Admin Portal</span>
                        </Link>
                      )}

                      {isBuyer && (
                        <Link to="/buyer/dashboard" className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-700 hover:bg-emerald-50 hover:text-[#31A464]">
                          <LayoutDashboard className="w-4 h-4 text-[#31A464]" />
                          <span>My Orders & Profile</span>
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-stone-100 pt-1">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-stone-700 hover:text-[#31A464] px-3 py-2 text-sm font-semibold transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#31A464] hover:bg-[#24824e] text-white text-sm font-semibold px-4 py-2 rounded-full shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Sprout className="w-4 h-4" />
                  <span>Join Market</span>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search fresh harvest..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F5F4] text-sm rounded-lg pl-3 pr-9 py-2 border border-stone-200"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-500">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <nav className="flex flex-col gap-2 font-medium text-stone-700">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-100">Home</Link>
            <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-100">Marketplace</Link>
            <Link to="/categories" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-100">Categories</Link>
            <Link to="/farmers" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-100">Farmers</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="py-2">About Us</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
