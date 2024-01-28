const Movie = require('../models/Movie');


exports.create = (movieData) => Movie.create(movieData);

exports.getAll = () => Movie.find();

exports.getById = (movieId) => Movie.findById(movieId);

exports.attach = async (movieId, castId) => Movie.findByIdAndUpdate(movieId, {$push: {casts: castId}});


exports.search = async (title, genre, year) => {
    let result = await Movie.find().lean();

    if(title){
        result = result.filter(m => m.title.toLowerCase().includes(title.toLowerCase()));
    }
    if(genre){
        result = result.filter(m => m.genre.toLowerCase() === genre.toLowerCase());
    }
    if(year){
        result = result.filter(m => m.year === year);
    }

    return result;
}