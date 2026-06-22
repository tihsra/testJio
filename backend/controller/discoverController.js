const {TMDB_ENDPOINT,fetchTmdbdata} = require('../service/tmdbService');

const fetchNowPlaying = async function(req,res){
    try{
        const data = await fetchTmdbdata.get(TMDB_ENDPOINT.fetchNowPlaying);
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

const fetchTrending = async function(req,res){
    try{
        const data = await fetchTmdbdata.get(TMDB_ENDPOINT.fetchTrending);
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


const fetchPopular = async function(req,res){
    try{
        const data = await fetchTmdbdata.get(TMDB_ENDPOINT.fetchPopular);
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

const fetchUpcoming = async function(req,res){
    try{
        const data = await fetchTmdbdata.get(TMDB_ENDPOINT.fetchUpcoming);
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


const fetchTopRated = async function(req,res){
    try{
        const data = await fetchTmdbdata.get(TMDB_ENDPOINT.fetchTopRated);
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

module.exports = { fetchNowPlaying, fetchTrending, fetchPopular, fetchUpcoming, fetchTopRated }