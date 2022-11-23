const router = require('express').Router();

const {
    createThought,
    getAllThoughts,
    getThoughtById,
    updateThoughts
} = require('../../controllers/thoughtController');

// api/thoughts
router.route('/').get(getAllThoughts);

// api/thoughts/:userId
router.route('/:id').post(createThought);

// api/thoughts/:thoughtId
router.route('/:id').get(getThoughtById).put(updateThoughts)

module.exports = router