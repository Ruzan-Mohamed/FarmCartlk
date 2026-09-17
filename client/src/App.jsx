import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { ProtectedRoute } from "./components/common/ProtectedRoutes";

// Public Pages
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import ProductDetail from "./pages/ProductDetail";
import CategoryList from "./pages/CategoryList";
import FarmerDirectory from "./pages/FarmerDirectory";
import FarmerProfile from "./pages/FarmerProfile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

// Buyer Pages
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import BuyerDashboard from "./pages/BuyerDashboard";

// Farmer Pages
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import AddEditProduct from "./pages/farmer/AddEditProduct";
import FarmerOrders from "./pages/farmer/FarmerOrders";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col justify-between bg-[#F5F5F4] text-stone-900 selection:bg-[#31A464] selection:text-white">
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            
            <Navbar />

            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Marketplace />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/categories" element={<CategoryList />} />
                <Route path="/farmers" element={<FarmerDirectory />} />
                <Route path="/farmers/:id" element={<FarmerProfile />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Buyer Protected Routes */}
                <Route element={<ProtectedRoute allowedRoles={["buyer", "farmer", "admin"]} />}>
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
                  <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
                </Route>

                {/* Farmer Protected Routes */}
                <Route element={<ProtectedRoute allowedRoles={["farmer", "admin"]} />}>
                  <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
                  <Route path="/farmer/products/add" element={<AddEditProduct />} />
                  <Route path="/farmer/products/edit/:id" element={<AddEditProduct />} />
                  <Route path="/farmer/orders" element={<FarmerOrders />} />
                </Route>

                {/* Admin Protected Routes */}
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/*" element={<AdminDashboard />} />
                </Route>

                {/* Fallback 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
