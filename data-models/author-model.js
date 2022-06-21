const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true , 'Please add author name']
    },
    age:{
        type:String,
        required:[true , 'Please add authors age'],
    },
    dob:{
        type:Date,
        required:[true , 'Please add authors birth date']
    },
    email:{
        type:String,
        required:[true , 'Please aa authors email']
    }
});

const Author = mongoose.model('Author' , authorSchema);
module.exports = Author;