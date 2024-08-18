import React from 'react';

import timeIcon from '../../assets/icons/time-icon.png';
import locationIcon from '../../assets/icons/location-icon.png';
import phoneIcon from '../../assets/icons/phone-icon.png';

const iconSize = '40px';

const DeliveryInfo = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around items-center space-y-12 md:space-y-0 md:space-x-6 p-2 mt-2"> {/* Added mt-8 */}
      <div className="flex flex-col items-center text-center">
        <img src={timeIcon} alt="clock icon" style={{ width: iconSize, height: iconSize }} className="mb-2" />
        <div className="flex flex-col items-center text-center">
          <p className="text-lg font-semibold mb-1">Today 10:00am - 10:00pm</p>
          <p className="text-muted-foreground text-sm">Working time</p>
        </div>
      </div>

      <div className="flex flex-col items-center text-center">
        <img src={locationIcon} alt="location icon" style={{ width: iconSize, height: iconSize }} className="mb-2" />
        <div className="flex flex-col items-center text-center">
          <p className="text-lg font-semibold mb-1">Washington, D.C., DC, USA</p>
          <p className="text-muted-foreground text-sm">Our Location</p>
        </div>
      </div>

      <div className="flex flex-col items-center text-center">
        <img src={phoneIcon} alt="phone icon" style={{ width: iconSize, height: iconSize }} className="mb-2" />
        <div className="flex flex-col items-center text-center">
          <p className="text-lg font-semibold mb-1">+0123 456 7891</p>
          <p className="text-muted-foreground text-sm">Phone Number</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
