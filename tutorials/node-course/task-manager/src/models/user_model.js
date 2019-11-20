const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
        unique: true,
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
        validate(value){ if(value < 0){ throw new Error('Age must be a positive number!'); } },
        useFindAndModify: false
    }
});

userSchema.pre('save', async function (next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

userSchema.statics.findByCredentials = async (email, password) => {
    user = await User.findOne({ email })
    if(!user){ throw new Error(404); }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) { throw new Error(401); }

    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
