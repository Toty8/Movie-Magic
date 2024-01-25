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
    
    res.render('details');

});

module.exports = router;