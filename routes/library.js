const express = require('express');
const {getAllBooks} = require('../controllers/books');
const router = express.Router();

// only routes
router.route('/').get(getAllBooks).post();
router.route('/:id').get().put().delete();

module.exports = router;