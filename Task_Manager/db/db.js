const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/task_manager', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

module.exports = db;


