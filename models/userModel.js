const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true, // Make it required
        unique: true // Ensure uniqueness
    },
    role: {
        type: String,
        required: [true, 'role is required'],
        enum: ['admin', 'organisation', 'donar', 'hospital']
    },
    name: {
        type: String,
        required: function () {
            if (this.role === 'donar' || this.role === 'admin') {
                return true
            }
            return false
        }
    },
    organisationName: {
        type: String,
        required: function () {
            if (this.role === 'organisation') {
                return true
            }
            return false
        }
    },
    hospitalName: {
        type: String,
        required: function () {
            if (this.role === 'hospital') {
                return true
            }
            return false
        }
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        // validate: {
        //     validator: function (value) {
        //         // Check if the password length is between 6 and 12 characters
        //         return value.length >= 6 && value.length <= 12;
        //     },
        //     message: 'Password must be between 6 and 12 characters'
        // }
    },
    website: {
        type: String
    },
    address: {
        type: String,
        required: [true, 'address is required']
    },
    phone: {
        type: String,
        required: [true, 'phone no. is required'],
        validate: {
            validator: function (value) {
                // Check if the password length is between 6 and 12 characters
                return value.length === 10;
            },
            message: 'Phone number must be between 6 and 12 characters'
        }
    },
}, { timestamps: true })

module.exports = mongoose.model('users', userSchema)