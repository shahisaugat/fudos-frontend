import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CartContext, { useCartContext } from '../components/shared/CartContext';
import { useProductContext } from '../components/shared/ProductContext';
import { toast } from 'react-toastify';

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
        console.error('Error fetching product:', error);
      }
    };

    fetchData();
  }, [getProductById, id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success('Product added to cart.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-semibold mb-4">{product.productName}</h2>
      <img src={`http://localhost:8080/api/products/image/${product.productId}`} alt={product.productName} className="w-full h-80 object-cover object-center rounded-lg mb-4" />
      <p className="text-lg mb-4">{product.detail}</p>
      <p className='text-[#EB5757] mb-4'>{product.price}</p>
      <p><strong>ID:</strong> {product.productId}</p>
      <button className="bg-[#EB5757] text-white px-4 py-2 rounded-lg mt-4" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetailPage;
