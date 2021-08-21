const mongoose =required("mongoose");

//Creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: String,
        title: String,
        pubDate: [Number],
        language: String,
        Page_num:Number,
        Author:[String],
        publication: Number,
        category:[String],
});
//Create a book Model
const BookModel = mongoose.model("Books",BookSchema);

module.exports = BookModel;