const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({
    origin:'**'
}));
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
module.exports = app;