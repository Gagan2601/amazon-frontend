import React, { useState } from "react";

function AddProduct() {
  const token = localStorage.getItem("token");
  const sellerId = localStorage.getItem("seller_id");
  const [productTitle, setProductTitle] = useState("");
  const [productOriginalPrice, setProductOriginalPrice] = useState("");
  const [productDiscountedPrice, setProductDiscountedPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);
  const [productCategory, setProductCategory] = useState("");

  const handleAddProduct = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/add-product", {
      method: "POST",
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
        seller: sellerId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product added:", data);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleAddProduct}>
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
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
