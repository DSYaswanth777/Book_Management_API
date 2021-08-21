const mongoose =require("mongoose");

//Creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: String,
        title: String,
        pubDate: String,
        language: String,
        Page_num:Number,
        Author:[String],
        publication: Number,
        category:[String],
});
//Create a book Model
const BookModel = mongoose.model("books",BookSchema);

module.exports = BookModel;