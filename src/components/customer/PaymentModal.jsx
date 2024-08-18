import React, { useState, useEffect } from 'react';
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
      <div className="relative bg-white p-4 md:p-6 rounded-lg w-full max-w-lg mx-4 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button className="text-gray-700 hover:text-gray-900" onClick={onClose}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="border-b mb-4">
          <p className="font-semibold mb-2">Cart Items</p>
          <ul className="list-none p-0 mb-4">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span>{item.productName}</span>
                <span className="flex items-center">
                  <span className="mr-2">x{item.quantity}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="font-semibold">Order summary</p>
          <ul className="list-none p-0">
            <li className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></li>
            <li className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></li>
            <li className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></li>
            <li className="flex justify-between font-bold text-xl mt-2"><span>Total</span><span>${total.toFixed(2)}</span></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Delivery Details</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label>Your name</label>
              <input type="text" name="name" className="border p-2 rounded" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="flex flex-col">
              <label>Address</label>
              <input type="text" name="address" className="border p-2 rounded" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="flex flex-col">
              <label>Phone Number</label>
              <input type="text" name="phoneNumber" className="border p-2 rounded" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
            <div className="flex flex-col">
              <label>Email</label>
              <input type="email" name="email" className="border p-2 rounded" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="flex flex-col">
              <label>Payment</label>
              <select name="paymentMethod" className="border p-2 rounded" value={formData.paymentMethod} onChange={handleChange}>
                <option value="Credit Card">Credit Card</option>
                <option value="Payment on delivery">Payment on delivery</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4 w-full">Proceed to Checkout</button>
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default PaymentModal;