import React from 'react';
import MenuPage from '../../pages/MenuPage';

const MostPopulars = () => {
  return (
   <div className='my-10'>
      <h2 className="text-3xl font-semibold text-center mt-12">Most Popular</h2>
      <MenuPage  limit={8}/>
   </div>
    
      
    
  );
};

export default MostPopulars;
