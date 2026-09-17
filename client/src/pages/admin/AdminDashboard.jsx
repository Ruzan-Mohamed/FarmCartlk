import React, { useEffect, useState } from "react";
import api from "../../services/api";
import LoadingState from "../../components/common/LoadingState";
import StatusBadge from "../../components/common/StatusBadge";
import toast from "react-hot-toast";
import { 
  ShieldAlert, 
  Users, 
  Tractor, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  UserCheck, 
  UserX,
  Plus,
  Trash2,
  CheckCircle,
  RefreshCw
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tab State
  const [activeTab, setActiveTab] = useState("overview");

  // New Category State
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, catRes, prodRes, ordRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/users"),
        api.get("/categories"),
        api.get("/products"),
        api.get("/orders/admin/all")
      ]);

      setStats(statsRes.data.stats || {});
      setUsers(usersRes.data.users || []);
      setCategories(catRes.data.categories || []);
      setProducts(prodRes.data.products || []);
      setOrders(ordRes.data.orders || []);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleToggleUserStatus = async (userId) => {
    try {
      const res = await api.put(`/admin/users/${userId}/status`);
      toast.success(res.data.message);
      fetchAdminData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change status");
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCatName) return;
    try {
      await api.post("/categories", { name: newCatName, description: newCatDesc });
      toast.success("Category created!");
      setNewCatName("");
      setNewCatDesc("");
      fetchAdminData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create category");
    }
  };

  const handleDeleteCategory = async (catId) => {
    if (!window.confirm("Are you sure you want to deactivate this category?")) return;
    try {
      await api.delete(`/categories/${catId}`);
      toast.success("Category deactivated");
      fetchAdminData();
    } catch (err) {
      toast.error("Failed to delete category");
    }
  };

  if (loading) return <LoadingState message="Connecting to FarmCartLK Admin Portal..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-[#001D0D] text-white rounded-3xl p-8 border-b-4 border-[#C77F1F] flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-[#C77F1F]/20 border border-[#C77F1F]/40 text-[#C77F1F] text-xs font-bold px-3 py-1 rounded-full">
            <ShieldAlert className="w-4 h-4" />
            <span>PLATFORM ADMINISTRATION PORTAL</span>
          </div>
          <h1 className="text-3xl font-extrabold font-heading">
            System Administration
          </h1>
          <p className="text-stone-300 text-sm">Management and administration of farmers, buyers, categories, and marketplace orders.</p>
        </div>

        <button
          onClick={fetchAdminData}
          className="bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold px-4 py-2.5 rounded-full border border-stone-700 flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
          <p className="text-[11px] font-bold text-stone-500 uppercase">Gross Revenue (LKR)</p>
          <p className="text-2xl font-black text-[#C77F1F] font-heading">Rs. {stats?.totalRevenue || 0}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
          <p className="text-[11px] font-bold text-stone-500 uppercase">Total Farmers</p>
          <p className="text-2xl font-black text-[#31A464] font-heading">{stats?.totalFarmers || 0}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
          <p className="text-[11px] font-bold text-stone-500 uppercase">Total Buyers</p>
          <p className="text-2xl font-black text-[#4C9AAD] font-heading">{stats?.totalBuyers || 0}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
          <p className="text-[11px] font-bold text-stone-500 uppercase">Active Products</p>
          <p className="text-2xl font-black text-stone-900 font-heading">{stats?.totalProducts || 0}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
          <p className="text-[11px] font-bold text-stone-500 uppercase">Total Orders</p>
          <p className="text-2xl font-black text-stone-900 font-heading">{stats?.totalOrders || 0}</p>
        </div>

      </div>

      {/* Admin Tab Navigation */}
      <div className="flex border-b border-stone-200 gap-2 text-sm font-bold text-stone-600">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 px-4 transition-all ${
            activeTab === "overview" ? "border-b-2 border-[#C77F1F] text-[#C77F1F]" : "hover:text-stone-900"
          }`}
        >
          User Accounts ({users.length})
        </button>

        <button
          onClick={() => setActiveTab("categories")}
          className={`pb-3 px-4 transition-all ${
            activeTab === "categories" ? "border-b-2 border-[#C77F1F] text-[#C77F1F]" : "hover:text-stone-900"
          }`}
        >
          Categories ({categories.length})
        </button>

        <button
          onClick={() => setActiveTab("products")}
          className={`pb-3 px-4 transition-all ${
            activeTab === "products" ? "border-b-2 border-[#C77F1F] text-[#C77F1F]" : "hover:text-stone-900"
          }`}
        >
          Products ({products.length})
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 px-4 transition-all ${
            activeTab === "orders" ? "border-b-2 border-[#C77F1F] text-[#C77F1F]" : "hover:text-stone-900"
          }`}
        >
          Orders ({orders.length})
        </button>
      </div>

      {/* TAB 1: USER ACCOUNTS */}
      {activeTab === "overview" && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-stone-50 border-b border-stone-200 font-bold text-xs text-stone-700 uppercase">
            User Management & Status Control
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-[#F5F5F4] uppercase font-bold text-stone-500 border-b border-stone-200">
                <tr>
                  <th className="p-3.5">User</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">Contact Phone</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium">
                {users.map((u) => (
                  <tr key={u._id || u.id} className="hover:bg-stone-50">
                    <td className="p-3.5">
                      <p className="font-bold text-stone-900">{u.name}</p>
                      <p className="text-stone-400 text-[11px]">{u.email}</p>
                    </td>
                    <td className="p-3.5">
                      <span className="bg-stone-100 text-stone-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3.5">{u.phone || "—"}</td>
                    <td className="p-3.5">
                      {u.isActive ? (
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Active</span>
                      ) : (
                        <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded">Deactivated</span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleToggleUserStatus(u._id || u.id)}
                        className={`px-3 py-1 rounded-full font-bold text-[11px] transition-colors ${
                          u.isActive
                            ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                        }`}
                      >
                        {u.isActive ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CATEGORY MANAGEMENT */}
      {activeTab === "categories" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 space-y-4 shadow-xs">
            <h3 className="font-bold text-stone-900 text-base font-heading">Add New Category</h3>
            <form onSubmit={handleCreateCategory} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Mushrooms"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full bg-[#F5F5F4] text-xs rounded-xl px-3 py-2 border border-stone-200"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  className="w-full bg-[#F5F5F4] text-xs rounded-xl px-3 py-2 border border-stone-200"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#31A464] text-white font-bold text-xs px-5 py-2 rounded-full flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Save Category
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-stone-900 text-base font-heading">Existing Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat._id || cat.id} className="p-3 bg-[#F5F5F4] rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-stone-900">{cat.name}</p>
                    <p className="text-stone-500 text-[11px]">{cat.description || "No description"}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(cat._id || cat.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCTS */}
      {activeTab === "products" && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-xs">
          <h3 className="font-bold text-stone-900 text-base font-heading">Product Inventory Moderate</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <div key={p._id || p.id} className="p-3 bg-[#F5F5F4] rounded-2xl border border-stone-200 text-xs space-y-2">
                <p className="font-bold text-stone-900 truncate">{p.name}</p>
                <p className="text-stone-500">Farmer: {p.farmer?.name || "Farmer"}</p>
                <p className="font-extrabold text-[#C77F1F]">Rs. {p.price} /{p.unit}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ORDERS */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-xs">
          <h3 className="font-bold text-stone-900 text-base font-heading">All System Orders</h3>
          <div className="space-y-3">
            {orders.map((ord) => (
              <div key={ord._id || ord.id} className="p-4 bg-[#F5F5F4] rounded-2xl border border-stone-200 text-xs space-y-1">
                <div className="flex justify-between items-center font-bold">
                  <span>Order #{ord._id || ord.id}</span>
                  <StatusBadge status={ord.status} />
                </div>
                <p className="text-stone-600">Buyer: {ord.buyer?.name} • Total: <span className="text-[#C77F1F] font-bold">Rs. {ord.totalAmount}</span></p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
