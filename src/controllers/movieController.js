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
    const isOwner = movie.owner == req.user._id; 
    
    if(!isNaN(movie.rating)){
        movie.rating = new Array(Number(movie.rating)).fill(true);
    }    

    res.render('movie/details', { movie, isOwner });
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

    if(!req.user){
        return res.redirect('/auth/login');
    }

    const movie = await movieService.getById(req.params.movieId).lean();

     res.render('movie/edit', { movie });
});


module.exports = router;