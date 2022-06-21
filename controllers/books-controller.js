const Books = require('../data-models/books-model');
const catchError = require('../utils/catch-error');
const fetch = require('node-fetch')
const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379


exports.getBooks = catchError(async(req , res, next) => {
    const client = await redis.createClient(REDIS_PORT);
    await client.connect();
    const {page , limit , search=''} = await req.query;
    const books = await Books.find(
        {'name': {'$regex': search,$options:'i'}}
    )
    .limit(limit)
    .skip(limit * page);
    const key = await JSON.stringify(books)
    await client.set('books' , key , function(err , response) {
        if(err) {
            console.log("Error while saving books cache");
            return;
        }
    });
    await client.expire('books' , 60);
    await res.status(201).json({
        status:'success',
        data:books
    });
});


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
})