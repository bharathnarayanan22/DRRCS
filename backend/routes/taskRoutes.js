const express = require('express');
const Router = express.Router();
const auth = require('../middlewares/auth');
const { createTask, getTasks, updateTask, updateTaskStatus, acceptTask, declineTask, deleteTask, createTaskFromRequest,getAcceptedTasks, upload, uploadPhotos } = require('../controllers/taskController');

Router.post('/createTask', auth(['coordinator']), createTask);
Router.get('/getTask', getTasks);
Router.put('/acceptTask/:id', auth(['volunteer']), acceptTask)
Router.put('/updateTask/:id', auth(['volunteer', 'coordinator']), updateTask);
Router.put('/updateTaskStatus/:id', auth(['volunteer']), updateTaskStatus);
Router.delete('/deleteTask/:id', auth(['coordinator']), deleteTask);
Router.put('/declineTask/:id', auth(['volunteer']), declineTask);
Router.post('/tasks/from-request/:requestId/response/:responseId', auth(['coordinator']), createTaskFromRequest);
Router.get('/acceptedTasks',auth(['volunteer']),getAcceptedTasks);
Router.post('/uploadPhotos', upload.array('photos'), uploadPhotos);

module.exports = Router;