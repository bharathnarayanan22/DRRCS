import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from '../helpers/auth-config';
import { useSelector } from "react-redux";
import MapPicker from "../components/MapPicker";

const theme = createTheme({
  palette: {
    primary: {
      main: '#444',
    },
    secondary: {
      main: '#444',
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
    console.log(startLocation, endLocation)
    
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
        sx={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight:900, color:"#444" }}
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
        {/* <TextField
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
        /> */}
        <Typography variant="h6" gutterBottom sx={{ color: "#444", fontWeight: "bold" }}>
          Start Location
        </Typography>
        <MapPicker setLocation={setStartLocation} location={startLocation} />
        <Typography variant="h6" gutterBottom sx={{ color: "#444", fontWeight: "bold", mt: 2 }}>
          End Location
        </Typography>
        <MapPicker setLocation={setEndLocation} location={endLocation} />
        <Button type="submit" variant="contained" onClick={handleSubmit}sx={{ backgroundColor: "#444", color: "#fff", mt: 2, ":hover": { backgroundColor: "#333" } }}>
          Create Task
        </Button>
    </Box>
    </ThemeProvider>
  );
};

export default CreateTask;
