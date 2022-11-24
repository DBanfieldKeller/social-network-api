const router = require('express').Router();

const {
    createThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// api/thoughts
router.route('/').get(getAllThoughts);

// api/thoughts/:userId
router.route('/:id').post(createThought);

// api/thoughts/:thoughtId
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought)

// api/thoughts/:thoughtId/reactions
router.route('/:id/reactions').put(addReaction)

// api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:id/reactions/:reactionId').delete(deleteReaction)

module.exports = router