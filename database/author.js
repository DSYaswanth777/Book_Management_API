const mongoose = require("mongoose");

//Author Schema
const AuthorSchema = mongoose.Schema({
        id:Number,
        name:String,
        books:[String],
    });

    //Author Model
    const AuthorModel = mongoose.model("authors",AuthorSchema);
    
    module.exports = AuthorModel;