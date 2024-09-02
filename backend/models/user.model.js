import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    appleUserId: {
        type: String,
        required: true,
    },
    userType: { 
        type: String, 
        enum: ['Owner', 'Guest'], 
        // required: true
    },
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User;