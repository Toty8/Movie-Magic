const router = require('express').Router();

const movieService = require('../services/movieService'); 

router.get('/movie/create', (req, res) => {
    res.render('create');
});

router.post('/movie/create', async (req, res) => {

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

router.get('/movie/details/:id', async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieService.getById(movieId).lean();
    
    if(!isNaN(movie.rating)){
        movie.rating = new Array(Number(movie.rating)).fill(true);
    }    

    res.render('details', { movie });
});

module.exports = router;