const mongoose = require('mongoose');

const paymentSchemaRules = {
    receiptId: {
        type: String,
        required: true,
        unique: true,
    },
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["created", "paid"],
        default: "created"
    }
}

const paymentSchema = new mongoose.Schema(paymentSchemaRules);

const paymentModel = mongoose.model("Payment-Model",paymentSchema);

module.exports = paymentModel;