import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Create Context
const CartContext = createContext();

// Custom hook for using the CartContext
export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Retrieve cart items from localStorage when the component mounts
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = useCallback((product) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(item => item.productId === product.productId);
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex].quantity++;
        return updatedCartItems;
      }
      return [...prevCartItems, { ...product, quantity: 1 }];
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((productId) => {
    setCartItems((prevCartItems) => prevCartItems.filter(item => item.productId !== productId));
  }, []);

  // Clear the cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Increase item quantity
  const increaseQuantity = useCallback((productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  // Decrease item quantity
  const decreaseQuantity = useCallback((productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems
        .map(item =>
          item.productId === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0) // Remove items with quantity 0
    );
  }, []);

  // Provide context value
  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
