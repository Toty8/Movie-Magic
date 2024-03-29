const Movie = require('../models/Movie');


exports.create = (movieData) => Movie.create(movieData);

exports.getAll = () => Movie.find();

exports.getById = (movieId) => Movie.findById(movieId).populate('casts');

exports.attach = async (movieId, castId) => Movie.findByIdAndUpdate(movieId, {$push: {casts: castId}});


exports.search = (title, genre, year) => {
    let query = {};

    if(title){
        query.title = new RegExp(title, 'i');
    }
    if(genre){
        query.genre = genre.toLowerCase();
    }
    if(year){
        query.year = year;
    }
 
    return Movie.find(query);
}

exports.delete = (movieId) => Movie.findByIdAndDelete(movieId); 

exports.edit = (movieId, movieData) => Movie.findByIdAndUpdate(movieId, movieData);