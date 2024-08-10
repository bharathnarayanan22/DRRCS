import React, { useState } from "react";

import { GoogleMap, Marker, Autocomplete, useLoadScript } from "@react-google-maps/api";


const libraries = ["places"];
const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const center = {
  lat: -34.397,
  lng: 150.644,
};

const MapPicker = ({ setLocation, location }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDje3-miRUE29e3KvbrtasBpKROn_VxJ7o",
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}
      onClick={(e) => {
        setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      }}
    >
      {location && <Marker position={location} />}
    </GoogleMap>
  );
};

export default MapPicker;
