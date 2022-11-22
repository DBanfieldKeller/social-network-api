// require mongoose
const mongoose = require('mongoose');

// user Schema
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
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'thought'
        }],
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }]
    }
);

// get friend total
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// create user model
const User = mongoose.model('User', userSchema);

module.exports = User