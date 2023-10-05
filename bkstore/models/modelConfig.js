const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    author: String,
    page: Number
})

// const storedata = mongoose.model('store', taskSchema);
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;



