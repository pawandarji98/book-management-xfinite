const express = require('express');
const router = express.Router();
const booksControllers = require('../controllers/books-controller');

router.get('/get-all' , booksControllers.getBooks);
router.post('/create-book' , booksControllers.createBook)
module.exports = router;