// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const PORT = 5111;

// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));

// let tasks = [];

// app.get('/', (req, res) => {
//     res.render('todolist', { tasks });
// });

// //------------- status code -------------------
// app.get('/update-status/:id', (req, res) => {
//     const id = req.params.id;
//     const task = tasks.find(task => task._id === id);
//     if (task) {
//         res.render('status', { task });
//     } else {
//         res.redirect('/');
//     }
// });

// //------------ insert data code ------------------
// app.post('/', (req, res) => {
//     const { taskName, taskDescription } = req.body;

//     tasks.push({ _id: Date.now().toString(), 
//         name: taskName, 
//         description: taskDescription, 
//         isDone: false });
 
//     res.redirect('/');
// });

// //---------- status change code -----------------
// app.post('/toggle-status/:id', (req, res) => {
//     const id = req.params.id;
//     const newStatus = req.body.status === 'done';
//     const task = tasks.find(task => task._id === id);
    
//     if (task) {
//         task.isDone = newStatus;
//     }  
//     res.redirect('/');
// });

// //--------------- control code ----------------
// app.get('/all-tasks', (req, res) => {
//     res.render('alltasks', { tasks });
// });

// //------------- delete code --------------
// app.get('/delete-task/:id', (req, res) => {
//     const id = req.params.id;
//     tasks = tasks.filter(task => task._id !== id);
//     res.redirect('/all-tasks');
// });

// //---------- update code ------------------
// app.get('/edit-data/:id', (req, res) => {
//     const id = req.params.id;
//     const task = tasks.find(task => task._id === id);

//     if (task) {
//         res.render('edit-data', { task });
//     } else {
//         res.redirect('/');
//     }
// });

// // ----------- Update Task Data ----------
// app.post('/update-data/:id', (req, res) => {
//     const id = req.params.id;
//     const task = tasks.find(task => task._id === id);

//     if (task) {
//         task.name = req.body.taskName;
//         task.description = req.body.taskDescription;
//         res.redirect('/all-tasks');
//     } else {
//         res.redirect('/all-tasks');
//     }
// });


// //---------- listen port code ----------------------
// app.listen(PORT, () => {
//     console.log(`Server is running on port ........... ${PORT}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5111;

// Set up view engine and middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const routes = require('./routes/routes');

// Use routes
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
