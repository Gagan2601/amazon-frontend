import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const token = localStorage.getItem("token");
  const [sellerProducts, setSellerProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/seller-products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSellerProducts(data);
      })
      .catch((error) => {
        setError("Error fetching seller's products: " + error.message);
      });
  }, [token]);

  const handleUpdateProduct = (product) => {
    navigate(`/seller/update-product/${product._id}`, { state: { product } });
  };

  const handleDeleteProduct = (productId) => {
    fetch(`http://localhost:5000/api/delete-product/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
      .then((response) => response.json())
      .then(() => {
        setSellerProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      })
      .catch((error) => {
        setError("Error deleting product: " + error.message);
      });
  };

  return (
    <div>
      <h2>Your Products</h2>
      {error && <p>{error}</p>}
      <ul>
        {sellerProducts.map((product) => (
          <li key={product._id}>
            <h3>{product.title}</h3>
            <p>Description: {product.description}</p>
            <p>Price: ${product.discountedPrice}</p>
            <button onClick={() => handleUpdateProduct(product)}>Update</button>
            <button onClick={() => handleDeleteProduct(product._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
