import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from '../helpers/auth-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestStatus = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responses, setResponses] = useState([]);
  const [openResponsesModal, setOpenResponsesModal] = useState(false);
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
  const [newResource, setNewResource] = useState({
    type: "",
    quantity: "",
    location: "",
  });
  const [taskData, setTaskData] = useState({
    description: "",
    volunteersNeeded: "",
    startLocation: "",
    endLocation: "",
  });
  const [actionCompleted, setActionCompleted] = useState({});

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/request/getRequests"
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleViewResponses = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/request/${id}/responses`
      );
      setResponses(response.data);
      setSelectedRequest(id);
      setOpenResponsesModal(true);
    } catch (error) {
      console.error("Error fetching request responses:", error);
    }
  };

  const handleCloseResponsesModal = () => setOpenResponsesModal(false);

  const handleAddResource = async (response) => {
    try {
      const token = localStorage.getItem("token");
      const resource = {
        type: response.resource?.type,
        quantity: response.resource?.quantity,
        location: response.resource?.location,
        id : selectedRequest
      };

      if (!resource.type || !resource.quantity || !resource.location) {
        console.error("Resource data is incomplete.");
        return;
      }

      await axios.post(
        "http://localhost:3000/resource/createResource",
        resource,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Resource created successfully!");

      setActionCompleted(prev => ({ ...prev, [response._id]: true }));
      setNewResource({ type: "", quantity: "", location: "" });
    } catch (error) {
      console.error("Error creating resource:", error); 
      toast.error("Error creating resource.");
    }
  };

  const handleOpenCreateTaskModal = (response, request) => {
    setTaskData({
      type: "",
      volunteersNeeded: "",
      startLocation: response.resource?.location || "",
      endLocation: request.location || "",
    });
    setOpenCreateTaskModal(true);
  };

  const handleCloseCreateTaskModal = () => {
    setOpenCreateTaskModal(false);
  };

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/task/createTask", taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Task created successfully!");
      console.log("Task created:", response.data);

      setActionCompleted(prev => ({ ...prev, [selectedRequest]: true }));
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Error creating task.");
    }
    handleCloseCreateTaskModal(); 
  };

  return (
    <Box>
      <ToastContainer />
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight: 900, color: "#444" }}
      >
        Request Status
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="requests table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#444", "& th": { color: "#fff" } }}>
              <TableCell>S.NO</TableCell>
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
                <TableCell>
                  <a
                    style={{ color: "black" }}
                    href={`https://www.google.com/maps/@?api=1&map_action=map&center=${request.location.lat},${request.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/src/assets/earth1.png" alt="Map" />
                  </a>
                </TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="view responses"
                    onClick={() => handleViewResponses(request._id)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={openResponsesModal}
        onClose={handleCloseResponsesModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: 3,
            borderRadius: 2,
            width: "80%",
            maxHeight: "80%",
            overflow: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Responses
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="responses table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#444", "& th": { color: "#fff" } }}>
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
                        disabled={actionCompleted[response._id]} 
                      >
                        Add Resource
                      </Button>
                      <Button
                        onClick={() =>
                          handleOpenCreateTaskModal(
                            response,
                            requests.find((r) => r._id === selectedRequest)
                          )
                        }
                        variant="contained"
                        color="secondary"
                        sx={{ ml: 1 }}
                        disabled={actionCompleted[selectedRequest]} 
                      >
                        Create Task
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            onClick={handleCloseResponsesModal}
            variant="outlined"
            color="primary"
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openCreateTaskModal}
        onClose={handleCloseCreateTaskModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: 3,
            borderRadius: 2,
            width: "50%",
            maxHeight: "80%",
            overflow: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create Task for Response ID: {selectedRequest}
          </Typography>
          <form onSubmit={handleSubmitTask}>
            <TextField
              label="Description"
              name="description"
              value={taskData.description}
              onChange={handleTaskInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Volunteers Needed"
              name="volunteersNeeded"
              value={taskData.volunteersNeeded}
              onChange={handleTaskInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Start Location"
              name="startLocation"
              value={taskData.startLocation}
              onChange={handleTaskInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="End Location"
              name="endLocation"
              value={taskData.endLocation}
              onChange={handleTaskInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit Task
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default RequestStatus;
