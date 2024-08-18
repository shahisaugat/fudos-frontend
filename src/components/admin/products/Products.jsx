import React, { useState, useEffect } from "react";
import axios from "axios";
import FormModal from "./FormModal";
import { toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import default styles

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

  const deleteProduct = (productId) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`http://localhost:8080/api/products/delete/${productId}`);
              fetchProducts();
            } catch (error) {
              console.error("Error deleting product:", error);
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-end mb-6">
        <button
          className="bg-[#EB5757] text-white py-2 px-4 rounded hover:bg-[#d43f3f] flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <AiOutlinePlus className="w-4 h-4" />
          Add Product
        </button>
      </div>
      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditProductId(null);
        }}
      >
        <form className="space-y-6 p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="form-group">
              <label htmlFor="productName" className="block text-gray-700 font-semibold">
                Product Name:
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={productData.productName}
                onChange={handleInputChange}
                required
                placeholder="Enter product name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#EB5757] focus:ring-[#EB5757] focus:ring-opacity-50"
              />
            </div>

            <div className="form-group">
              <label htmlFor="detail" className="block text-gray-700 font-semibold">
                Details:
              </label>
              <input
                type="text"
                id="detail"
                name="detail"
                value={productData.detail}
                onChange={handleInputChange}
                required
                placeholder="Enter product details"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#EB5757] focus:ring-[#EB5757] focus:ring-opacity-50"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price" className="block text-gray-700 font-semibold">
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                required
                placeholder="Enter product price"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#EB5757] focus:ring-[#EB5757] focus:ring-opacity-50"
              />
            </div>

            <div className="form-group">
              <label htmlFor="file" className="block text-gray-700 font-semibold">
                Upload Image:
              </label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleImageChange}
                className="mt-1 block w-full file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:bg-[#EB5757] file:text-white file:cursor-pointer hover:file:bg-[#d43f3f]"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#EB5757] text-white py-2 px-4 rounded hover:bg-[#d43f3f] transition-colors duration-300"
            >
              {editProductId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </FormModal>

      {message && <p className="text-red-500 mt-4">{message}</p>}

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productList.map((product) => (
            <div
              key={product.productId}
              className="bg-white shadow-md rounded-md p-4 border border-gray-200"
            >
              <h3 className="text-lg font-semibold mb-2">
                {product.productName}
              </h3>
              <p className="text-gray-700 text-base mb-2">
                {truncateText(product.detail, 100)}
              </p>
              <p className="text-gray-900 font-bold text-base mb-2">
                Price: ${product.price}
              </p>
              {product.imageData && (
                <div className="mb-4">
                  <img
                    src={`http://localhost:8080/api/products/image/${product.productId}`}
                    alt={product.productName}
                    className="w-full h-32 object-cover rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=Image+Not+Found";
                    }}
                  />
                </div>
              )}
              <div className="flex gap-2">
                <button
                  className="bg-[#FF8C00] text-white py-1 px-3 rounded text-sm hover:bg-[#e07b00] transition-colors duration-300"
                  onClick={() => openEditModal(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600 transition-colors duration-300"
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
