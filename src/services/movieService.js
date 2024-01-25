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

exports.search = (title, genre, year) => {
    let result = movies.slice();

    if(title){
        result = result.filter(m => m.title.toLowerCase().includes(title.toLowerCase()));
    }
    if(genre){
        result = result.filter(m => m.genre.toLowerCase() === genre.toLowerCase());
    }
    if(year){
        result = result.filter(m => m.date === year);
    }

    return result;
}