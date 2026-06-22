const express = require("express");
const {protectedRoute}= require("../controller/authController");
const { handleGetCurrentUser, handleGetwishlist, handleWishListAddition } = require('../controller/userController');

const userRouter = express.Router();

userRouter
.get('/',protectedRoute,handleGetCurrentUser)
.get('/wishlist',protectedRoute,handleGetwishlist)
.post('/updateWishList',protectedRoute,handleWishListAddition)

module.exports = userRouter;