import React from 'react';
import { FaBox, FaShoppingCart, FaUsers, FaAddressBook } from 'react-icons/fa';

const iconMap = {
  'Total Products': <FaBox className="text-2xl text-[#F56D6D]" />,
  'Total Orders': <FaShoppingCart className="text-2xl text-[#F56D6D]" />,
  'Total Customers': <FaUsers className="text-2xl text-[#F56D6D]" />,
  'Total Contacts': <FaAddressBook className="text-2xl text-[#F56D6D]" />,
};

const CardDataStats = ({ title, total, subtitle }) => {
  return (
    <div className='bg-white shadow-md rounded-lg px-6 py-4 flex items-center justify-between'>
      <div className='flex items-center'>
        <div className='mr-4 text-[#F56D6D]'>
          {iconMap[title]}
        </div>
        <div className='flex flex-col text-left'>
          <h2 className='text-lg font-semibold mb-1 text-gray-800'>{title}</h2>
          {subtitle && <p className='text-sm text-gray-600'>{subtitle}</p>}
        </div>
      </div>
      <p className='text-xl font-bold text-gray-900'>{total}</p>
    </div>
  );
};

export default CardDataStats;
