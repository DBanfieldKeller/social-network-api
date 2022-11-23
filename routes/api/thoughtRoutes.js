const router = require('express').Router();

const {
    createThought,
    getAllThoughts,
    getThoughtById
} = require('../../controllers/thoughtController');

// api/thoughts
router.route('/').get(getAllThoughts);

// api/thoughts/:userId
router.route('/:id').post(createThought);

// api/thoughts/:thoughtId
router.route('/:id').get(getThoughtById)

module.exports = router