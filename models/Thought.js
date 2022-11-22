const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280
    },
    createdAt: { 
        type: Date,
        default: Date.now
    }


});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;