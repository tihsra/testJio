const userModel = require('../models/userModel');

const handleGetCurrentUser = async (req,res) =>{

    try{
        const userID = req.verifiedUserId;
        
        if(!userID){
            return res.status(400).json({
                status:"failure"
            })
        }
        
        const user =  await userModel.findOne({email:userID});

        if(!user){
            return res.status(400).json({
                status:"failure"
            })
        }
        const {name,email,isPremium} = user;

        return res.status(200).json({
            status: "success",
            userData: {
                name,email,isPremium
            }
        })
    }catch(err){
        return res.status(500).json({
            status: "failue",
            error:err.message
        })
    }
}

const handleGetwishlist = async (req,res) =>{

    try{
        const userID = req.verifiedUserId;

        const user = await userModel.findOne({email:userID});

        if(!user){
            return res.status(400).json({
                status:"failure"
            })
        }

        return res.status(200).json({
            status: "success",
            data: user.wishlist
        })
    }catch(err){
        return res.status(500).json({
            status: "failure",
            error:err.message
        })
    }
}

const handleWishListAddition = async (req,res) =>{

    try{
        const userID = req.verifiedUserId;
        const { id, poster_path, name, media_type } = req.body;

        const user = await userModel.findOne({email:userID});

        if(!user){
            return res.status(404).json({
                status:"failure",
                message:"User not found"
            })
        }

        if(user.wishlist.find((item)=>item.id===id)){
            return res.status(400).json({
                status:"failure",
                message:"Item already in wishlist"
            })
        }

        user.wishlist.push({ id, poster_path, name, media_type });

        await user.save({validateBeforeSave:false});

        return res.status(200).json({
            status:"success"
        })
    }catch(err){
        return res.status(500).json({
            status: "failure",
            error:err.message
        })
    }
}

module.exports = { handleGetCurrentUser, handleGetwishlist, handleWishListAddition };