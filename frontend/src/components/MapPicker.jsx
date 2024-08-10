// import React, { useState } from "react";

// import { GoogleMap, Marker, Autocomplete, useLoadScript } from "@react-google-maps/api";


// const libraries = ["places"];
// const mapContainerStyle = {
//   height: "400px",
//   width: "100%",
// };

// const center = {
//   lat: -34.397,
//   lng: 150.644,
// };

// const MapPicker = ({ setLocation, location }) => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyAABewcZOiE6EcScQDTFsyWN4mtUquB2qk",
//     libraries,
//   });

//   if (!isLoaded) return <div>Loading...</div>;

//   return (
//     <GoogleMap
//       mapContainerStyle={mapContainerStyle}
//       zoom={10}
//       center={center}
//       onClick={(e) => {
//         setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
//       }}
//     >
//       {location && <Marker position={location} />}
//     </GoogleMap>
//   );
// };

// export default MapPicker;

import React, { useState, useEffect } from "react";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

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
    googleMapsApiKey: "AIzaSyAABewcZOiE6EcScQDTFsyWN4mtUquB2qk",
    libraries,
  });

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (location) {
      setUserLocation(location);
    }
  }, [location]);

  const handleMapClick = (e) => {
    setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserLocation({ lat: userLat, lng: userLng });
        setLocation({ lat: userLat, lng: userLng });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={userLocation || center}
      onClick={handleMapClick}
    >
      {userLocation && <Marker position={userLocation} />}
    </GoogleMap>
  );
};

export default MapPicker;
