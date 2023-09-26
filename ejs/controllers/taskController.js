
let tasks = [];

// Get all tasks
exports.getTasks = (req, res) => {
    res.render('todolist', { tasks });
};

// Get status page
exports.getStatus = (req, res) => {
    const id = req.params.id;
    const task = tasks.find(task => task._id === id);
    if (task) {
        res.render('status', { task });
    } else {
        res.redirect('/');
    }
};

// Add a task
exports.addTask = (req, res) => {
    const { taskName, taskDescription } = req.body;

    tasks.push({ _id: Date.now().toString(), 
        name: taskName, 
        description: taskDescription, 
        isDone: false });
 
    res.redirect('/');
};

// Toggle task status
exports.toggleStatus = (req, res) => {
    const id = req.params.id;
    const newStatus = req.body.status === 'done';
    const task = tasks.find(task => task._id === id);
    
    if (task) {
        task.isDone = newStatus;
    }  
    res.redirect('/');
};

// Get all tasks (for control page)
exports.getAllTasks = (req, res) => {
    res.render('alltasks', { tasks });
};

// Delete a task
exports.deleteTask = (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter(task => task._id !== id);
    res.redirect('/all-tasks');
};

// Edit a task
exports.editTask = (req, res) => {
    const id = req.params.id;
    const task = tasks.find(task => task._id === id);

    if (task) {
        res.render('edit-data', { task });
    } else {
        res.redirect('/');
    }
};

// Update task data
exports.updateTask = (req, res) => {
    const id = req.params.id;
    const task = tasks.find(task => task._id === id);

    if (task) {
        task.name = req.body.taskName;
        task.description = req.body.taskDescription;
        res.redirect('/all-tasks');
    } else {
        res.redirect('/all-tasks');
    }
};

module.exports = exports;
