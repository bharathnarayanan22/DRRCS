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

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const token = useSelector((state) => state.user.token)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("http://localhost:3000/task/getTask", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/task/deleteTask/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleEdit = (id) => {
        console.log(`Edit task with id: ${id}`);
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    return (
        <Box>
            <Typography
                variant="h4"
                gutterBottom
                style={{ color: "#444", fontWeight: "bold" }}
            >
                Tasks Overview
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="tasks table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#444", "& th": { color: "#fff" } }}>
                            <TableCell>ID</TableCell>
                            <TableCell>Task</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date Created</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task, index) => (
                            <TableRow key={task._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>{task.status}</TableCell>
                                <TableCell>{formatDate(task.createdAt)}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="edit" onClick={() => handleEdit(task._id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => handleDelete(task._id)}>
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

export default Tasks;
