const { Thought, User } = require('../models');

const thoughtController = {
    // Create new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate({ _id: req.params.id }, { $push: { thoughts: _id } }, { new: true });
            })
            .then(() => {
                res.json({ message: 'New thought added' })
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

    // Get thought by ID
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
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // Update thought by ID
    updateThoughts(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true})
            .populate({ path: 'reactions', select: '-__v' })
            .select('-___v')
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts with this ID!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.json(err));
    },

};

module.exports = thoughtController;