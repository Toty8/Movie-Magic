const router = require('express').Router();

const movieService = require('../services/movieService'); 
const castService = require('../services/castService'); 
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {

    const newMovie = {
        ...req.body,
        owner: req.user._id
    }

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
    const isOwner = movie.owner && movie.owner == req.user?._id; 
    const isAuthenticated = !!req.user;
    
    if(!isNaN(movie.rating)){
        movie.rating = new Array(Number(movie.rating)).fill(true);
    }    

    res.render('movie/details', { movie, isOwner, isAuthenticated });
});

router.get('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId).lean();
    const casts = await castService.getAll().lean();

    res.render('movie/attach', { ...movie, casts });
});

router.post('/:movieId/attach', isAuth, async (req, res) => {
    const castId = req.body.cast;
    
    await movieService.attach(req.params.movieId, castId);

    res.redirect('/');
});

router.get('/:movieId/edit', isAuth, async (req, res) => {

    const movie = await movieService.getById(req.params.movieId).lean();

    res.render('movie/edit', { movie });
});

router.post('/:movieId/edit', isAuth, async (req, res) => {

    const editedMovie = req.body;

    await movieService.edit(req.params.movieId, editedMovie);

    res.redirect(`movie/details/${req.params.movieId}`);
});


router.get('/:movieId/delete', isAuth, async (req, res) => {

    await movieService.delete(req.params.movieId);

    res.redirect('/');

});


module.exports = router;