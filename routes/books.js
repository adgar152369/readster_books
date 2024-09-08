const express = require('express');
const router = express.Router();
const {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook } = require('../controllers/books');

// only routes
router.route('/').get(getAllBooks).post(createBook);
router.route('/:id').get(getBook).put(updateBook).delete(deleteBook);

module.exports = router;