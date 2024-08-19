import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../components/shared/ProductContext';
import { IoSearch } from "react-icons/io5";
import errorImage from '../assets/icons/404-error.png';

const MenuPage = ({ limit }) => {
  const { mostPopularItems } = useProductContext();
  const [searchQuery, setSearchQuery] = useState('');

  // Handle case where data is not loaded or is empty
  const isDataLoaded = mostPopularItems && mostPopularItems.length > 0;
  const filteredItems = isDataLoaded ? mostPopularItems.filter(item =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, limit) : [];

  return (
    <div>
      <section className="container mx-auto py-12">
        {isDataLoaded && (
          <div className="flex justify-end mb-8">
            <div className="relative flex items-center w-full max-w-xs">
              <input
                type="text"
                placeholder="Search products (e.g., pizza, burger)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-3 pl-10 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#EB5757] transition duration-300 w-full"
              />
              <IoSearch className='absolute left-3 text-[#EB5757] text-xl' />
            </div>
          </div>
        )}

        <div className='flex justify-center'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {isDataLoaded && filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <ProductCard key={item.productId} item={item} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[300px]">
                <img src={errorImage} alt="404 Error" className="w-64 h-auto mb-4" />
                <p className="text-lg font-semibold">No products found</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductCard = ({ item }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden w-[260px] transform transition duration-300 hover:scale-105 hover:shadow-lg">
    <div className='m-3 rounded-lg'>
      <img src={`http://localhost:8080/api/products/image/${item.productId}`} alt={item.productName} className="w-full h-40 object-cover object-center rounded-lg" />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{item.productName}</h3>
      <p className='text-sm text-[#EB5757] mb-4'>NRs. {item.price}</p>
      <Link to={`/product/${item.productId}`} className="text-blue-600 font-semibold hover:underline">Read More</Link>
    </div>
  </div>
);


export default MenuPage;
