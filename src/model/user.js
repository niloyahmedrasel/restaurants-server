const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        maxlength: 100
    },
    role: {
        type: String,
        default: 'user',
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);
