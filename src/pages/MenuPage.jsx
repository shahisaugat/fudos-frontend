import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import  { useProductContext } from '../components/shared/ProductContext';
import { IoSearch } from "react-icons/io5";


const MenuPage = ({limit}) => {
  const { mostPopularItems } = useProductContext();
  const [searchQuery, setSearchQuery] = useState('');

  if (!mostPopularItems || mostPopularItems.length === 0) {
    return <p>Loading...</p>; 
  }

  const filteredItems = mostPopularItems.filter(item =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0,limit) ;

  return (
    <div>
      <section className="container mx-auto py-12">



        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-lg"
          />
          <div className='relative right-6 top-3'>
            <IoSearch className='text-[#EB5757] text-xl'/>
          </div>
        </div>

        <div className='flex justify-center'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <ProductCard key={item.productId} item={item} />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductCard = ({ item }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden w-[260px]">
    <div className='m-3 rounded-lg'>
      <img src={`http://localhost:8080/api/products/image/${item.productId}`} alt={item.productName} className="w-full h-40 object-cover object-center rounded-lg" />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{item.productName}</h3>
      <p className="text-sm text-gray-600 mb-4">{item.detail}</p>
      <p className='text-sm text-[#EB5757] mb-4'>{item.price}</p>
      <Link to={`/product/${item.productId}`} className="text-blue-600 font-semibold hover:underline">Read More</Link>
    </div>
  </div>
);

export default MenuPage;
