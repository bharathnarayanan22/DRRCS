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

const Resources = () => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get("http://localhost:3000/resource/getResource", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setResources(response.data);
            } catch (error) {
                console.error("Error fetching resources:", error);
            }
        };

        fetchResources();
    }, []);

    return (
        <Box>
            <Typography
                variant="h4"
                gutterBottom
                style={{ color: "#000", fontWeight: "bold" }}
            >
                Resources Overview
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="resources table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#000", "& th": { color: "#fff" } }}>
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
                                <TableCell>{resource.location}</TableCell>
                                <TableCell>{resource.donor.name}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="edit" onClick={() => handleEdit(resource._id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => handleDelete(resource._id)}>
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

export default Resources;
