import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/customer/PaymentModal'; // Assuming Modal is implemented in a separate component
import { useCartContext } from '../components/shared/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCartContext();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleIncreaseQuantity = (productId) => {
    increaseQuantity(productId);
  };

  const handleDecreaseQuantity = (productId) => {
    if (cartItems.find(item => item.productId === productId).quantity > 1) {
      decreaseQuantity(productId);
    } else {
      removeFromCart(productId);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const deliveryFee = 5; // Example delivery fee
  const subtotal = calculateSubtotal();
  const totalPrice = subtotal + deliveryFee;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-semibold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            {cartItems.map(item => (
              <div key={item.productId} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <img src={`http://localhost:8080/api/products/image/${item.productId}`} alt={item.productName} className="w-24 h-24 object-cover object-center rounded-lg mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.productName}</h3>
                    <p className="text-sm text-gray-600">Price: ${item.price}</p>
                    <div className="flex items-center">
                      <button className="text-red-600 font-semibold mr-2" onClick={() => handleDecreaseQuantity(item.productId)}>-</button>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <button className="text-red-600 font-semibold ml-2" onClick={() => handleIncreaseQuantity(item.productId)}>+</button>
                    </div>
                  </div>
                </div>
                <button className="text-red-600 font-semibold ml-4" onClick={() => handleRemoveFromCart(item.productId)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-lg">Subtotal: ${subtotal.toFixed(2)}</p>
            <p className="text-lg">Delivery Fee: ${deliveryFee.toFixed(2)}</p>
            <p className="text-xl font-semibold mt-2">Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
          <div className="mt-8">
            <button className="bg-[#EB5757] text-white px-4 py-2 rounded-lg mr-4" onClick={handleClearCart}>Clear Cart</button>
            <Link to="/" className="text-blue-600 font-semibold hover:underline">Continue Shopping</Link>
            <button className="bg-[#EB5757] text-white px-4 py-2 rounded-lg ml-4" onClick={openModal}>Purchase All</button>
          </div>
          <Modal isOpen={isModalOpen} onClose={closeModal} cartTotal={{ subtotal, shipping: 0, tax: 0, total: totalPrice }} cartItems={cartItems} />
        </>
      )}
    </div>
  );
};

export default Cart;
