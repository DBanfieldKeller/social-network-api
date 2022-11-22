const mongoose = require('mongoose');

// user Schema
// TODO: add thoughts and friends, friendcount virtual
const userSchema = new Schema(
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
        }
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User