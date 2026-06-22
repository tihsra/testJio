const baseURL = "https://api.themoviedb.org/3";
const authorization = `Bearer ${process.env.TMDB_API}` 

const headers = {
    accept: 'application/json',
    Authorization: authorization
};

const TMDB_ENDPOINT = {
    // Discover/ Home page
    fetchNowPlaying: `/movie/now_playing?language=en-US&page=1`,
    fetchTrending: `/trending/all/week?language=en-US`,
    fetchPopular: `/tv/popular?language=en-US&page=1`,
    fetchUpcoming: `/movie/upcoming?language=en-US&page=1`,
    fetchTopRated: `/movie/top_rated?language=en-US&page=1`,

    //Movies Page
    fetchActionMovies: `/discover/movie?language=en-US&with_genres=28`,
    fetchComedyMovies: `/discover/movie?language=en-US&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?language=en-US&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?language=en-US&with_genres=10749`,
    fetchAnimeMovies: '/discover/movie?language=en-US&with_genres=16',
    fetchMovieVideos: (id) => `/movie/${id}/videos?language=en-US`,

    //TV shows
    fetchActionTvShows: `/discover/tv?language=en-US&with_genres=10759`,
    fetchComedyTvShows: `/discover/tv?language=en-US&with_genres=35`,
    fetchMysteryTvShows: `/discover/tv?language=en-US&with_genres=9648`,
    fetchDramaTvShows: `/discover/tv?language=en-US&with_genres=18`,
    fetchCrimeTvShows: `/discover/tv?language=en-US&with_genres=80`,
    fetchTvShowVideos: (id) => `/tv/${id}/videos?language=en-US`,
}


const fetchTmdbdata = {
    get: async (endPoint)=>{
        const url = baseURL+endPoint;
        const response = await fetch(url,{ method:'GET', headers:headers });
        const data = await response.json();
        return data;
    } 
}

module.exports = {
    TMDB_ENDPOINT,
    fetchTmdbdata
};