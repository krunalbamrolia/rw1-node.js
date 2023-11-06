const express = require('express');
const app = express();
const body_parser = require('body-parser');
const route = require('./routes/routes')
const mongoose = require('./databasees/movieDb')
const port = 5010;
const path = require('path')
const static_path = path.join(__dirname, './public/');
app.use(express.static(static_path));

app.set('view engine', 'ejs');
app.use(body_parser.urlencoded({extended: true}));


mongoose
app.use('/',route)
app.use('/views/uploads', express.static('./views/uploads'))


app.listen(port,() => {
    console.log(`Server running the port of ${port}`);
})