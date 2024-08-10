import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import MapPicker from "../components/MapPicker";

const CreateRequest = () => {
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState(null);
  const token = useSelector((state) => state.user.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const handleGetCurrentLocation = getLocation;
    
    try {
      const response = await axios.post(
        "http://localhost:3000/request/createRequest",
        {
          type,
          quantity,
          location: {
            lat: location.lat,
            lng: location.lng
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Request created:", response.data);
      // Optionally clear the form or handle success
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
      >
        Create New Request
      </Typography>
        <TextField
          label="Request Type"
          variant="outlined"
          fullWidth
          margin="normal"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <TextField
          label="Quantity"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Button variant="contained" onClick={getLocation} sx={{ backgroundColor: "#444", color: "#fff", mt: 2, ":hover": { backgroundColor: "#333" } }}>
  Get My Location
</Button>
        <MapPicker location={location} setLocation={setLocation} />
        <Button type="submit" variant="contained" onClick={handleSubmit} sx={{ backgroundColor: "#444", color: "#fff", mt: 2, ":hover": { backgroundColor: "#333" } }}>
          Create Request
        </Button>
    </Box>
  );
};

export default CreateRequest;