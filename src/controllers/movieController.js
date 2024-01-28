const router = require('express').Router();

const movieService = require('../services/movieService'); 

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {

    const newMovie = req.body;

    try{
        await movieService.create(newMovie);

        res.redirect('/');
    }
    catch(err){
        console.log(err.message);
        res.redirect('/movie/create');
    }
});

router.get('/details/:id', async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieService.getById(movieId).lean();
    
    if(!isNaN(movie.rating)){
        movie.rating = new Array(Number(movie.rating)).fill(true);
    }    

    res.render('details', { movie });
});

router.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId).lean();

    res.render('movie/attach', { ...movie });
});

module.exports = router;