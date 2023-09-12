import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LowerNavbar from "./components/Lower Navbar/LowerNavbar";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/user/home/Home";
import Register from "./pages/user/register/Register";
import SignIn from "./pages/user/sign in/SignIn";
import SellerSignIn from "./pages/seller/sign in/Signin";
import SellerRegister from "./pages/seller/register/Register";
import SellerHomePage from "./pages/seller/home/Home";
import AddProduct from "./pages/seller/home/AddProduct";
import UpdateProduct from "./pages/seller/home/UpdateProduct";
import ProductList from "./pages/seller/home/ProductList";
import SaveAddress from "./pages/user/home/SaveAddress";
import SearchResults from "./pages/user/home/SearchResults";
import SingleProduct from "./pages/user/home/SingleProduct";
import Account from "./pages/user/home/Account";
import Cart from "./pages/user/home/Cart";
import SellerAccount from "./pages/seller/home/SellerAccount";
import SellerSaveAddress from "./pages/seller/home/SellerSaveAddress";

function DefaultLayout({
  children,
  isSignedIn,
  saveAddress,
  data,
  address,
  cartCount,
}) {
  return (
    <>
      <Navbar
        isSignedIn={isSignedIn}
        saveAddress={saveAddress}
        data={data}
        address={address}
        cartCount={cartCount}
      />
      <LowerNavbar isSignedIn={isSignedIn} data={data} />
      {children}
    </>
  );
}

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [saveAddress, setSaveAddress] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [data, setData] = useState({});
  const [address, setAddress] = useState([]);
  const handleSignIn = (data) => {
    setIsSignedIn(true);
    setData(data);
  };
  const handleSaveAddress = (address) => {
    setSaveAddress(true);
    setAddress(address);
  };
  const updateCartCount = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const apiUrl = "http://localhost:5000/api/cart";
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "auth-token": token,
          },
        });

        if (response.ok) {
          const cartData = await response.json();
          const totalProductCount = calculateTotalProductCount(cartData.items);
          setCartCount(totalProductCount);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
  };
  const calculateTotalProductCount = (cartItems) => {
    return cartItems.slice(1).reduce((total, item) => total + item.quantity, 0);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (token && userData) {
      setIsSignedIn(true);
      setData(userData);
    }
  }, []);
  useEffect(() => {
    if (isSignedIn) {
      updateCartCount();
    }
  }, [isSignedIn, data]);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <DefaultLayout
                isSignedIn={isSignedIn}
                saveAddress={saveAddress}
                data={data}
                address={address}
                cartCount={cartCount}
              >
                <HomePage />
              </DefaultLayout>
            }
          />
          <Route path="/user/register" element={<Register />} />
          <Route
            path="/user/signin"
            element={<SignIn onSignIn={handleSignIn} setData={setData} />}
          />
          <Route
            path="/user/save-address"
            element={
              <DefaultLayout
                isSignedIn={isSignedIn}
                saveAddress={saveAddress}
                data={data}
                address={address}
                cartCount={cartCount}
              >
                <SaveAddress onsaveAddress={handleSaveAddress} />
              </DefaultLayout>
            }
          />
          <Route
            path="/search-results"
            element={
              <DefaultLayout
                isSignedIn={isSignedIn}
                saveAddress={saveAddress}
                data={data}
                address={address}
                cartCount={cartCount}
              >
                <SearchResults />
              </DefaultLayout>
            }
          />
          <Route
            path="/product/:productId"
            element={
              <DefaultLayout
                isSignedIn={isSignedIn}
                saveAddress={saveAddress}
                data={data}
                address={address}
                cartCount={cartCount}
              >
                <SingleProduct updateCartCount={updateCartCount} />
              </DefaultLayout>
            }
          />
          <Route
            path="/user/account/:userId"
            element={
              <DefaultLayout
                isSignedIn={isSignedIn}
                saveAddress={saveAddress}
                data={data}
                address={address}
                cartCount={cartCount}
              >
                <Account data={data} setData={setData} />
              </DefaultLayout>
            }
          />
          <Route
            path="/user/cart"
            element={
              <DefaultLayout
                isSignedIn={isSignedIn}
                saveAddress={saveAddress}
                data={data}
                address={address}
                cartCount={cartCount}
              >
                <Cart updateCartCount={updateCartCount} />
              </DefaultLayout>
            }
          />
          <Route path="/seller/register" element={<SellerRegister />} />
          <Route
            path="/seller/signin"
            element={<SellerSignIn onSignIn={handleSignIn} setData={setData} />}
          />
          <Route path="/seller/" element={<SellerHomePage data={data} />} />
          <Route path="/seller/add-product" element={<AddProduct />} />
          <Route path="/seller/products" element={<ProductList />} />
          <Route
            path="/seller/update-product/:productId"
            element={<UpdateProduct />}
          />
          <Route
            path="/seller/account/:sellerId"
            element={<SellerAccount data={data} setData={setData} />}
          />
          <Route
            path="/seller/save-address"
            element={<SellerSaveAddress onsaveAddress={handleSaveAddress} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
