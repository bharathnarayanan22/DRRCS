import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Typography, Box } from "@mui/material";
import axios from "../helpers/auth-config";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BecomeACo = () => {
  const [applications, setApplications] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/role-change-requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, [token]);

  const handleUpdateStatus = async (requestId, status) => {
    // Optimistically update the local state before making the API call
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app._id === requestId ? { ...app, applicationStatus: status } : app
      )
    );

    try {
      // Send the status update to the backend
      await axios.post(
        "http://localhost:3000/change-role/handle-request",
        {
          requestId,
          action: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show a success toast
      await toast.success(
        `Request ${
          status === "approved" ? "approved" : "rejected"
        } successfully!`
      );
    } catch (error) {
      console.error(`Error updating status to ${status}:`, error);

      // Revert state if the API call fails
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app._id === requestId ? { ...app, applicationStatus: "pending" } : app
        )
      );

      // Show an error toast
      toast.error(
        `Failed to ${
          status === "approved" ? "approve" : "reject"
        } request. Please try again.`
      );
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontFamily: "Playfair Display",
          fontStyle: "italic",
          fontWeight: 900,
          color: "#444",
        }}
      >
        Become A Co Applications
      </Typography>
      {applications.length === 0 ? (
        <Typography>No applications found. Please check back later.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="role change applications table">
            <TableHead>
              <TableRow
                sx={{ backgroundColor: "#444", "& th": { color: "#fff" } }}
              >
                <TableCell>Name</TableCell>
                <TableCell>Current Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application._id}>
                  <TableCell>{application.user.name}</TableCell>
                  <TableCell>{application.currentRole}</TableCell>
                  <TableCell>
                    {application.status === "pending" ? (
                      <>
                        <IconButton
                          aria-label="accept"
                          onClick={() =>
                            handleUpdateStatus(application._id, "approved")
                          }
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          aria-label="reject"
                          onClick={() =>
                            handleUpdateStatus(application._id, "rejected")
                          }
                        >
                          <ClearIcon />
                        </IconButton>
                      </>
                    ) : application.applicationStatus === "approved" ? (
                      <Typography color="green">Approved</Typography>
                    ) : (
                      <Typography color="red">Rejected</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <ToastContainer />
    </Box>
  );
};

export default BecomeACo;
