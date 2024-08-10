import React, { useState } from "react";
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

const sampleApplications = [
  { _id: "1", name: "Alice Johnson", role: "Volunteer", applicationStatus: "pending" },
  { _id: "2", name: "Bob Smith", role: "donor", applicationStatus: "pending" },
  { _id: "3", name: "Charlie Brown", role: "donor", applicationStatus: "pending" },
];

const BecomeACo = () => {
  const [applications, setApplications] = useState(sampleApplications);

  const handleUpdateStatus = (userId, status) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app._id === userId ? { ...app, applicationStatus: status } : app
      )
    );
  };

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#000", fontWeight: "bold" }}
      >
        Become A Co Applications
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="volunteer applications table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#000", "& th": { color: "#fff" } }}>
              <TableCell>Name</TableCell>
              <TableCell>Current Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application._id}>
                <TableCell>{application.name}</TableCell>
                <TableCell>{application.role}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="accept"
                    onClick={() => handleUpdateStatus(application._id, 'accepted')}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    aria-label="reject"
                    onClick={() => handleUpdateStatus(application._id, 'rejected')}
                  >
                    <ClearIcon />
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

export default BecomeACo;
