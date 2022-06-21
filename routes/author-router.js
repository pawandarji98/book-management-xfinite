const express = require('express');
const router = express.Router();
const AuthorControllers = require('../controllers/author-controller');

// ROUTES
router.post('/create-author' , AuthorControllers.createAuthor);

module.exports = router;