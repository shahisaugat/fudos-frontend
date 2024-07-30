import React from 'react';
import Navbar from '../components/customer/Navbar';
import HeroSection from '../components/shared/HeroSection';
import DeliveryInfo from '../components/customer/DeliveryInfo';
import MostPopulars from '../components/customer/MostPopulars';
import Testimonial from '../components/customer/Testimonial';
import DownloadSection from '../components/customer/DownloadSection';
import Footer from '../components/shared/Footer';

const CustomerHome = () => {
  return (
    <div>
        
        <HeroSection />
        <DeliveryInfo />
        <MostPopulars />
        <Testimonial />
        <DownloadSection />
        
    </div>
  );
};

export default CustomerHome;
