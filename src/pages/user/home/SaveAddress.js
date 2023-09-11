import React, { useState } from "react";

function SaveAddress({ onsaveAddress }) {
  const [address, setAddress] = useState({
    addressline1: "",
    addressline2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const requestBody = {
      address: address,
    };
    fetch("http://localhost:5000/api/user/save-address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        onsaveAddress(data.address);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h2>Save Address</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="addressline1">Address Line 1:</label>
          <input
            type="text"
            id="addressline1"
            name="addressline1"
            value={address.addressline1}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="addressline2">Address Line 2:</label>
          <input
            type="text"
            id="addressline2"
            name="addressline2"
            value={address.addressline2}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={address.state}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={address.country}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={address.postalCode}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save Address</button>
      </form>
    </div>
  );
}

export default SaveAddress;
