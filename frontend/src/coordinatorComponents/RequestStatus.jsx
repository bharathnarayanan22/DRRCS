import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Typography, Box, Modal, Button, TextField } from "@mui/material";
import axios from "axios";

const RequestStatus = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responses, setResponses] = useState([]);
  const [open, setOpen] = useState(false);
  const [newResource, setNewResource] = useState({ type: "", quantity: "", location: "" });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:3000/request/getRequests");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleViewResponses = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/request/${id}/responses`);
      setResponses(response.data);
      setSelectedRequest(id); 
      setOpen(true);
    } catch (error) {
      console.error("Error fetching request responses:", error);
    }
  };

  const handleClose = () => setOpen(false);

  const handleAddResource = async (response) => {
    try {
      const token = localStorage.getItem("token");
      const resource = {
        type: response.resource?.type, 
        quantity: response.resource?.quantity, 
        location: response.resource?.location, 
      };
      console.log(response)
  
      if (!resource.type || !resource.quantity || !resource.location) {
        console.error("Resource data is incomplete.");
        return;
      }
  
      await axios.post("http://localhost:3000/resource/createResource", resource, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setNewResource({ type: "", quantity: "", location: "" }); 
    } catch (error) {
      console.error("Error creating resource:", error);
    }
  };
  

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#000", fontWeight: "bold" }}
      >
        Request Status
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="requests table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#000", "& th": { color: "#fff" } }}>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Responses</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request, index) => (
              <TableRow key={request._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{request.type}</TableCell>
                <TableCell>{request.quantity}</TableCell>
                <TableCell>{request.location}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  <IconButton aria-label="view responses" onClick={() => handleViewResponses(request._id)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ backgroundColor: "#fff", padding: 3, borderRadius: 2, width: '80%', maxHeight: '80%', overflow: 'auto' }}>
          <Typography variant="h6" gutterBottom>
            Responses for Request ID: {selectedRequest}
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="responses table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#000", "& th": { color: "#fff" } }}>
                  <TableCell>Response ID</TableCell>
                  <TableCell>Donor</TableCell>
                  <TableCell>Resource</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {responses.map((response, index) => (
                  <TableRow key={response._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{response.donor?.name || "N/A"}</TableCell>
                    <TableCell>{response.resource?.type || "N/A"}</TableCell>
                    <TableCell>{response.message}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleAddResource(response)}
                        variant="contained"
                        color="primary"
                      >
                        Add Resource
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button onClick={handleClose} variant="outlined" color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default RequestStatus;
