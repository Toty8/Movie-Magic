const mongoose = require('mongoose');

exports.getErrorMessage = (err) => {

    let message = '';
    if(err instanceof mongoose.MongooseError){
        message = Object.values(err.errors).at(0).message;
    } else if(err instanceof Error){
        message = err.message;
    }

    return message;
}

exports.validate = (Model) => async (req, res, next) => {
    try{
        const modelInstance = new Model(req.body);

        const isvalid = await modelInstance.validate();

        if(!isvalid){
            return res.redirect('/404');
        }
    
        next();
    } catch(err){
        const message = this.getErrorMessage(err)

        res.render('404', { error: message});
    }
}