const {TMDB_ENDPOINT,fetchTmdbdata} = require('../service/tmdbService');

const fetchActionMovies = async function(req,res){
    try{
        const data = await fetchTmdbdata.get(TMDB_ENDPOINT.fetchActionMovies);
        res.status(200).json({
            status: "success",
            data : data
        })
    }
    catch(err){
        res.status(500).json({
        status: "failure",
        error : err.message
        })
    }
}

const fetchComedyMovies = async function(req,res){
    try{
        const data = await fetchTmdbdata.get(TMDB_ENDPOINT.fetchComedyMovies);
        res.status(200).json({
            status: "success",
            data : data
        })
    }
    catch(err){
        res.status(500).json({
        status: "failure",
        error : err.message
        })
    }
}


const fetchHorrorMovies = async function(req,res){
    try{
        const data = await fetchTmdbdata.get(TMDB_ENDPOINT.fetchHorrorMovies);
        res.status(200).json({
            status: "success",
            data : data
        })
    }
    catch(err){
        res.status(500).json({
        status: "failure",
        error : err.message
        })
    }
}

const fetchRomanceMovies = async function(req,res){
    try{
        const data = await fetchTmdbdata.get(TMDB_ENDPOINT.fetchRomanceMovies);
        res.status(200).json({
            status: "success",
            data : data
        })
    }
    catch(err){
        res.status(500).json({
        status: "failure",
        error : err.message
        })
    }
}


const fetchAnimeMovies = async function(req,res){
    try{
        const data = await fetchTmdbdata.get(TMDB_ENDPOINT.fetchAnimeMovies);
        res.status(200).json({
            status: "success",
            data : data
        })
    }
    catch(err){
        res.status(500).json({
        status: "failure",
        error : err.message
        })
    }
}

const getMovieDetails = async function(req,res){
    try{
        const { id } = req.query;
        const data = await fetchTmdbdata.get(TMDB_ENDPOINT.fetchMovieVideos(id));
        res.status(200).json({
            status: "success",
            data : data
        })
    }
    catch(err){
        res.status(500).json({
        status: "failure",
        error : err.message
        })
    }
}

module.exports = { fetchActionMovies, fetchComedyMovies, fetchHorrorMovies, fetchRomanceMovies, fetchAnimeMovies, getMovieDetails }