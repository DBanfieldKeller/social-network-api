const router = require('express').Router();

const {
    createThought
} = require('../../controllers/thoughtController');

// api/thoughts/:userId/
router.route('/:id').post(createThought)

module.exports = router