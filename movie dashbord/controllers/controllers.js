const movieModel = require('../models/movieModel')
const fs = require('fs')

// defult route
exports.defaultRoute = async (req,res) =>{ 
  try {
    let movies = await movieModel.find();
    res.render("index", { movies });
  } 
  catch (err) {
    console.log(err);
  }
}

// addmovie route
exports.addMovie = (req,res) => {
  let addSingleMovie = new movieModel({
    moviename: req.body.moviename,
    languages: req.body.languages,
    description: req.body.description,
    types: req.body.types,
    rate: req.body.rate,
    banner: req.file.path
  });
  addSingleMovie.save()
  res.redirect('/')
}

//edit route
exports.editMovie = async (req,res) => {
  try {
    let editSingaleMovie = await movieModel.findById(req.params.id);
    res.render("edit", { editSingaleMovie });
  } 
  catch (err) {
    console.log(err);
  }
}

// update route
exports.updateMovie = async (req,res) => {
  const { id, moviename, languages, description, types, rate, banner } = req.body;
  const { path } = req.file;
  try {
    let oldMovie = await movieModel.findById(id);
    fs.unlink(oldMovie.banner, () => {
      console.log("success remove");
    });
    let updatedSingleMovie = await movieModel.findByIdAndUpdate(id, { moviename, languages, description, types, rate,
      banner: path,
    });
    res.redirect("/");
  } 
  catch (err) {
    console.log(err);
  }
}
        
// delete route
exports.deleteMovie = async (req,res) => {
  try {
    let deleteSingleMovie = await movieModel.findByIdAndDelete(req.params.id);
    fs.unlink(deleteSingleMovie.banner, () => {
      console.log("success remove");
    });
    res.redirect("/");
  } 
  catch (err) {
    console.log(err);
  }
}


module.exports = exports;
