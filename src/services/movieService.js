const Movie = require('../models/Movie');

const movies = [{
    _id: 0,
    title: 'TestTitle',
    genre: 'TestGenre',
    director: 'TestDirector',
    year: '2024',
    poster: 'img/home-alone.jpeg',
    rating: '3',
    description: 'TestDescription'
  }];

exports.create = async (movieData) => {

    const result = await Movie.create(movieData);

    return result;
}

exports.getAll = () => {
    return movies.slice();
}

exports.getById = (movieId) => {
    return movies.find(m => m._id === Number(movieId));
}

exports.search = (title, genre, year) => {
    let result = movies.slice();

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