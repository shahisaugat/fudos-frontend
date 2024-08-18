import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { MdPeopleAlt, MdChair, MdSupportAgent } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoLogOut, IoFastFood } from "react-icons/io5";
import { BiPlusCircle } from "react-icons/bi";

function Sidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    setIsLoggedIn(false);
    navigate("/");
    console.log("User logged out");
  };

  const isActive = (path) => location.pathname === path ? 'bg-[#FFA1A1] text-gray-800' : '';

  return (
    <div className="h-screen bg-[#F56D6D] sm:w-20 md:w-64 flex-shrink-0">
      <div className="flex flex-col gap-3 w-full text-gray-100 h-full justify-between">
        <div className="flex flex-col gap-8 px-4 mt-4">
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <MdChair className="text-3xl text-white" />
            </div>
            <div className="hidden md:flex flex-col items-start"> {/* Changed alignment */}
              <span className="text-white font-bold text-2xl">FUDOS</span> {/* Increased font size */}
              <span className="text-gray-200 font-semibold text-base">FOOD DELIVERY</span> {/* Font size remains unchanged */}
            </div>
          </div>
          <div className="flex flex-col gap-6 text-sm">
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-3 hover:bg-[#FFA1A1] rounded-lg p-2 transition-all duration-300 ease-in-out ${isActive('/admin/dashboard')}`}
            >
              <RiDashboardFill className="text-xl text-white" />
              <span className="hidden md:flex text-white font-Roboto text-base">
                Dashboard
              </span>
            </Link>
            <Link
              to="/admin/customers"
              className={`flex items-center gap-3 hover:bg-[#FFA1A1] rounded-lg p-2 transition-all duration-300 ease-in-out ${isActive('/admin/customers')}`}
            >
              <MdPeopleAlt className="text-xl text-white" />
              <span className="hidden md:flex text-white font-Roboto text-base">
                Members
              </span>
            </Link>
            <Link
              to="/admin/order"
              className={`flex items-center gap-3 hover:bg-[#FFA1A1] rounded-lg p-2 transition-all duration-300 ease-in-out ${isActive('/admin/order')}`}
            >
              <GrTransaction className="text-xl text-white" />
              <span className="hidden md:flex text-white font-Roboto text-base">
                Order
              </span>
            </Link>
            <Link
              to="/admin/products"
              className={`flex items-center gap-3 hover:bg-[#FFA1A1] rounded-lg p-2 transition-all duration-300 ease-in-out ${isActive('/admin/products')}`}
            >
              <IoFastFood className="text-xl text-white" />
              <span className="hidden md:flex text-white font-Roboto text-base">
                Products
              </span>
            </Link>
            <Link
              to="/admin/support"
              className={`flex items-center gap-3 hover:bg-[#FFA1A1] rounded-lg p-2 transition-all duration-300 ease-in-out ${isActive('/admin/support')}`}
            >
              <MdSupportAgent className="text-xl text-white" />
              <span className="hidden md:flex text-white font-Roboto text-base">
                Support
              </span>
            </Link>
            <Link
              to="/admin/addadmin"
              className={`flex items-center gap-3 hover:bg-[#FFA1A1] rounded-lg p-2 transition-all duration-300 ease-in-out ${isActive('/admin/addadmin')}`}
            >
              <BiPlusCircle className="text-xl text-white" />
              <span className="hidden md:flex text-white font-Roboto text-base">
                Add Admin
              </span>
            </Link>
          </div>
        </div>
        <div className="flex items-center text-white hover:text-gray-800 px-4 mb-4 gap-3">
          <IoLogOut className="text-lg text-white" />
          <button
            onClick={handleLogout}
            className="hidden md:flex text-base font-semibold hover:underline">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
