import axios from "axios";

const ENDPOINTS = {

    // Authentication 

    signup: '/auth/signup',
    login: '/auth/login',
    forgotPassword: '/auth/forgotPassword',
    resetPassword: '/auth/resetPassword',
    logout: '/auth/logOut',

    // Home / Discover 

    nowPlaying: "/discover/nowPlaying",
    trending: "/discover/trending",
    popular: "/discover/popular",
    upcoming: "/discover/upcoming",
    topRated: "/discover/topRated",

    // Movies

    actionMovies: '/movies/action',
    comedyMovies: '/movies/comedy',
    horrorMovies: '/movies/horror',
    romanceMovies: '/movies/romance',
    animeMovies: '/movies/anime',

    // Tv

    actionTv: '/tv/action',
    comedyTv: '/tv/comedy',
    mysteryTv: '/tv/mystery',
    dramaTv: '/tv/drama',
    crimeTv: '/tv/crime',

    // Details

    getMovieDetails: (id) => `/movies/details?id=${id}`,
    getTvShowsDetails: (id) => `/tv/details?id=${id}`,

    // Payment

    createOrder: '/payment/createOrder',
    updatePremiumUser: '/payment/updatePremiumUser',

    //user

    userDetail:'/user/',
    getWishlist:'/user/wishlist',
    addToWishlist:'/user/updateWishList'

}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Media = (path) => `https://image.tmdb.org/t/p/original` + path;

const getWatchUrl = (id,mediaType,poster_path) => {
    const prefix = mediaType === "tv" ? "tv" : "movies";
    return `/${prefix}/watch?id=${id}&poster_path=${poster_path}`;
}

const API = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
})

export { ENDPOINTS, API_BASE_URL, API, Media, getWatchUrl};