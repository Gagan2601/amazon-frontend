import React from "react";
import { Link } from "react-router-dom";

function SellerHomePage() {
  return (
    <div>
      <h2>Welcome, Seller!</h2>
      <div className="seller-actions">
        <Link to="/seller/add-product">Add Product</Link>
        <Link to="/seller/products">Get Products</Link>
      </div>
    </div>
  );
}

export default SellerHomePage;
