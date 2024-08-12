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
import { Typography, Box, Grid, TextField, Button } from "@mui/material";
import axios from '../helpers/auth-config';
import { useSelector } from "react-redux";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const token = useSelector((state) => state.user.token);
    const [isEditing, setIsEditing] = useState(false);
    const [editTask, setEditTask] = useState(null);

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

    const handleEdit = (task) => {
        setIsEditing(true);
        setEditTask(task);
        console.log(task)
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();

        try {
            console.log(editTask._id)
            const response = await axios.put(
                `http://localhost:3000/task/updateTask/${editTask._id}`,
                editTask,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            // setResources(resources.map((resource) =>
            //     resource._id === editResource._id ? response.data : resource
            //   ));
            setTasks(tasks.map((task) =>
                task._id === editTask._id ? response.data : task
            ));

            setIsEditing(false);
            setEditTask(null);
        } catch (error) {
            console.error('Error updating resource:', error);
        }
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
                            <TableCell>Volunteers Needed</TableCell>
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
                                <TableCell>{task.volunteersNeeded}</TableCell>
                                <TableCell>{task.status}</TableCell>
                                <TableCell>{formatDate(task.createdAt)}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="edit" onClick={() => handleEdit(task)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => handleDelete(task._id)}>
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
                            label="Description"
                            value={editTask.description}
                            onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Volunteers Needed"
                            type="number"
                            value={editTask.volunteersNeeded}
                            onChange={(e) => setEditTask({ ...editTask, volunteersNeeded: e.target.value })}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Location"
                            value={editTask.location}
                            onChange={(e) => setEditTask({ ...editTask, location: e.target.value })}
                        />
                    </Grid> */}
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit" onClick={handleUpdateTask}>
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

export default Tasks;
