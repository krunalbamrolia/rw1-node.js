const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5511;

//path for css file connect 
app.use(express.static(__dirname + '/public'));

// Set up view engine and middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const furni = require('./routes/routes');

// Use routes
app.use('/', furni);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
