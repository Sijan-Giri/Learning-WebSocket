const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookName : {
        type : String
    },
    description : {
        type : String
    },
    bookPrice : {
        type : Number
    }
})

const Book = mongoose.model("Book",bookSchema);
module.exports = Book