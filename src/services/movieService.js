const movies = [{
    title: 'TestTitle',
    genre: 'TestGenre',
    director: 'TestDirector',
    date: '2024',
    poster: './img/home-alone.jpeg',
    rating: '3',
    description: 'TestDescription'
  }];

exports.create = (movieData) => {
    movies.push(movieData);
}

exports.getAll = () => {
    return movies.slice();
}