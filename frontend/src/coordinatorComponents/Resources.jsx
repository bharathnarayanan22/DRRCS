import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography, Box } from "@mui/material";
import axios from '../helpers/auth-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Resources = () => {
  const [resources, setResources] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editResource, setEditResource] = useState(null);


  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/resource/getResource",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setResources(response.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/resource/deleteResource/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(`Resource Deletion Successfull` );
      setResources(resources.filter((resource) => resource._id !== id));
    } catch (error) {
      toast.error(`Resource Deletion Failed` );
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (resource) => {
    setIsEditing(true);
    setEditResource(resource);
  };

  const handleUpdateResource = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/resource/updateResource/${editResource._id}`,
        editResource,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`Resource Update Successfull` );

      setResources(resources.map((resource) =>
        resource._id === editResource._id ? response.data : resource
      ));

      setIsEditing(false);
      setEditResource(null);
    } catch (error) {
      toast.error(`Resource Update Failed` );
      console.error('Error updating resource:', error);
    }
  };

  const handleDialogClose = () => {
    setIsEditing(false);
    setEditResource(null);
  };


  return (
    <Box>
      <ToastContainer/>
      <Typography
        variant="h4"
        gutterBottom
        style={{ color: "#444", fontWeight: "bold" }}
        sx={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight: 900, color: "#444" }}
      >
        Resources Overview
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="resources table">
          <TableHead>
            <TableRow
              sx={{ backgroundColor: "#444", "& th": { color: "#fff" } }}
            >
              <TableCell>S.NO</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Donor Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources.map((resource, index) => (
              <TableRow key={resource._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{resource.type}</TableCell>
                <TableCell>{resource.quantity}</TableCell>
                <TableCell>
                  <a
                    style={{ color: "black" }}
                    href={`https://www.google.com/maps/@?api=1&map_action=map&center=${resource.location.lat},${resource.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/src/assets/earth1.png" alt="Map" />
                  </a>
                </TableCell>
                <TableCell>{resource.donor.name}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEdit(resource)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(resource._id)}
                  >
                    <DeleteIcon sx={{
                      "&:hover": {
                        color: "red",
                      }, fontSize: 30
                    }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isEditing} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Resource</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Resource Type"
            value={editResource?.type || ''}
            onChange={(e) => setEditResource({ ...editResource, type: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Quantity"
            type="number"
            value={editResource?.quantity || ''}
            onChange={(e) => setEditResource({ ...editResource, quantity: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Location"
            value={editResource?.location || ''}
            onChange={(e) => setEditResource({ ...editResource, location: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateResource} variant="contained" color="primary">
            Update Resource
          </Button>
          <Button onClick={handleDialogClose} variant="contained" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default Resources;
