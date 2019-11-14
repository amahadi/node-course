const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){ 
            if(!validator.isEmail(value)){ throw new Error("Email is not valid!") }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length <= 6) { throw new Error("Error: Password length must be greater than 6 characters!"); }
            if(value.toLowerCase().includes('password')) { throw new Error("Error: Password should not contain the word 'password'"); }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){ if(value < 0){ throw new Error('Age must be a positive number!'); } }
    }
});



module.exports = User;