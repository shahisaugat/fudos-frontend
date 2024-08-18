import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa'; // Importing search icon from react-icons

// Custom Spinner Component with Minimum Rotation and Color #EB5757
const Spinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin border-t-4 border-[#EB5757] border-solid w-16 h-16 rounded-full"></div>
  </div>
);

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Added for controlled search
  const [searching, setSearching] = useState(false); // Added to control spinner

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setSearching(true); // Start searching
        const response = await axios.get('http://localhost:8080/api/orders');
        setOrders(response.data);
        setLoading(false);
        setSearching(false); // End searching
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
        setSearching(false); // End searching
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = async () => {
    setSearching(true); // Start spinner when searching
    try {
      const response = await axios.get(`http://localhost:8080/api/orders?search=${search}`);
      setOrders(response.data);
      setSearchTerm(search); // Update searchTerm for filtered display
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setSearching(false); // End spinner after search
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading || searching) {
    return <Spinner />;
  }

  const filteredOrders = orders.filter(order =>
    order.cartItems.some(item =>
      item.product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      <div className="relative mb-6 flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex items-center w-full sm:w-64 md:w-80">
          <input
            type="text"
            placeholder="Search by product name..."
            className="w-full h-10 sm:h-11 p-3 pl-10 sm:pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-sm sm:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg sm:text-xl" />
        </div>
        <button
          onClick={handleSearch}
          className="w-full sm:w-auto h-10 sm:h-11 bg-[#EB5757] text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center mt-2 sm:mt-0 text-sm sm:text-base"
        >
          Search
        </button>
      </div>
      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border-b">Order ID</th>
                <th className="px-4 py-2 border-b">Customer Username</th>
                <th className="px-4 py-2 border-b">Product Name</th>
                <th className="px-4 py-2 border-b">Quantity</th>
                <th className="px-4 py-2 border-b">Price</th>
                <th className="px-4 py-2 border-b">Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order =>
                order.cartItems.map((item, index) => (
                  <tr key={`${order.id}-${index}`} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{order.id}</td>
                    <td className="px-4 py-2 border-b">{order.customer.username}</td>
                    <td className="px-4 py-2 border-b">{item.product.productName}</td>
                    <td className="px-4 py-2 border-b">{item.quantity}</td>
                    <td className="px-4 py-2 border-b">${item.product.price.toFixed(2)}</td>
                    <td className="px-4 py-2 border-b">${(item.product.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Order;
