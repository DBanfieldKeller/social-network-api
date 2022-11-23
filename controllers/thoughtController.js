const { Thought, User } = require('../models');

const thoughtController = {
    // Create new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate({ _id: req.params.id }, { $push: { thoughts: _id } }, { new: true });
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                } else {
                    res.json({ message: 'New thought added', dbUserData })
                }
                
            })
            .catch((err) => res.json(err));
    },

    // Get all thoughts and reactions
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Get thought by id
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts with this ID!' });
                    return;
                }
                res.json(dbThoughtsData)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Update thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-___v')
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts with this ID!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => res.json(err));
    },
    // Delete thought by id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought with this ID!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => res.status(400).json(err));
    },
    // Add new reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.id }, { $push: { reactions: req.body } }, { new: true })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought with id!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => res.status(400).json(err))
    },

    // Delete a reaction by id
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({_id: req.params.id}, {$pull: {reactions: {reactionId: req.params.reactionId}}}, {new : true})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thought with this id!'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch((err) => res.status(400).json(err));
    }

};

module.exports = thoughtController;