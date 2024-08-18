import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartContext, { useCartContext } from "../components/shared/CartContext";
import { useProductContext } from "../components/shared/ProductContext";
import { toast } from "react-toastify";
 
const ProductDetailPage = () => {
  const { id } = useParams();
  const { getProductById } = useProductContext();
  const { addToCart } = useCartContext();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
 
    fetchData();
  }, [getProductById, id]);
 
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success("Product added to cart.");
    }
  };
 
  if (loading) {
    return <p>Loading...</p>;
  }
 
  if (!product) {
    return <p>Product not found.</p>;
  }
 
  return (
    <div className="container min-h-screen mx-auto -mt-10 py-12">
      <div className="bg-white  overflow-hidden w-full max-w-7xl mx-4 md:mx-10">
        <div className="md:flex ml-10">
          <div className="md:w-1/2 mt-16 ">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900">
              {product.productName}
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl text-gray-700 mt-5">
              Nrs. {product.price}
            </p>
            <p className="mt-10 text-gray-500 text-base md:text-lg lg:text-xl">
              {product.detail}
            </p>
            <div className="flex gap-4 mt-10 lg:mt-20">
              <button
                className="bg-green-500 text-white px-6 py-3 rounded text-lg md:text-xl lg:text-2xl"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-5 md:mt-10 lg:ml-40 flex justify-center">
            <img
              className="w-[400px] object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
              src={`http://localhost:8080/api/products/image/${product.productId}`}
              alt="burger"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default ProductDetailPage;