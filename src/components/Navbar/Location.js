import React from "react";
import Icon from "@mdi/react";
import { mdiMapMarkerOutline } from "@mdi/js";
import { Link } from "react-router-dom";
import "./Location.css";

function Location({ isSignedIn, data, saveAddress, address }) {
  const savedAddressFromLocalStorage = JSON.parse(
    localStorage.getItem("userData")
  )?.entity?.address;
  return (
    <Link to="/user/save-address" className="link">
      <div className="location">
        <Icon className="location_pin" path={mdiMapMarkerOutline} size={1} />
        <div className="location_details">
          <div className="location_hint">
            {isSignedIn
              ? `Deliver to ${data.entity.name.split(" ", 1)}`
              : "Hello"}
          </div>
          <div className="location_title">
            {saveAddress
              ? `${address.city} ${address.postalCode}`
              : isSignedIn && savedAddressFromLocalStorage
              ? `${savedAddressFromLocalStorage.city} ${savedAddressFromLocalStorage.postalCode}`
              : "Select your address"}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Location;
