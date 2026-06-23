const util = require('util');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
const jsonWebToken = require('jsonwebtoken');
const userModel = require('../models/userModel');
const generateOTP = require('../utils/generateOTP')
const sendEmailservice = require('../service/emailSenderService');

const promisifiedSign = util.promisify(jsonWebToken.sign);
const promisifiedVerify = util.promisify(jsonWebToken.verify);

const signupHandler = async function(req,res){
    const userObject = req.body;

    if(!userObject.email||!userObject.password||!userObject.name||!userObject.confirmPassword){
        return res.status(400).json({
            "status" : "failure",
            "message" : "User's email or password not found",
        })
    }

    if(userObject.password!==userObject.confirmPassword){
        return res.status(400).json({
            "status" : "failure",
            "message" : "Password and Confirm Password should match",
        })
    }

    const userExists = await userModel.findOne({email:userObject.email});

    if(userExists){
        return res.status(400).json({
            status : "failure",
            message : "User already exists"
        })
    }

    try{
        const createUser = await userModel.create(userObject);
        await sendEmailservice('../template/welcome.html',createUser.email,{name:createUser.name},"sign")

        const safeUser = createUser.toObject();
        delete safeUser.password;
        delete safeUser.confirmPassword;

        return res.status(201).json({
            status : "success",
            user : safeUser,
            message: "Created successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            status : "failure",
            message: "Creation Unsuccessful",
            error : err.message,
        })
    }
} 

const loginHandler = async function(req,res){
    try{
        const userObject = req.body;
        
        if(!userObject.email||!userObject.password){
            return res.status(400).json({
                status: "failure",
                message: "user email or password not found"
            })
        }

        const actualUser = await userModel.findOne({email:userObject.email});

        if(!actualUser){
            return res.status(401).json({
                status: "failure",
                message: "Invalid email or password"
            })
        }

        const correctPassword = await bcrypt.compare(userObject.password,actualUser.password)

        if(!correctPassword){
            return res.status(401).json({
                status: "failure",
                message: "Invalid email or password"
            })
        }

        try{
            const jwtToken = await promisifiedSign({email:userObject.email},process.env.SECRET_JWT);
            res.cookie("userJWTtoken",jwtToken,{maxAge:60*60*24*1000, httpOnly:true, secure:true, sameSite:"none"});

            const safeUser = actualUser.toObject();
            delete safeUser.password;

            return res.status(200).json({
                    "status":"success",
                    "email": actualUser.email,
                    "message": "Successfully logged in",
                    "user": safeUser,
            })
        }
        catch(err){
            return res.status(500).json({
                status: "failure",
                message: "Internal error",
                error : err.message,
            })

        }
    }catch(err){
        return res.status(500).json({
                status: "failure",
                message: "Internal error",
                error : err.message,
        })
    }
}

const protectedRoute = async function(req,res,next){

    try{
        const cookies = req.cookies.userJWTtoken;
        if(!cookies){
            return res.status(401).json({
                status: "failure",
            })
        }
    
        const verifiedSignature = await promisifiedVerify(cookies,process.env.SECRET_JWT);

        const decryptedToken = verifiedSignature.email;
        req.verifiedUserId = decryptedToken;
        next();

    }catch(err){
        return res.status(401).json({
                status: "failure",
            })
    }
    
}

const forgotPasswordHandler = async function(req,res){
    
    try{
        const userObject = req.body;

        if(!userObject.email){
            return res.status(400).json({
                    status: "failure",
                    message: "No email provided"
                })
        }

        const actualUser = await userModel.findOne({email:userObject.email});

        if(!actualUser){
            return res.status(200).json({
                    status: "success",
                    message: "OTP sent successfully to user's email id"
            })
        }

        const otp = generateOTP();

        actualUser.otp = otp;
        actualUser.otpExpiry = Date.now() + 10*60*1000;

        await actualUser.save({validateBeforeSave : false});

        const templateData = { name: actualUser.name, otp: actualUser.otp }
        await sendEmailservice("../template/otp.html", actualUser.email, templateData, "otp");

        return res.status(200).json({
                status: "success",
                message: "OTP sent successfully to user's email id"
        })


    }catch(err){
        return res.status(500).json({
                status: "failure",
                message: "Internal Server Error",
                error: err.message
        })

    }

}

const resetPasswordHandler = async function(req,res){
    try{

        const resetUserObject = req.body;

        if(!resetUserObject.email||!resetUserObject.password||!resetUserObject.confirmPassword||!resetUserObject.otp){
                return res.status(400).json({
                status: "failure",
                message: "User's email/password or OTP doesn't exist"
            })
        }

        const actaulUserObject = await userModel.findOne({email:resetUserObject.email});

        if(!actaulUserObject){
            return res.status(400).json({
                status: "failure",
                message: "Invalid Email or OTP"
            })
        }

        if(!actaulUserObject.otp){
            return res.status(400).json({
                status: "failure",
                message: "No OTP request found"
            })
        }

        if(actaulUserObject.otpExpiry<Date.now()){
            return res.status(400).json({
                status: "failure",
                message: "OTP expired"
            })
        }

        if(actaulUserObject.otp!==resetUserObject.otp){
            return res.status(400).json({
                status: "failure",
                message: "Incorrect OTP provided"
            })
        }

        if(resetUserObject.password!==resetUserObject.confirmPassword){
            return res.status(400).json({
                status: "failure",
                message: "Password and Confirm-Password should match"
            })
        }
        actaulUserObject.otp = undefined;
        actaulUserObject.otpExpiry = undefined;
        actaulUserObject.password = resetUserObject.password;

        await actaulUserObject.save({validateBeforeSave:false});

        return res.status(200).json({
            status : "success",
            message : "Updated password succesfully"
        })
    }
    catch(err){
        return res.status(500).json({
            status: "failure",
            message: err.message,
        })
    }
}

const logoutHandler = function(req,res){

    try{
        res.clearCookie("userJWTtoken",{path: "/"})
        res.status(200).json({
            "status": "success",
            "message": "Successfully logged-out"
        })
    }catch(err){
        return res.status(500).json({
                status: "failure",
                message: "Internal error",
                error : err.message,
        })
    }
}



module.exports = {
    signupHandler,
    loginHandler,
    protectedRoute,
    forgotPasswordHandler,
    resetPasswordHandler,
    logoutHandler
}
