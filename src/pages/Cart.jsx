import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/customer/PaymentModal";
import { useCartContext } from "../components/shared/CartContext";
 
const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartContext();
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
 
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
    if (cartItems.find((item) => item.productId === productId).quantity > 1) {
      decreaseQuantity(productId);
    } else {
      removeFromCart(productId);
    }
  };
 
  const calculateSubtotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
 
  const deliveryFee = 5; // Example delivery fee
 
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
 
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };
 
  const subtotal = calculateSubtotal(cartItems);
  const totalPrice = subtotal + deliveryFee;
 
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {cartItems.length === 0 ? (
        <p className="text-xl text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2">Product</th>
                  <th className="py-2 px-4 border-b-2">Quantity</th>
 
                  <th className="py-2 px-4 border-b-2">Price</th>
                  <th className="py-2 px-4 border-b-2">Stock</th>
 
                  <th className="py-2 px-4 border-b-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.productId} className="text-center">
                    <td className="py-4 px-6 border-b">
                      <div className="flex items-center justify-center sm:justify-start">
                        <img
                          src={`http://localhost:8080/api/products/image/${item.productId}`}
                          alt={item.productName}
                          className="w-16 h-16 object-cover object-center rounded-lg mr-4"
                        />
                        <div>
                          <p>{item.productName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex items-center justify-center">
                        <button
                          className="text-red-600 font-semibold mr-2"
                          onClick={() => handleDecreaseQuantity(item.productId)}
                        >
                          -
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          className="text-red-600 font-semibold ml-2"
                          onClick={() => handleIncreaseQuantity(item.productId)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">${item.price}</td>
                    <td className="py-2 px-4 border-b text-green-400">Available</td>
                    <td className="py-2 px-4 border-b">
                    <button
                        className="bg-[#1d55d9] text-white px-6 py-2 rounded-lg shadow-lg hover:bg-[#d24646] transition duration-300"
                        onClick={() => openModal([item])}
                      >
                        Checkout
                      </button>
                      <button
                        className="text-red-600 font-semibold px-4 text-lg"
                        onClick={() => handleRemoveFromCart(item.productId)}
                      >
                        Remove
                      </button>
                     
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-12">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center text-xl font-semibold text-gray-800">
                <p>Subtotal:</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center text-xl font-semibold text-gray-800 mt-4">
                <p>Delivery Fee:</p>
                <p>${deliveryFee.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center text-2xl font-bold text-gray-900 mt-6">
                <p>Total Price:</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end mt-8 space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
              <Link
                to="/"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
              >
                Continue Shopping
              </Link>
              <button
                className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
                onClick={() => openModal(cartItems)}
              >
                Purchase All
              </button>
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            cartTotal={{
              subtotal,
              shipping: deliveryFee,
              tax: 0,
              total: subtotal + deliveryFee,
            }}
            cartItems={selectedItem || cartItems}
          />
        </>
      )}
    </div>
  );
};
 
export default Cart;