import React from 'react';
import appDownloadImage from '../../assets/icons/app-download.png'; // Replace with your actual image path

const DownloadSection = () => {
  return (
    <div className="flex items-center justify-center p-8 md:p-12 bg-white sm:-mt-20">
      <img src={appDownloadImage} alt="Download Our App" className="max-w-full h-auto lg:mt-4 lg:p-4" />
    </div>
  );
}

export default DownloadSection;
