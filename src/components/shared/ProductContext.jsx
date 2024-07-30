import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [mostPopularItems, setMostPopularItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/get');
        setMostPopularItems(response.data.data); // Assuming the API response structure matches what you expect
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, []);

  const getProductById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider value={{ mostPopularItems, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
