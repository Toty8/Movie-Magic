const User = require('../models/User'); 

const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.register = (userdata) => User.create(userdata);

exports.login = async (email, password) => {
     
    const user = await User.findOne({ email });

    if(!user){
        throw new Error('Cannot find email or password!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw new Error('Cannot find email or password!');
    }

    const payload = {
        _id: user._id,
        email: user.email
    }

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2h' });

    return token;
}