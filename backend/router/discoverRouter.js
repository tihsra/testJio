const express = require('express');
const {
    fetchNowPlaying,
    fetchTrending,
    fetchPopular,
    fetchUpcoming,
    fetchTopRated } = require('../controller/discoverController');

const discoverRouter = express.Router()


discoverRouter
.get('/nowPlaying',fetchNowPlaying)
.get('/trending',fetchTrending)
.get('/popular',fetchPopular)
.get('/upcoming',fetchUpcoming)
.get('/topRated',fetchTopRated)

module.exports = discoverRouter