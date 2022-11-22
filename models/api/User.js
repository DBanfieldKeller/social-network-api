const mongoose = require('mongoose');
const thoughtSchema = require ('./Thought')

// user Schema
// TODO: add thoughts and friends, friendcount virtual
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/]
        },
        thoughts: [thoughtSchema],

    }
);

const User = mongoose.model('User', userSchema);

module.exports = User