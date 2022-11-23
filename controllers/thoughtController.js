const { Thought, User } = require('../models');

const thoughtController = {
    // Create new thought
    createThought(req, res) {
        Thought.create(req.body)
        .then(({_id}) => {
            return User.findOneAndUpdate({ _id: req.params.id}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(dbThoughtsData => {
            res.json(dbThoughtsData)
        })
        .catch((err) => res.json(err)); 
    },
};

module.exports = thoughtController;