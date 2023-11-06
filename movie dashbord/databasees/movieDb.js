const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Movie_Lists').then(() => {

    console.log('Mongoose Connected...');

}).catch((err) => {

    console.log(err);

})

module.exports = mongoose