import React, { useState, useEffect } from "react";
import axios from "axios";
import FormModal from "./FormModal";
import { toast } from "react-toastify";
 
const Products = () => {
  const [productData, setProductData] = useState({
    productName: "",
    detail: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [productList, setProductList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
 
  useEffect(() => {
    fetchProducts();
  }, []);
 
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products/get");
      setProductList(response.data.data);
      console.log("Products:", response.data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
 
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    );
    formData.append("image", image);
 
    try {
      if (editProductId) {
        await axios.put(
          `http://localhost:8080/api/products/update/${editProductId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post("http://localhost:8080/api/products/save", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      window.location.reload();
      fetchProducts();
      setIsModalOpen(false);
      setEditProductId(null);
    } catch (error) {
      toast.error("There was an error creating/updating the product.");
      console.error("Error creating/updating product:", error);
 
    }
  };
 
  const openEditModal = (product) => {
    setProductData(product);
    setIsModalOpen(true);
    setEditProductId(product.productId);
  };
 
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/delete/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
 
  return (
    <div className="container mx-auto p-4">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add Product
      </button>
      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditProductId(null);
        }}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productName" className="block text-gray-700">
              Product Name:
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={productData.productName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
 
          <div className="form-group">
            <label htmlFor="details" className="block text-gray-700">
              Details:
            </label>
            <input
              type="text"
              id="detail"
              name="detail"
              value={productData.detail}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
 
          <div className="form-group">
            <label htmlFor="price" className="block text-gray-700">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
 
          <div className="form-group">
            <label htmlFor="file" className="block text-gray-700">
              Upload File:
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleImageChange}
              required
              className="mt-1 block w-full"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              {editProductId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </FormModal>
 
      {message && <p className="text-red-500 mt-4">{message}</p>}
 
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productList.map((product) => (
            <div
              key={product.productId}
              className="bg-white shadow-md rounded p-4"
            >
              <h3 className="text-xl font-semibold mb-2">
                {product.productName}
              </h3>
              <p className="text-gray-700 mb-2">{product.detail}</p>
              <p className="text-gray-900 font-bold mb-2">
                Price: ${product.price}
              </p>
              {product.imageData && (
                <div className="mb-4">
                  <img
                    src={`http://localhost:8080/api/products/image/${product.productId}`}
                    alt={product.productName}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      console.error(
                        `Error loading image for product ${product.productId}`
                      );
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=Image+Not+Found";
                    }}
                  />
                </div>
              )}
              <div className="flex justify-between">
                <button
                  className="bg-yellow-500 text-white py-2 px-4 rounded"
                  onClick={() => openEditModal(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded"
                  onClick={() => deleteProduct(product.productId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default Products;