import React, { useEffect, useState } from "react";
import { Box, Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import MapPicker from "../components/MapPicker";

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const token = useSelector((state) => state.user.token);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:3000/request/getRequests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(response.data.filter((request) => request.status === "pending"));
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    fetchRequests();
  }, [token]);

  const handleRespondClick = (request) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRequest(null);
    setMessage("");
  };

  const handleSubmitResponse = async () => {

    try {
      const response = await axios.post(
        `http://localhost:3000/request/respondToRequest/${selectedRequest._id}`,
        {
          type: selectedRequest.type,
          quantity: selectedRequest.quantity,
          location,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response submitted:", response.data);
      handleClose();
    } catch (err) {
      console.error("Error submitting response:", err);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        View Requests
      </Typography>
      {requests.map((request) => (
        <Box key={request._id} mb={3} p={2} border={1} borderRadius={4}>
          <Typography variant="h6">{request.type}</Typography>
          <Typography>Quantity: {request.quantity}</Typography>
          <Typography>
            Location: ({request.location.lat}, {request.location.lng})
          </Typography>
          <Typography>Status: {request.status}</Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => handleRespondClick(request)}
          >
            Respond
          </Button>
        </Box>
      ))}
      <Dialog open={open} onClose={handleClose} PaperProps={{
    style: { width: 800 }, // Set a custom width of 800px
  }} >
        <DialogTitle>Respond to Request</DialogTitle>
        <DialogContent>
          <Typography>Type: {selectedRequest?.type}</Typography>
          <Typography>Quantity: {selectedRequest?.quantity}</Typography>
          <Box mb={2}>
          <Button
            variant="outlined"
            onClick={handleGetLocation}
            sx={{
              backgroundColor: "#444",
              color: "#fff",
              ":hover": { backgroundColor: "#333" },
            }}
          >
            Get My Location
          </Button>
        </Box>
        <MapPicker setLocation={setLocation} location={location} />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitResponse}
            variant="contained"
            color="primary"
          >
            Submit Response
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewRequests;