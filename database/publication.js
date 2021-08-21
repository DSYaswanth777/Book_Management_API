const { Schema } = require("mongoose");

const mongoose = required("mongoose");

//Creating a Schema for Publication
 const PublicationSchema = mongoose.Schema({
    id:Number,
    name:String,
    books:[String],
});

// Create a Publication Model
const PublicationModel =mongoose.model(PublicationSchema);

 modules.exports =PublicationModel;