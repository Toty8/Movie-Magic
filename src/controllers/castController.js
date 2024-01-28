const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('cast/create');
});

router.post('/create', (req, res) => {
    const newCast = req.body;

    try{
        res.redirect('/');
    }
    catch(err){
        console.log(err.message);
        res.redirect('/create');
    }
});

module.exports = router;