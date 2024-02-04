const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userScema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    }
});

userScema.pre('save', async function(){
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
});

const User = mongoose.model('User', userScema);

module.exports = User;