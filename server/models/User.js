const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    admin: {
        type: Boolean,
        default: false,
    },
    sex: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

// LIST FUNCTIONS
// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


module.exports = mongoose.model('User', userSchema);
