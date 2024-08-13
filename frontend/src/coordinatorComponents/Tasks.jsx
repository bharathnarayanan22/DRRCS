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
import { Typography, Box, TextField, Button, Modal, Grid } from "@mui/material";
import axios from '../helpers/auth-config';
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            toast.success(`Task Deletion Successfull` );
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            toast.error(`Task Deletion Failed` );
            console.error("Error deleting task:", error);
        }
    };

    const handleEdit = (task) => {
        setIsEditing(true);
        setEditTask(task);
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:3000/task/updateTask/${editTask._id}`,
                editTask,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setTasks(tasks.map((task) =>
                task._id === editTask._id ? response.data : task
            ));
            toast.success(`Task Updation Successfull` );

            setIsEditing(false);
            setEditTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
            toast.error(`Task Updation Failed` );
        }
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    return (
        <Box>
            <ToastContainer/>
            <Typography
                variant="h4"
                gutterBottom
                sx={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight:900, color:"#444" }}
            >
                Tasks Overview
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="tasks table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#444", "& th": { color: "#fff" } }}>
                            <TableCell>S.NO</TableCell>
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

            {/* Modal for Editing Task */}
            <Modal
                open={isEditing}
                onClose={() => setIsEditing(false)}
                aria-labelledby="edit-task-modal"
                aria-describedby="modal-to-edit-task"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 1,
                    }}
                >
                    <Typography id="edit-task-modal" variant="h6" component="h2">
                        Edit Task
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                value={editTask?.description || ''}
                                onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Volunteers Needed"
                                type="number"
                                value={editTask?.volunteersNeeded || ''}
                                onChange={(e) => setEditTask({ ...editTask, volunteersNeeded: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="contained" color="primary" onClick={handleUpdateTask}>
                                Update Task
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Box>
    );
};

export default Tasks;
