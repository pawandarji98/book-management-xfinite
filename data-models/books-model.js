const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , 'Please enter book name'],
    },
    description:{
        type:String,
        required:[true , 'PLease add book short description'],
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true , 'Please add author']
    },
    rating:{
        type:Number,
        default:0
    },
    publishedOn:{
        type:Date,
        default:Date.now,
    },
    language:{
        type:String,
        required:[true , 'Please add book language']
    }
});
const Book = mongoose.model('Book' , booksSchema);
module.exports = Book;