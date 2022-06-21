const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const app = express();
const booksRouter = require('./routes/books-router');
const authorRouter = require('./routes/author-router');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors()); // We can pass origin urls into cors() method as a object to allow selected origins
app.use(helmet());
app.use(compression());
app.use((req , res,  next) => {
    req.date = new Date().toISOString();
    next();
});
app.get('/', (req, res) => {
    res.status(201).json({
        status:'success',
        data: {
            message:'server running perfectly'
        }
    });
});

app.use('/api/v1/books' , booksRouter);
app.use('/api/v1/author' , authorRouter);

module.exports = app;
