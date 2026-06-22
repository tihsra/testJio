const express = require('express');
const { handleCreateOrder, handleUpdatePremiumUser } =require('../controller/paymentController');

const paymentRouter = express.Router();

paymentRouter
.post("/createOrder",handleCreateOrder)
.patch("/updatePremiumUser",handleUpdatePremiumUser)

module.exports = paymentRouter;


