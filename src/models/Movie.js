const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLenth: 5,
        match: [/^[a-zA-Z0-9]+$/, 'Invalid title!'],
    },
    genre: {
        type: String,
        required: true,
        lowercase: true,
        minLenth: 5,
        match: [/^[a-zA-Z0-9]+$/, 'Invalid genre!'],
    },
    director: {
        type: String,
        required: true,
        minLenth: 5,
        match: [/^[a-zA-Z0-9\s]+$/, 'Invalid director!'],
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: 2024
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000
    },
    poster: {
        type: String,
        required: true,
        validate: {
            validator(value) {
                return /^https?:\/\//.test(value);
            },
            message: (props) => `${props.value} is invalid url for the castImage!`
        }     
    },
    casts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cast',
        required: false
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;