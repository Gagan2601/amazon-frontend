import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchResults.css";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("searchTerm");
  const category = searchParams.get("category");
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (searchTerm !== undefined) {
      let apiUrl = `http://localhost:5000/api/products/search/${searchTerm}`;
      if (category && category !== "All Categories") {
        apiUrl += `?category=${encodeURIComponent(category)}`;
      }
      console.log(apiUrl);
      fetch(apiUrl, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        });
    }
  }, [searchTerm, category, token]);
  const handleViewDetails = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };
  return (
    <div>
      {searchTerm ? (
        <>
          <h1>Search Results for "{searchTerm}"</h1>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                <p>Title: {product.title}</p>
                <p>Description: {product.description}</p>
                <img src={product.images} alt="product images" />
                <button
                  onClick={() => {
                    handleViewDetails(product);
                  }}
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Please enter a search term.</p>
      )}
    </div>
  );
}

export default SearchResults;
