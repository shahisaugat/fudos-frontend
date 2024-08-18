import React, { createContext, useContext, useState, useEffect } from 'react';
 
const CartContext = createContext();
 
export const useCartContext = () => useContext(CartContext);
 
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Retrieve cart items from localStorage when the component mounts
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
 
  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
 
  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item.productId === product.productId);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
 
  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedCartItems);
  };
 
  const clearCart = () => {
    setCartItems([]);
  };
 
  const increaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };
 
  const decreaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.productId === productId && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    }).filter(item => item.quantity > 0); // Remove items with quantity 0 after decrease
    setCartItems(updatedCartItems);
  };
 
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
 
export default CartContext;