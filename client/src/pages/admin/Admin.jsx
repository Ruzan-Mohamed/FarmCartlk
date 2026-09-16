import { NavLink, Routes, Route } from "react-router-dom";
import { MdInventory2, MdPeople } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";


export default function Admin() {
  return (
    <div className="h-screen w-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="h-full w-[25%] bg-primry shadow-2xl text-secondary flex flex-col">
        <div className="w-full h-50 px-5 flex flex-col items-center gap-2">
          <img
            src="/favicon.png"
            alt="logo"
            className="h-40 w-40 object-contain"
          />
          <span className="text-2xl font-black">Admin</span>
        </div>

        <nav className="w-full px-4 mt-5 flex flex-col gap-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-accent text-primry"
                  : "hover:bg-accent hover:text-primry"
              }`
            }
          >
            <BsCart3 className="text-xl" />
            <span className="font-semibold">Order</span>
          </NavLink>

          <NavLink
            to="/admin/Product"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-accent text-primry"
                  : "hover:bg-accent hover:text-primry"
              }`
            }
          >
            <MdInventory2 className="text-xl" />
            <span className="font-semibold">Product</span>
          </NavLink>

          <NavLink
            to="/admin/User"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-accent text-primry"
                  : "hover:bg-accent hover:text-primry"
              }`
            }
          >
            <MdPeople className="text-xl" />
            <span className="font-semibold">User</span>
          </NavLink>
        </nav>
      </div>

      <div className="h-full w-[75%] p-6 overflow-auto">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1 className="text-3xl font-bold text-secondary">
                  Admin Dashboard
                </h1>
                <p className="mt-2 text-gray-500">
                  Welcome to the admin dashboard.
                </p>
              </div>
            }
          />
          <Route
            path="User"
            element={
              <div>
                <h1 className="text-3xl font-bold text-secondary">
                  Admin User
                </h1>
              </div>
            }
          />
  
        </Routes>
      </div>
    </div>
  );
}