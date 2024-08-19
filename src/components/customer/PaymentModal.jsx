import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PaymentModal = ({ isOpen, onClose, cartItems }) => {
  if (!isOpen) return null;

  // Calculate subtotal, shipping, and total for the selected items
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 5; // Example shipping fee, you can make this dynamic
  const tax = 0; // Example tax, adjust as needed
  const total = subtotal + shipping + tax;

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    paymentMethod: 'Credit Card', // Default payment method
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token) {
      alert('Please log in to proceed.');
      return;
    }

    const orderData = {
      customer: { id: userId },
      cartItems: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      })),
      subtotal: subtotal,
      shipping: shipping,
      tax: tax,
      total: total,
      name: formData.name,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      paymentMethod: formData.paymentMethod
    };

    try {
      const response = await axios.post('http://localhost:8080/api/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Order placed successfully!');
      onClose();
    } catch (error) {
      toast.error('There was an error placing your order.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg w-full max-w-4xl mx-4 my-8 max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
          <h2 className="text-xl md:text-2xl font-semibold">Order Summary</h2>
          <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col md:flex-row">
          {/* Summary Section */}
          <div className="flex-1 p-4 border-r border-gray-200">
            <p className="text-lg md:text-xl font-semibold mb-2">Cart Items</p>
            <ul className="list-none p-0 mb-4 space-y-2">
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm">
                  <span className="text-sm md:text-base">{item.productName}</span>
                  <span className="flex items-center">
                    <span className="mr-2 text-gray-600 text-sm md:text-base">x{item.quantity}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-lg md:text-xl font-semibold">Order Summary</p>
            <ul className="list-none p-0 space-y-1">
              <li className="flex justify-between py-1 text-sm md:text-base"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></li>
              <li className="flex justify-between py-1 text-sm md:text-base"><span>Shipping</span><span>${shipping.toFixed(2)}</span></li>
              <li className="flex justify-between py-1 text-sm md:text-base"><span>Tax</span><span>${tax.toFixed(2)}</span></li>
              <li className="flex justify-between py-2 text-lg md:text-xl font-bold"><span>Total</span><span>${total.toFixed(2)}</span></li>
            </ul>
          </div>
          {/* Form Section */}
          <div className="flex-1 p-4">
            <p className="text-lg md:text-xl font-semibold mb-2">Delivery Details</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm md:text-base">Your Name</label>
                  <input type="text" name="name" className="border border-gray-300 p-1.5 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm md:text-base">Address</label>
                  <input type="text" name="address" className="border border-gray-300 p-1.5 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.address} onChange={handleChange} required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm md:text-base">Phone Number</label>
                  <input type="text" name="phoneNumber" className="border border-gray-300 p-1.5 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.phoneNumber} onChange={handleChange} required />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm md:text-base">Email</label>
                  <input type="email" name="email" className="border border-gray-300 p-1.5 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm md:text-base">Payment Method</label>
                <select name="paymentMethod" className="border border-gray-300 p-1.5 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.paymentMethod} onChange={handleChange}>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Payment on delivery">Payment on delivery</option>
                </select>
              </div>
              <button type="submit" className="bg-[#EB5757] text-white p-2 rounded-lg mt-4 w-full text-sm md:text-base hover:bg-[#d94e4e] transition duration-300">Proceed to Checkout</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
