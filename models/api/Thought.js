const mongoose = require('mongoose');
// require moment for date formatting
const moment = require('moment');

// create reaction schema
const reactionSchema = new Schema(
    {
        // Set custom ID 
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (newDate) => moment(newDate).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// create thought schema
const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (newDate) => moment(newDate).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]


},
{
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// total reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

// create thought model
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;