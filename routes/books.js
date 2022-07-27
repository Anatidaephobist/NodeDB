const express = require('express');
const router = express.Router();
const books = require('../controllers/books')

// All routes include '/books' by default.
router.get('/', books.bookListing);
router.get('/:id', books.singleBook);
router.post('/', books.newBook);
router.delete('/:id', books.deleteBook);

module.exports = router;