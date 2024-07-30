import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import brandLogo from '../../assets/icons/brand-logo.png';
import profileIcon from '../../assets/icons/user-circle.png';
import basketIcon from '../../assets/icons/basket-icon.png';

const NAV_CLASS = "bg-primary shadow-lg p-4 flex items-center justify-between ";
const LINK_CLASS = "text-primary-foreground px-4 py-2";
const ICON_CLASS = "text-primary-foreground";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("roles");
        
        setIsLoggedIn(false);
        
        navigate("/");
    };

    return (
        <nav className={NAV_CLASS}>
            <div className="flex items-center">
                <img src={brandLogo} alt="Logo" className="h-10 mr-4" />
            </div>
            <div className="hidden md:flex flex-1 justify-center">
                <Link to="/home" className={LINK_CLASS}>Home</Link>
                <Link to="/menu" className={LINK_CLASS}>Menu</Link>
                <Link to="/about" className={LINK_CLASS}>About</Link>
                <Link to="/contact" className={LINK_CLASS}>Contact</Link>
            </div>
            <div className="hidden md:flex items-center">
                <Link to="/cart" className={ICON_CLASS + " mr-4"}>
                    <img src={basketIcon} alt="Basket" className="h-4" />
                </Link>
                {isLoggedIn ? (
                    <div className="flex items-center">
                        <img src={profileIcon} alt="Profile" className="h-8 cursor-pointer"  />
                        <button className="ml-4 border-2 p-2 rounded-lg bg-[#EB5757] text-black" onClick={handleSignOut}>Sign Out</button>
                    </div>
                ) : (
                    <Link to="/signin" className={ICON_CLASS}>
                        <button className='border-2 p-2 rounded-lg bg-[#EB5757] text-black'>Login</button>
                    </Link>
                )}
            </div>
            <button className="md:hidden text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </nav>
    );
};

export default Navbar;
