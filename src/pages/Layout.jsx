import React from 'react';
import Navbar from '../components/customer/Navbar' // Adjust the import path as needed
import Footer from '../components/shared/Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />    
      
    </div>
  );
};

export default Layout;