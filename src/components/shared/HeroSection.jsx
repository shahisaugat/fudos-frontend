import React from 'react';
import backgroundImage from '../../assets/icons/login-background.png';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-background text-foreground lg:mx-10">
      <div className="md:w-2/3 md:order-1 md:mr-6 ml-2">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4">
          The Fastest Delivery <br /> In <span className="text-[#EB5757]">Your City</span>
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground sm:mt-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo, sed proin amet a vestibulum enim volutpat lacus. Volutpat arcu sit sed tortor estiam volutpat ipsum.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
          <Link 
            to="/menu" 
            className="bg-[#EB5757] text-white font-semibold py-2 px-8 rounded-lg hover:bg-[#E03D3D] transition duration-300"
          >
            Order Now
          </Link>
          <button className="flex items-center space-x-2 border-2 text-secondary-foreground py-2 px-4 rounded-lg hover:bg-secondary/80">
            <span className="w-6 h-6 flex items-center justify-center text-primary-foreground rounded-full">
              ▶
            </span>
            <span>Order Process</span>
          </button>
        </div>
      </div>
      <div className="md:w-1/2 lg:w-1/3 md:order-2 md:mt-4 my-8">
        <img src={backgroundImage} alt="Illustration of a delivery person on a scooter" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default HeroSection;
