const Task = require('../models/modelConfig'); 
let data = []

// add task data
exports.addPage = ((req, res) =>{
    res.render('add');
}) 

// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.render('index', { tasks });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

 //Add a task
exports.addTask = async (req, res) => {
    const { title, author, page } = req.body;
    try {
        await Task.create({ title, author, page });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// view a task
exports.viewSingle = async (req, res) => {
    try {
    let singleBook = await Task.findById(req.params.id);
     console.log(singleBook);
      res.render('singleview', {singleBook});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Delete a task
exports.deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        await Task.findByIdAndDelete(id);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Edit a task
exports.editTask = async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findById(id);
        if (task) {
            res.render('edit', { task });
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Update task data
exports.updateTask = async (req, res) => {
    const id = req.params.id;
    const { title, author, page } = req.body;
    try {
        await Task.findByIdAndUpdate(id, { title, author, page });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = exports;
