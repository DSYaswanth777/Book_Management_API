const mongoose = require("mongoose");

//Creating a Schema for Publication
 const PublicationSchema = mongoose.Schema({
    id:Number,
    name:String,
    books:[String],
});

// Create a Publication Model
const PublicationModel = mongoose.model("publications",PublicationSchema);

 module.exports = PublicationModel;