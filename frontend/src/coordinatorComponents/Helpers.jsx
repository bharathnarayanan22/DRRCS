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
import { Typography, Box } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const Helpers = () => {
  const [helpers, setHelpers] = useState({ volunteers: [], donors: [] });
  const token = useSelector((state) => state.user.token)

  useEffect(() => {
    const fetchHelpers = async () => {
      try {
        // const token = localStorage.getItem("token"); 

        const response = await axios.get("http://localhost:3000/users/VolunteersAndDonors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response.data);

        if (response.data) {
          setHelpers(response.data);
        } else {
          console.error("API response is invalid:", response.data);
        }
      } catch (error) {
        console.error("Error fetching helpers:", error);
      }
    };

    fetchHelpers();
  }, []);

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        style={{ color: "#000", fontWeight: "bold" }}
      >
        Helpers Overview
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="helpers table">
          <TableHead>
            <TableRow
              sx={{ backgroundColor: "#000", "& th": { color: "#fff" } }}
            >
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {helpers.volunteers.map((volunteer, index) => (
              <TableRow key={volunteer._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{volunteer.name}</TableCell>
                <TableCell>Volunteer</TableCell>
                <TableCell>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {helpers.donors.map((donor, index) => (
              <TableRow key={donor._id}>
                <TableCell>{helpers.volunteers.length + index + 1}</TableCell>
                <TableCell>{donor.name}</TableCell>
                <TableCell>Donor</TableCell>
                <TableCell>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Helpers;
