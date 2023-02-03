const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name Required"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name Required"]
    },
    dateOfBirth: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone Number Required"]
    },
    username: {
        type: String,
        required: [true, "username Required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email Required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password Required"]
    },
    verify: {
        type: Boolean,
        default: false
    },
    superAdmin: {
        type: Boolean,
        default: true
    },
    token: {
        type: String
    }
}, {
    timestamps: true
})

const adminModel = mongoose.model('health360 admin', userSchema)

module.exports = adminModel