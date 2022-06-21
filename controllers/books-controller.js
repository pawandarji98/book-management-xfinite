const Books = require('../data-models/books-model');
const catchError = require('../utils/catch-error');
const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;
const THIRTY_MINUTES = 1800;

// REDIC CLIENT CONNECT
const client = redis.createClient(REDIS_PORT);
client.connect();

//GETTING BOOKS AND SAVINH INTO REDIS
exports.getBooks = catchError(async(req , res, next) => {
    const {page , limit , search=''} = await req.query;
    const books = await Books.find(
        {'name': {'$regex': search,$options:'i'}}
    )
    .limit(limit)
    .skip(limit * page);
    const cacheData = await JSON.stringify(books);
    const BOOKS_CACHE_KEY = `${page}-${limit}-books`;
    await client.set(BOOKS_CACHE_KEY, cacheData , (err , response) => {
        if(err) {
            console.log("Error while saving books cache");
            return;
        }
    });
    await client.expire(BOOKS_CACHE_KEY , THIRTY_MINUTES);
    await res.status(201).json({
        status:'success from DB',
        data:books
    });
});

// GETTING BOOKS DATA FROM REDIS
exports.getBooksFromCache = catchError(async(req,res,next) => {
    const {page , limit , search=''} = await req.query;
    const BOOKS_CACHE_KEY = `${page}-${limit}-books`;
    const cacheData = await client.get(BOOKS_CACHE_KEY);
    const parsedCacheData = await JSON.parse(cacheData);
    if(cacheData !== null) {
        res.status(201).json({
            status:'success from cache',
            data:parsedCacheData
        });
    } else {
        next();
    }
});

// CREATING BOOKS DATA
exports.createBook = catchError(async(req , res, next) => {
    const createdBook = await Books.create({
        name:req.body.name,
        description:req.body.description,
        author:req.body.author,
        language:req.body.language
    });
    await res.status(201).json({
        status:'success',
        data:createdBook
    });
});