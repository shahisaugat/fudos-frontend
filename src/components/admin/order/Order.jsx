import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders');
        setOrders(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-200">Order ID</th>
              <th className="px-4 py-2 border border-gray-200">Customer Username</th>
              <th className="px-4 py-2 border border-gray-200">Product Name</th>
              <th className="px-4 py-2 border border-gray-200">Quantity</th>
              <th className="px-4 py-2 border border-gray-200">Price</th>
              <th className="px-4 py-2 border border-gray-200">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              order.cartItems.map((item, index) => (
                <tr key={`${order.id}-${index}`} className="bg-white">
                  <td className="px-4 py-2 border border-gray-200">{order.id}</td>
                  <td className="px-4 py-2 border border-gray-200">{order.customer.username}</td>
                  <td className="px-4 py-2 border border-gray-200">{item.product.productName}</td>
                  <td className="px-4 py-2 border border-gray-200">{item.quantity}</td>
                  <td className="px-4 py-2 border border-gray-200">${item.product.price.toFixed(2)}</td>
                  <td className="px-4 py-2 border border-gray-200">${(item.product.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Order;