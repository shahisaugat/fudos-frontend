import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import brandLogo from '../../assets/icons/brand-logo.png';
import profileIcon from '../../assets/icons/user-circle.png';
import basketIcon from '../../assets/icons/basket-icon.png';

const NAV_CLASS = "bg-white shadow-md p-4 flex items-center justify-between";
const LINK_CLASS = "text-gray-700 px-4 py-2 hover:text-[#EB5757] transition-colors duration-300";
const ICON_CLASS = "text-gray-700 hover:text-[#EB5757] transition-colors duration-300";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={NAV_CLASS}>
            <div className="flex items-center">
                <img src={brandLogo} alt="Logo" className="h-10 mr-4" />
            </div>
            <div className="hidden md:flex flex-1 justify-center space-x-4">
                <Link to="/home" className={LINK_CLASS}>Home</Link>
                <Link to="/menu" className={LINK_CLASS}>Menu</Link>
                <Link to="/about" className={LINK_CLASS}>About</Link>
                <Link to="/contact" className={LINK_CLASS}>Contact</Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
                <Link to="/cart" className={ICON_CLASS}>
                    <img src={basketIcon} alt="Basket" className="h-5" />
                </Link>
                {isLoggedIn ? (
                    <div className="flex items-center space-x-4">
                        <img src={profileIcon} alt="Profile" className="h-8 cursor-pointer hover:opacity-80 transition-opacity duration-300" />
                        <button className="py-2 px-6 min-w-[120px] rounded-lg bg-[#EB5757] text-white hover:bg-[#d43f3f] transition-colors duration-300" onClick={handleSignOut}>Sign Out</button>
                    </div>
                ) : (
                    <Link to="/signin" className={ICON_CLASS}>
                        <button className='py-[6px] min-w-[100px] rounded-lg bg-[#EB5757] text-white hover:bg-[#d43f3f] transition-colors duration-300'>Login</button>
                    </Link>
                )}
            </div>
            <button onClick={toggleMobileMenu} className="md:hidden text-gray-700 hover:text-[#EB5757] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-50">
                    <div className="flex flex-col items-start py-4 px-6 space-y-4">
                        <Link to="/home" className={LINK_CLASS} onClick={toggleMobileMenu}>Home</Link>
                        <Link to="/menu" className={LINK_CLASS} onClick={toggleMobileMenu}>Menu</Link>
                        <Link to="/about" className={LINK_CLASS} onClick={toggleMobileMenu}>About</Link>
                        <Link to="/contact" className={LINK_CLASS} onClick={toggleMobileMenu}>Contact</Link>
                        <Link to="/cart" className={ICON_CLASS + " flex items-center"} onClick={toggleMobileMenu}>
                            <img src={basketIcon} alt="Basket" className="h-6 mr-2" />
                            Cart
                        </Link>
                        {isLoggedIn ? (
                            <div className="flex flex-col items-center mt-4 space-y-2">
                                <img src={profileIcon} alt="Profile" className="h-8" />
                                <button className="py-2 px-6 min-w-[120px] rounded-lg bg-[#EB5757] text-white hover:bg-[#d43f3f] transition-colors duration-300" onClick={handleSignOut}>Sign Out</button>
                            </div>
                        ) : (
                            <Link to="/signin" className={ICON_CLASS + " mt-4"}>
                                <button className='py-2 px-6 min-w-[120px] rounded-lg bg-[#EB5757] text-white hover:bg-[#d43f3f] transition-colors duration-300'>Login</button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
