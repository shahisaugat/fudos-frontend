import React from 'react';
import { Link } from 'react-router-dom';

const LINK_CLASS = "text-primary-foreground px-3 py-2 hover:bg-primary-foreground/10 transition duration-300";

const HamburgerMenu = ({ isLoggedIn, handleSignOut, toggleMenu }) => {
    return (
        <div className="md:hidden absolute top-16 left-0 w-full bg-primary shadow-lg py-4 px-3 space-y-3 z-1000">
            <Link to="/home" className={LINK_CLASS} onClick={toggleMenu}>Home</Link>
            <Link to="/menu" className={LINK_CLASS} onClick={toggleMenu}>Menu</Link>
            <Link to="/about" className={LINK_CLASS} onClick={toggleMenu}>About</Link>
            <Link to="/contact" className={LINK_CLASS} onClick={toggleMenu}>Contact</Link>
            <Link to="/cart" className={`${LINK_CLASS} flex items-center space-x-2`} onClick={toggleMenu}>
                <img src="/path/to/basket-icon.png" alt="Basket" className="h-5" />
                <span>Cart</span>
            </Link>
            {isLoggedIn ? (
                <div className="flex flex-col items-start space-y-3">
                    <button 
                        className="px-3 py-1 min-w-[100px] rounded-lg bg-[#EB5757] text-white font-semibold hover:bg-[#E03D3D] transition duration-300"
                        onClick={() => {
                            handleSignOut();
                            toggleMenu();
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <Link to="/signin" className={LINK_CLASS} onClick={toggleMenu}>
                    <button className='px-3 py-1 min-w-[100px] rounded-lg bg-[#EB5757] text-white font-semibold hover:bg-[#E03D3D] transition duration-300'>
                        Login
                    </button>
                </Link>
            )}
        </div>
    );
};

export default HamburgerMenu;
