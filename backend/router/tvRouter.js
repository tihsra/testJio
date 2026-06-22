const express = require('express');

const { fetchActionTvShows,
    fetchComedyTvShows,
    fetchMysteryTvShows,
    fetchDramaTvShows,
    fetchCrimeTvShows,
    getTvShowDetails } = require('../controller/tvController')

const tvRouter = express.Router()


tvRouter
.get('/action',fetchActionTvShows)
.get('/comedy',fetchComedyTvShows)
.get('/mystery',fetchMysteryTvShows)
.get('/drama',fetchDramaTvShows)
.get('/crime',fetchCrimeTvShows)
.get('/details',getTvShowDetails)

module.exports = tvRouter