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

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 md:px-8 lg:px-12">
      {cartItems.length === 0 ? (
        <p className="text-xl text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="py-3 px-4 text-left">Product</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Stock</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.productId} className="border-b border-gray-200">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <img
                          src={`http://localhost:8080/api/products/image/${item.productId}`}
                          alt={item.productName}
                          className="w-20 h-20 object-cover object-center rounded-lg mr-4"
                        />
                        <div>
                          <p className="text-gray-800 font-semibold">{item.productName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          className="bg-gray-200 text-red-600 font-semibold px-2 py-1 rounded"
                          onClick={() => handleDecreaseQuantity(item.productId)}
                        >
                          -
                        </button>
                        <p className="text-gray-800">{item.quantity}</p>
                        <button
                          className="bg-gray-200 text-red-600 font-semibold px-2 py-1 rounded"
                          onClick={() => handleIncreaseQuantity(item.productId)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-800">${item.price.toFixed(2)}</td>
                    <td className="py-4 px-4 text-green-500">Available</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <button
                          className="bg-[#1d55d9] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#155abf] transition duration-300"
                          onClick={() => openModal([item])}
                        >
                          Checkout
                        </button>
                        <button
                          className="text-red-600 font-semibold px-4 py-2 rounded-lg hover:text-red-800 transition duration-300"
                          onClick={() => handleRemoveFromCart(item.productId)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row justify-end mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <Link
              to="/"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Continue Shopping
            </Link>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
              onClick={() => openModal(cartItems)}
            >
              Purchase All
            </button>
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
