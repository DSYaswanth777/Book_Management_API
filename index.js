require("dotenv").config();
//Framework
const express = require("express");
const mongoose = require("mongoose");
//Database
const database = require("./database");
//Intilization
const booky = express();
//MicroServices Route
const books = require("./API/Book");
//Configuration
booky.use(express.json());
//Establish database
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}
)
.then(() => console.log("Connection established!!!"));
//Intliazing MicroServices
booky.use("/book",books);
booky.use("/author",books);
booky.use("/publication",books);

booky.listen(3000,()=> console.log("Hey server is running fine"))