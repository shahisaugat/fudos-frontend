import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import backgroundImage from '../../assets/icons/login-background.png';
import { Link } from 'react-router-dom';

// Modal Component
const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg relative w-full max-w-4xl mx-4 md:mx-8">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 text-gray-500 bg-white hover:bg-gray-100 p-2 rounded-full"
          style={{ fontSize: '1rem' }} // Adjust font size for the close button
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative" style={{ paddingBottom: '56.25%' }}>
          <ReactPlayer 
            url="/path/to/your-video.mp4" // Update this with the path to your MP4 video
            controls
            width="100%"
            height="100%"
            className="absolute top-0 left-0 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          <button 
            onClick={openModal} 
            className="flex items-center space-x-2 border-2 text-secondary-foreground py-2 px-4 rounded-lg hover:bg-secondary/80"
          >
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
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default HeroSection;
