const express = require('express');
const router = express.Router();
const AuthorControllers = require('../controllers/author-controller');

router.post('/create-author' , AuthorControllers.createAuthor);
module.exports = router;