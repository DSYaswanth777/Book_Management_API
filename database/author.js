const mongoose = required("mongoose");

//Author Schema
const AuthorSchema = mongoose.Schema({
        id:Number,
        name:String,
        books:[String],
    });

    //Author Model
    const AuthorModel = mongoose.model("Authors",AuthorSchema);
    
    modules.exports = AuthorModel;