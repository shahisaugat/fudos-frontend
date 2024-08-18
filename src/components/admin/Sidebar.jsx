import React from "react";
import { Link } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { MdPeopleAlt, MdChair,MdSupportAgent } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoLogOut, IoFastFood } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiPlusCircle } from "react-icons/bi";

function Sidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Adjust this based on your authentication logic
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    setIsLoggedIn(false);
    navigate("/");
    console.log("User logged out");
  };

  return (
    <div className="h-screen bg-slate-200 dark:bg-white">
      <div className="flex flex-col gap-3 w-full text-slate-300 h-full justify-between">
        <div className="flex flex-col gap-10 px-4 mt-4">
          <div className="flex items-center justify-center gap-3">
            <div className="block md:hidden">
              <MdChair className="text-2xl text-red-500" />
            </div>
            <div className="hidden md:block w-32 h-auto font-bold mx-6 ">
              <span className="text-red-500">FUDOS</span>
              <span className="text-black">FOOD DELIVERY</span>
            </div>
          </div>
          <div className="flex flex-col gap-10 text-md sm:text-sm lg:text-lg">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <RiDashboardFill className="text-2xl text-red-500"/>
              <span className="hidden sm:flex text-black hover:text-slate-400 cursor-pointer font-Roboto">
                Dashboard
              </span>
            </Link>
            <Link to="/admin/customers" className="flex items-center gap-3">
              <MdPeopleAlt className="text-2xl text-red-500" />
              <span className="hidden font-Roboto sm:flex text-black hover:text-slate-400 cursor-pointer">
                Members
              </span>
            </Link>
            <Link to="/admin/order" className="flex items-center gap-3">
              <GrTransaction className="text-2xl text-red-500"/>
              <span className="hidden sm:flex text-black hover:text-slate-400 cursor-pointer">
                Order
              </span>
            </Link>
            <Link to="/admin/products" className="flex items-center gap-3">
              <IoFastFood className="text-2xl text-red-500"/>
              <span className="hidden font-Roboto sm:flex text-black hover:text-slate-400 cursor-pointer">
                Products
              </span>
            </Link>
            <Link to="/admin/support" className="flex items-center gap-3">
              <MdSupportAgent className="text-2xl text-red-500"/>
              <span className="hidden font-Roboto sm:flex text-black hover:text-slate-400 cursor-pointer">
                Support
              </span>
            </Link>
            <Link to="/admin/addadmin" className="flex items-center gap-3">
              <BiPlusCircle className="text-2xl text-red-500"/>
              <span className="hidden font-Roboto sm:flex text-black hover:text-slate-400 cursor-pointer">
                AddAdmin
              </span>
            </Link>
          </div>
        </div>
        <div className="flex items-center text-md text-black hover:text-slate-400 sm:text-xs md:text-sm lg:text-lg px-4 mb-4 gap-3">
          <IoLogOut className="text-md text-red-500"/>
          <button
           
            onClick={handleLogout}
          >
            Logout
          </button>        </div>
      </div>
    </div>
  );
}

export default Sidebar;
