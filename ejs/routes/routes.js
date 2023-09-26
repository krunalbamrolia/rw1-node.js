const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Render the main To-Do list page
router.get('/', taskController.getTasks);

// Render the status page
router.get('/update-status/:id', taskController.getStatus);

// Add a new task
router.post('/', taskController.addTask);

// Toggle task status
router.post('/toggle-status/:id', taskController.toggleStatus);

// Render the page displaying all tasks
router.get('/all-tasks', taskController.getAllTasks);

// Delete a task
router.get('/delete-task/:id', taskController.deleteTask);

// Render the page for editing a task
router.get('/edit-data/:id', taskController.editTask);

// Update task data
router.post('/update-data/:id', taskController.updateTask);

module.exports = router;
