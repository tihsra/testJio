const crypto = require("crypto");
const Razorpay = require('razorpay');
const { randomUUID } = require("crypto");
const userModel = require('../models/userModel');
const paymentModel = require('../models/paymentModel');

const razorPayObject = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET 
})


const handleCreateOrder = async function(req,res){    
    try{
        
        const transactionDetails = req.body;
        if(!transactionDetails.email||!transactionDetails.id){
            return res.status(400).json({
                status:"failure",
                message: "Provide all the details required"
            })
        }
        
        const receiptId = `rcpte_${randomUUID().replace(/-/g, "")}`;
        
        const amount = (transactionDetails.id==="xy1")?29:399;

        const onSuccessObject = await razorPayObject.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: receiptId,
        })

        await paymentModel.create({
            receiptId: receiptId,
            orderId: onSuccessObject.id,
            amount: onSuccessObject.amount,
            email: transactionDetails.email
        })

        res.status(200).json({
            status:"success",
            receiptId: receiptId,
            orderId: onSuccessObject.id,
            amount: onSuccessObject.amount
        })
    }
    catch(err){
        res.status(500).json({
            status: "failure",
            error: err.message,
        })
    }

}

const handleUpdatePremiumUser = async function(req,res){
   try{
        const userObject = req.body;
        
        if(!userObject.email||!userObject.receiptId||!userObject.signature||!userObject.razorpay_payment_id){
            return res.status(400).json({
                status: "failure",
                message: "Payment verification failer"
            })
        }

        const paymentDetail = await paymentModel.findOne({receiptId: userObject.receiptId});

        if(!paymentDetail){
            return res.status(400).json({
                status: "failure"
            })
        }

        if(paymentDetail.status==="paid"){
            return res.status(400).json({
                status: "failure"
            })
        }

        const receivedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
                                .update(paymentDetail.orderId+"|"+userObject.razorpay_payment_id)
                                .digest("hex");

        if (receivedSignature !== userObject.signature) {
            return res.status(400).json({
                status: "failure",
                message: "Payment verification failed."
            });
        }


        const actualUser = await userModel.findOne({email: userObject.email});

        if(!actualUser){
            return res.status(404).json({
                status: "failure",
            })
        }
        
        paymentDetail.status = "paid";
        
        await paymentDetail.save();

        actualUser.isPremium = true;

        await actualUser.save({validateBeforeSave:false});

        res.status(200).json({
            status: "success",
            message: "The user is now a premium user"
        })
    }
    catch(err){
        return res.status(500).json({
            status: "failure",
            message: "Internal Server Error"
        })
    }
}

module.exports = { handleCreateOrder, handleUpdatePremiumUser }