import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from "axios";
import { useSelector } from "react-redux";

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#000',
    },
  },
});

const CreateTask = () => {
  const [description, setDescription] = useState("");
  const [volunteersNeeded, setVolunteersNeeded] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  const token = useSelector((state) => state.user.token)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // const token = localStorage.getItem("token"); 
      const response = await axios.post(
        "http://localhost:3000/task/createTask",
        {
          description,
          volunteersNeeded,
          startLocation,
          endLocation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Task created:", response.data);
      // Optionally clear the form or handle success
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <Box>
      <Typography
        variant="h4"
        gutterBottom
       
      >
        Create New Task
      </Typography>
        <TextField
          label="Task Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Volunteers Needed"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={volunteersNeeded}
          onChange={(e) => setVolunteersNeeded(e.target.value)}
        />
        <TextField
          label="Start Location"
          variant="outlined"
          fullWidth
          margin="normal"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
        />
        <TextField
          label="End Location"
          variant="outlined"
          fullWidth
          margin="normal"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
        />
        <Button type="submit" variant="contained" onClick={handleSubmit}sx={{ backgroundColor: "#000", color: "#fff", mt: 2, ":hover": { backgroundColor: "#333" } }}>
          Create Task
        </Button>
    </Box>
    </ThemeProvider>
  );
};

export default CreateTask;
