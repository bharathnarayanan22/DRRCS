import React, { useState, useEffect } from "react";
import axios from '../helpers/auth-config';
import {
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [acceptedTask, setAcceptedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/task/getTask", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const pendingTasks = response.data.filter(
          (task) => task.status === "pending"
        );
        setTasks(pendingTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleAccept = async (id) => {
    try {
      const { data: acceptedTasks } = await axios.get(
        "http://localhost:3000/task/acceptedTasks",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(acceptedTasks);

      // if (acceptedTasks.length > 0) {
      //   toast.error("You have already accepted a task. You cannot accept another one.");
      //   return;
      // }
      
      const hasActiveTasks = acceptedTasks.some(
        (task) => task.status === "pending" || task.status === "in-progress"
      );
      console.log(hasActiveTasks);

      if (hasActiveTasks) {
        toast.error(
          "You have active tasks. Complete them before accepting a new task."
        );
        return;
      }

      const response = await axios.put(
        `http://localhost:3000/task/acceptTask/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setAcceptedTask(response.data.task);
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, status: "accepted" } : task
        )
      );
      toast.success("You are assigned to the task!");
    } catch (error) {
      toast.error("Error accepting task.");
    }
  };
  //   const handleAccept = async (id) => {
  //     try {
  //         // Fetch all tasks assigned to the user
  //         const { data: tasks } = await axios.get("http://localhost:3000/task/acceptedTasks", {
  //             headers: {
  //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             },
  //         });

  //         // Check if any tasks are still pending or in-progress
  //         const hasActiveTasks = tasks.some(task => task.status === 'pending' || task.status === 'in-progress');

  //         if (hasActiveTasks) {
  //             toast.error("You have active tasks. Complete them before accepting a new task.");
  //             return;
  //         }

  //         // Accept the new task
  //         const response = await axios.put(`http://localhost:3000/task/acceptTask/${id}`, {}, {
  //             headers: {
  //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             },
  //         });

  //         setAcceptedTask(response.data.task);
  //         setTasks(tasks.map(task => task._id === id ? { ...task, status: 'accepted' } : task));
  //         toast.success("You are assigned to the task!");
  //     } catch (error) {
  //         toast.error("Error accepting task.");
  //     }
  // };

  const handleDecline = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/task/declineTask/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, status: "declined" } : task
        )
      );
    } catch (error) {
      console.error("Error declining task:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight:900, color:"#444" }}>
        Pending Tasks
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="tasks table">
          <TableHead>
            <TableRow
             sx={{ backgroundColor: "#444", "& th": { color: "#fff" } }}>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Volunteers Needed</TableCell>
              <TableCell>Start Location</TableCell>
              <TableCell>End Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task._id}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.volunteersNeeded}</TableCell>
                <TableCell><a
                    style={{ color: "black" }}
                    href={`https://www.google.com/maps/@?api=1&map_action=map&center=${task.startLocation.lat},${task.startLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/src/assets/earth1.png" alt="Map"/>
                  </a></TableCell>
                <TableCell><a
                    style={{ color: "black" }}
                    href={`https://www.google.com/maps/@?api=1&map_action=map&center=${task.endLocation.lat},${task.endLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/src/assets/earth1.png" alt="Map"/>
                  </a></TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleAccept(task._id)}
                    variant="contained"
                    color="primary"
                    disabled={acceptedTask !== null}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleDecline(task._id)}
                    variant="outlined"
                    color="secondary"
                    sx={{ ml: 2 }}
                  >
                    Decline
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </Box>
  );
};

export default Tasks;
