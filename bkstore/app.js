const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5011;


const mongoose = require('./db/database'); 
const routes = require('./routes/routes');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

mongoose


// Use routes
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
