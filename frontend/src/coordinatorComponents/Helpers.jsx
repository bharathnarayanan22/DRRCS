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
import {
  Typography,
  Box,
  Modal,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import axios from "../helpers/auth-config";
import { useSelector } from "react-redux";
import UserProfilePage from "./UserProfile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Helpers = () => {
  const [helpers, setHelpers] = useState({ volunteers: [], donors: [] });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchHelpers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/VolunteersAndDonors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/deleteUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHelpers((prevHelpers) => ({
        volunteers: prevHelpers.volunteers.filter((user) => user._id !== id),
        donors: prevHelpers.donors.filter((user) => user._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleOpenProfile = (userId) => {
    setSelectedUserId(userId);
    setModalOpen(true);
  };

  const handleCloseProfile = () => {
    setSelectedUserId(null);
    setModalOpen(false);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        style={{ color: "#444", fontWeight: "bold" }}
        sx={{
          fontFamily: "Playfair Display",
          fontStyle: "italic",
          fontWeight: 900,
        }}
      >
        Helpers Overview
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="helpers table">
          <TableHead>
            <TableRow
              sx={{ backgroundColor: "#444", "& th": { color: "#fff" } }}
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
                  <IconButton
                    aria-label="view profile"
                    onClick={() => handleOpenProfile(volunteer._id)}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon
                      sx={{
                        "&:hover": {
                          color: "red",
                        },
                        fontSize: 30,
                      }}
                      onClick={() => handleDelete(volunteer._id)}
                    />
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
                  <IconButton
                    aria-label="view profile"
                    onClick={() => handleOpenProfile(donor._id)}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon
                      sx={{
                        "&:hover": {
                          color: "red",
                        },
                        fontSize: 30,
                      }}
                      onClick={() => handleDelete(donor._id)}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={modalOpen}
        onClose={handleCloseProfile}
        aria-labelledby="user-profile-modal"
        aria-describedby="user-profile-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedUserId && <UserProfilePage userId={selectedUserId} />}
          <Button
            onClick={handleCloseProfile}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Helpers;
