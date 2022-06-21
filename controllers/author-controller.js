const Author = require('../data-models/author-model');
const catchError = require('../utils/catch-error');


exports.createAuthor = catchError(async(req , res , next) => {
    const createdAuthor = await Author.create({
        name:req.body.name,
        age:req.body.age,
        dob:req.body.dob,
        email:req.body.email,
    });
    return await res.status(201).json({
        status:'success',
        data:createdAuthor
    });
})

