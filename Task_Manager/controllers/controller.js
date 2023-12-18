// const Task = require('../models/model');
// const User = require('../models/userModel.js');  // Make sure to use the correct file path
const { Task, User } = require('../models/model');


//dashboard
const dashboard = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.session.userId }).exec();
    res.render('dashboard', { username: req.session.username, tasks });
  } catch (err) {
    console.error(err);
    res.send('Error fetching tasks');
  }
};

//login-page
const loginPage = (req, res) => {
  res.render('login', { message: '' });
};

//login
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      req.session.userId = user.id;
      req.session.username = user.username;
      res.redirect('/');
    } else {
      res.render('login', { message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.render('login', { message: 'Error logging in' });
  }
};

//register page
 const registerPage = (req, res) => {
  res.render('register', { message: '' });
};

//register
const register = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    res.render('register', { message: 'Passwords do not match' });
    return;
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.render('register', { message: 'Username already exists' });
      return;
    }
    const newUser = new User({
      username,
      password
    });
    await newUser.save();
    req.session.userId = newUser.id;
    req.session.username = newUser.username;
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('register', { message: 'Error creating user' });
  }
};

//logout
const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
};

// ---------Task controllers---------------------------

//create-task
const createtask = (req, res) => {
  res.render('create-task', { message: '' }); // Pass an empty message initially
};

//add-task
const addTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  // Validate input (you might want to add more validation)
  if (!title || !description || !dueDate || !status) {
    return res.render('create-task', { message: 'Please fill in all fields' });
  }

  // Create a new task
  const newTask = new Task({
    title,
    description,
    dueDate,
    status,
    user: req.session.userId
  });

  // Save the task to the database
  try {
    await newTask.save();
    req.session.lastSubmittedTaskId = newTask.id; 
    res.redirect('/'); 
  } catch (err) {
    console.error(err);
    res.render('/', { message: 'Error creating task' });
  }
};

//view
const viewTask = async (req, res) => {
  try {
    const singletask = await Task.findById(req.params.id);
    console.log(singletask);
    res.render('view-task', { singletask });
  } catch (err) {
    console.error(err);
    res.send('Error fetching task');
  }
};

//edit
const editTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findOne({ _id: taskId, user: req.session.userId }).exec();
    res.render('edit-task', { task });
  } catch (err) {
    console.error(err);
    res.send('Error fetching task');
  }
};
// update
const update = async (req, res) => {
  try {
    const { title, description, dueDate, status , id } = req.body;

    // Validate input (you might want to add more validation)
    if (!title || !description || !dueDate || !status) {
      return res.redirect(`/edit-task/${id}`);
    }

    await Task.updateOne({ _id: id, user: req.session.userId }, { title, description, dueDate, status });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send('Error updating task');
  }
};
//delete
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.deleteOne({ _id: taskId, user: req.session.userId }).exec();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send('Error deleting task');
  }
};

module.exports = {
  dashboard, loginPage, login, registerPage, register, logout, createtask, addTask, viewTask, editTask, update, deleteTask 
};