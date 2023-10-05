const express = require('express');
const router = express();
const tasksController = require('../controllers/taskController');

router.get('/', tasksController.getTasks);
router.get('/addData', tasksController.addPage);
router.post('/add', tasksController.addTask);
router.get('/viewSingle/:id', tasksController.viewSingle);
router.get('/delete/:id', tasksController.deleteTask);
router.get('/edit/:id', tasksController.editTask);
router.post('/update/:id', tasksController.updateTask);

module.exports = router;
