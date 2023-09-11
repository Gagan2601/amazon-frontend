import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function UpdateProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { productId } = useParams();
  const { product } = location.state;
  const [productTitle, setProductTitle] = useState(product.title);
  const [productOriginalPrice, setProductOriginalPrice] = useState(
    product.originalPrice
  );
  const [productDiscountedPrice, setProductDiscountedPrice] = useState(
    product.discountedPrice
  );
  const [productDescription, setProductDescription] = useState(
    product.description
  );
  const [productImages, setProductImages] = useState(product.images);
  const [productQuantity, setProductQuantity] = useState(product.quantity);
  const [productCategory, setProductCategory] = useState(product.category);
  const [error, setError] = useState("");

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/update-product/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({
        title: productTitle,
        description: productDescription,
        originalPrice: productOriginalPrice,
        discountedPrice: productDiscountedPrice,
        images: productImages,
        quantity: productQuantity,
        category: productCategory,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product updated:", data);
        navigate("/seller/products");
      })
      .catch((error) => {
        setError("Error updating product: " + error.message);
      });
  };

  return (
    <div>
      <h2>Update Product</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleUpdateProduct}>
        <label htmlFor="product-title">Product Title</label>
        <input
          type="text"
          id="product-title"
          value={productTitle}
          onChange={(e) => setProductTitle(e.target.value)}
        />
        <label htmlFor="product-description">Product Description</label>
        <input
          type="text"
          id="product-description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <label htmlFor="product-original-price">Product Original Price</label>
        <input
          type="text"
          id="product-original-price"
          value={productOriginalPrice}
          onChange={(e) => setProductOriginalPrice(e.target.value)}
        />
        <label htmlFor="product-discounted-price">
          Product Discounted Price
        </label>
        <input
          type="text"
          id="product-discounted-price"
          value={productDiscountedPrice}
          onChange={(e) => setProductDiscountedPrice(e.target.value)}
        />
        <label htmlFor="product-images">Product Images</label>
        <input
          type="url"
          id="product-images"
          value={productImages}
          onChange={(e) => setProductImages([...productImages, e.target.value])}
        />
        <label htmlFor="product-quantity">Product Quantity</label>
        <input
          type="number"
          id="product-quantity"
          value={productQuantity}
          min="1"
          max="100"
          onChange={(e) => setProductQuantity(e.target.value)}
        />
        <label htmlFor="product-catgeory">Product Category</label>
        <input
          type="text"
          id="product-category"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
