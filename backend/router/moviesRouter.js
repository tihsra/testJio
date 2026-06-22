const express = require('express');

const { fetchActionMovies,
    fetchComedyMovies,
    fetchHorrorMovies,
    fetchRomanceMovies,
    fetchAnimeMovies,
    getMovieDetails } = require('../controller/moviesController')

const moviesRouter = express.Router()


moviesRouter
.get('/action',fetchActionMovies)
.get('/comedy',fetchComedyMovies)
.get('/horror',fetchHorrorMovies)
.get('/romance',fetchRomanceMovies)
.get('/anime',fetchAnimeMovies)
.get('/details',getMovieDetails)

module.exports = moviesRouter