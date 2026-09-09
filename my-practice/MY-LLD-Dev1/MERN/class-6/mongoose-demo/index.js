const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/movies-db')
    .then(() => console.log('connection open'));

// 1. Define a schema
const movieSchema = new mongoose.Schema({
    name: String,
    year: Number,
    isWatched: Boolean,
    rating: Number
}, {versionKey: false, timestamps: true})
// 2. Define a model
const Movie = mongoose.model('Movie', movieSchema);

app.get('/create', async (req, res) => {
    // const spiderman3 = new Movie({name: "Spiderman 3", year: 2020, rating: 8, isWatched: false});
    // await spiderman3.save();

    const ironman = await Movie.create({name: "Ironman 4", year: 2023, rating: 7, isWatched: false})

    res.send(ironman);
})

app.get('/echo', (req, res) => {
    res.json({message: 'Received echo'})
})

app.listen('3000', ()=> {
    console.log('Server started at 3000');
})