const mongoose =require('mongoose');

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Author name is required'],
        trim : true,
    },
    author : {
        type : String,
        required : true,
        trim : true,
        maxlength : [100, 'Title cannot be more than 100 characters']
    },
    year: {
        type: Number,
        required: [true, 'Publication Year is required'],
        min: [1000, 'Year must be a valid year'],
        max: [new Date().getFullYear(), 'Year cannot be in the future']
    },
    createdAt : {
        type : Date,
        default : Date.now,
    }
});

module.exports = mongoose.model('Book', bookSchema);
// This exports the Book model based on the bookSchema defined above.