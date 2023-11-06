const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    moviename: String,
    catagary: String,
    languages: Array,
    description: String,
    banner: String,
    rate: String,
    types: String
})

const contactModel = mongoose.model('movies', movieSchema);

module.exports = contactModel