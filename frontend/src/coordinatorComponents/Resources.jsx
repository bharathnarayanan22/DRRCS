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
import { Typography, Box, TextField, Button, Grid } from "@mui/material";
import axios from '../helpers/auth-config';


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
      setResources(resources.filter((resource) => resource._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (resource) => {
    setIsEditing(true);
    setEditResource(resource);
    console.log(resource)
  };

  const handleUpdateResource = async (e) => {
    e.preventDefault();

    try {
      console.log(editResource._id)
      const response = await axios.put(
        `http://localhost:3000/resource/updateResource/${editResource._id}`,
        editResource,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setResources(resources.map((resource) =>
        resource._id === editResource._id ? response.data : resource
      ));

      setIsEditing(false);
      setEditResource(null);
    } catch (error) {
      console.error('Error updating resource:', error);
    }
  };



  return (
    <Box>
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
              <TableCell>ID</TableCell>
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

      {isEditing && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Resource Type"
              value={editResource.type}
              onChange={(e) => setEditResource({ ...editResource, type: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              value={editResource.quantity}
              onChange={(e) => setEditResource({ ...editResource, quantity: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              value={editResource.location}
              onChange={(e) => setEditResource({ ...editResource, location: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" onClick={handleUpdateResource}>
              Update Resource
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      )}

    </Box>
  );
};

export default Resources;
