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
            match: [/^([a-zA-Z0-9_\.-]+)@([\dA-Za-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Thought'
        }],
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get friend total
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// create user model
const User = mongoose.model('User', userSchema);

module.exports = User