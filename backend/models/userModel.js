const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const wishlistItemSchema = new mongoose.Schema({
    poster_path: { type: String },
    name: { type: String },
    id: { type: String, required: true },
    media_type: { type: String }
});

const userSchemaRules = {
    name: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email should be unique"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [6, "password should be atleast of 6 length"],
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 6,
        // custom validation
        validate: [function () {
            return this.password ===this.confirmPassword;
        }, "password should be equal to confirm password"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "user"
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
    wishlist: [wishlistItemSchema],
}

const userSchema = new mongoose.Schema(userSchemaRules);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return; 
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
});

const userModel = mongoose.model("UserModel",userSchema);

module.exports = userModel;