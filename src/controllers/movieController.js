const router = require('express').Router();

const movieService = require('../services/movieService'); 

router.get('/movie/create', (req, res) => {
    res.render('create');
});

router.post('/movie/create', (req, res) => {

    const newMovie = req.body;

    movieService.create(newMovie);

    res.redirect('/');
});

router.get('/movie/details/:id', (req, res) => {
    const movieId = req.params.id;
    const movie = movieService.getById(movieId);
    
    res.render('details', { movie });

});

module.exports = router;