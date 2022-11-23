const router = require('express').Router();

const {
    createThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController');

// api/thoughts
router.route('/').get(getAllThoughts);

// api/thoughts/:userId
router.route('/:id').post(createThought);

// api/thoughts/:thoughtId
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought)

module.exports = router