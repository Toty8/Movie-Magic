const movies = [{
    _id: 0,
    title: 'TestTitle',
    genre: 'TestGenre',
    director: 'TestDirector',
    date: '2024',
    poster: 'img/home-alone.jpeg',
    rating: '3',
    description: 'TestDescription'
  }];

exports.create = (movieData) => {
    movieData._id = movies[movies.length - 1]._id + 1;
    movies.push(movieData);
}

exports.getAll = () => {
    return movies.slice();
}

exports.getById = (movieId) => {
    return movies.find(m => m._id === Number(movieId));
}