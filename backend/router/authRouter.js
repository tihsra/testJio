const express = require('express');
const {
    signupHandler,
    loginHandler,
    forgotPasswordHandler,
    resetPasswordHandler,
    logoutHandler
} = require("../controller/authController.js");

const AuthRouter = express.Router();

AuthRouter
.post("/signup",signupHandler)
.post("/login",loginHandler)
.patch("/forgotPassword",forgotPasswordHandler)
.patch("/resetPassword",resetPasswordHandler)
.get("/logOut",logoutHandler)

module.exports = AuthRouter

