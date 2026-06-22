const {TMDB_ENDPOINT,fetchTmdbdata} = require('../service/tmdbService');

const fetchActionTvShows = async function(req,res){
    try{
        const data = await fetchTmdbdata.get(TMDB_ENDPOINT.fetchActionTvShows);
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

const fetchComedyTvShows = async function(req,res){
    try{
        const data = await fetchTmdbdata.get(TMDB_ENDPOINT.fetchComedyTvShows);
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


const fetchMysteryTvShows = async function(req,res){
    try{
        const data = await fetchTmdbdata.get(TMDB_ENDPOINT.fetchMysteryTvShows);
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

const fetchDramaTvShows = async function(req,res){
    try{
        const data = await fetchTmdbdata.get(TMDB_ENDPOINT.fetchDramaTvShows);
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


const fetchCrimeTvShows = async function(req,res){
    try{
        const data = await fetchTmdbdata.get(TMDB_ENDPOINT.fetchCrimeTvShows);
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

const getTvShowDetails = async function(req,res){
    try{
        const { id } = req.query;
        const data = await fetchTmdbdata.get(TMDB_ENDPOINT.fetchTvShowVideos(id));
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

module.exports = { fetchActionTvShows,
    fetchComedyTvShows,
    fetchMysteryTvShows,
    fetchDramaTvShows,
    fetchCrimeTvShows,
    getTvShowDetails,
}