const express = require('express');
const router = express();
const controller = require('../controllers/controller');
const middleware = require('../middleware/middleware');

// users route
router.get('/', middleware, controller.dashboard);
router.get('/login', controller.loginPage);
router.post('/login', controller.login);
router.get('/register', controller.registerPage);
router.post('/register', controller.register);
router.get('/logout', controller.logout);

// Routes for task actions
router.get('/create-task', middleware, controller.createtask);
router.post('/add-task', middleware, controller.addTask);
router.get('/view-task/:id', middleware, controller.viewTask);
router.get('/edit-task/:id', middleware, controller.editTask);
router.post('/update-task', middleware, controller.update);
router.get('/delete-task/:id', middleware, controller.deleteTask);

module.exports = router;
