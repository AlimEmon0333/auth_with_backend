const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true,
    },
    contactNumber: {
        type: Number,
        require: true,
    }
},
    {
        timestamps: true
    })

const userModel = mongoose.model("users", userSchema)

module.exports = userModel