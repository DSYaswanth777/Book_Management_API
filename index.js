require("dotenv").config();
//Framework
const express = require("express");
const mongoose = require("mongoose");
//Database
const database = require("./database");
//Intilization
const booky = express();
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
//Models 
const BookModel =require("./database/book");
const AuthorModel =require("./database/author");
const PublicationModel =require("./database/publication");

/*
Route           /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/

booky.get("/",async(req,res) =>{
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

/*
Route           /is
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       ISBN
Methods         GET
*/

booky.get("/is/:isbn",async(req,res)=>{
    const getSpecficBook =await BookModel.findOne({ISBN:req.params.isbn})
    if(!getSpecficBook){
        return res.json({error: `No book found for ISBN of ${req.params.isbn}`,
    });
    }
    return res.json({book:getSpecficBook});
});

/*
Route           /c
Description     Get specific books based on category
Access          PUBLIC
Parameter       category
Methods         GET
*/

booky.get("/c/:category",async(req,res) =>{
    const getSpecficBook =await BookModel.findOne({category:req.params.category})
    // const getSpecficBook =database.books.filter((books) =>
    // books.category.includes(req.params.category)
    // );
    if(!getSpecficBook){
        return res.json({error: `No book found for category of ${req.params.category}`,
    });
}
return res.json({book:getSpecficBook});
});

/*
Route           /l
Description     Get specific books based on language
Access          PUBLIC
Parameter       LANGUAGE
Methods         GET
*/
booky.get("/l/:language",async (req,res) =>{
    const getSpecficBook = await BookModel.find({language:req.params.language})
//  const getSpecficBook =database.books.filter((books) =>
//  books.language.includes(req.params.language)
//  );
 if(!getSpecficBook){
    return res.json({error: `No book found for category of ${req.params.language}`,
});
}
return res.json({book:getSpecficBook});
});
/*
Route           /authors
Description     to get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/author", async (req,res) =>{
    const getAllAuthors =await AuthorModel.find();
    return res.json({authors:getAllAuthors});
});
/*
Route           /authors
Description     to get specific author based on name
Access          PUBLIC
Parameter       name
Methods         GET
*/
booky.get("/author/:name",async (req,res)=>{
    const getSpecficAuthor =await BookModel.findOne({name:req.params.id})
    // const getSpecficAuthor =database.authors.filter(
    //     (author) => author.name === (req.params.name)
    //     );
        if(!getSpecficAuthor){
            return res.json({error: `No book found for  of ${req.params.name}`,
        });
        }
        return res.json({books:getSpecficAuthor});
    });
    /*
Route           /authors
Description     to get specific author based on id
Access          PUBLIC
Parameter       id
Methods         GET
*/
booky.get("/author/id/:id",(req,res)=>{
    const getSpecficAuthor =database.authors.filter(
        (author) => author.id === parseInt(req.params.id)
        );
        if(getSpecficAuthor.length === 0){
            return res.json({error: `No book found for ISBN of ${req.params.id}`,
        });
        }
        return res.json({books:getSpecficAuthor});
    });
/*
Route           /authors/book
Description     to get list of authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/ 
booky.get("/author/book/:isbn",(req,res) => {
    const getSpecficAuthor =database.authors.filter((author) =>
    author.books.includes(req.params.isbn)
    );
    if(getSpecficAuthor.length === 0){
        return res.json({error: `No author for book of ${req.params.isbn}`,
    });
}
return res.json({book:getSpecficAuthor});
});
/*
Route           /publications
Description     Get all publications
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/publications",async (req,res) =>{ 
    const getAllPublications =await PublicationModel.find();
    return res.json({publications:getAllPublications});
});
/*
Route           /publications
Description    to get specific publication 
Access          PUBLIC
Parameter      name
Methods         GET
*/
booky.get("/publications/:name",async (req,res) =>{
    const getSpecficPublication =await BookModel.findOne({name:req.params.name})
// const getSpecficPublication =database.publications.filter(
//     (publications) => publications.name === (req.params.name)
// );
if(!getSpecficPublication){
    return res.json({error: `No publication found${req.params.name}`,
});
}
return res.json({books:getSpecficPublication});
});
/*
Route           /publications/book
Description    to get specific publication 
Access          PUBLIC
Parameter      isbn
Methods         GET
*/
booky.get("/publications/book/:isbn",async(req,res) => {
    const getSpecficPublication =await BookModel.findOne({ISBN:req.params.isbn})
    // const getSpecficAuthor =database.authors.filter((publications) =>
    // publications.books.includes(req.params.isbn)
    // );
    if(!getSpecficPublication){
        return res.json({error: `No publication found for book of ${req.params.isbn}`,
    });
}
return res.json({book:getSpecficPublication});
});
/*
Route           /book/add
Description    to add new book
Access          PUBLIC
Parameter      None
Methods         POST
*/
booky.post("/book/add",async (req,res) => {
    const {newBook} = req.body;
    const addNewBook =  BookModel.create(newBook);

    return res.json({meaage:"Book was added"});
});
/*
Route           /author/add
Description    to add new author
Access          PUBLIC
Parameter      none
Methods         POST
*/
booky.post("/author/add",async (req,res) => {
    const {newAuthor} =req.body;
    const addNewAuthor = await AuthorModel.create(newAuthor);
    return res.json({message:"New Author was added"});
});
/*
Route           /publication/add
Description    to add new publication
Access          PUBLIC
Parameter      none
Methods         POST
*/
booky.post("/publication/add",async (req,res) => {
    const {newPublication} =req.body;
    const addNewPublication =await PublicationModel.create(newPublication);
    return res.json({publications:database.publications});
});
/*
Route           /book/update/title/
Description    to update book title
Access          PUBLIC
Parameter      isbn
Methods         PUT
*/
booky.put("/book/update/title/:isbn",async (req,res)=>{
    const updatedBook = await BookModel.findOneAndUpdate(
    {
        ISBN:req.params.isbn,
    },
    {
        title:req.body.bookTitle,
    },
    {
        new:true,
    }
    );
return res.json({books:updatedBook});
});
/*
Route           /book/author/update
Description     update/add new author for a book
Access          PUBLIC
Parameter      isbn
Methods         PUT
*/
booky.put("/book/author/update/:isbn",async(req,res) => {
//Update book database

const updatedBook = await BookModel.findOneAndUpdate(
    {
        ISBN:req.params.isbn,
    },
    {
        $addToSet:{
            Author:req.body.newAuthor,
        },
    },
    {
        new:true,
    }
);
//Update authorAuthor databse
const updatedAuthor =await AuthorModel.findOneAndUpdate(
    {
        id:req.body.newAuthor,
    },
    {
        $addToSet:{
            books:req.params.isbn,
        },
    },
    {
        new:true,
    }
);
return res.json({books:updatedBook,authors:updatedAuthor})
});
/*
Route           /author/update/name
Description     Update Author name using it's id 
Access          PUBLIC
Parameter      id
Methods         PUT
*/
booky.put("/author/update/name/:id",(req,res)=>{
    database.authors.forEach((author) =>{
    if(author.id === parseInt (req.params.id)){
        author.name = req.body.newAuthor.name;
        return;
    }
    });
    return res.json({authors:database.authors});
    });
    /*
Route           /publication/update/name
Description    UPdate the publication name using it's id
Access          PUBLIC
Parameter      id
Methods         PUT
*/
booky.put("/publication/update/name/:id",(req,res)=>{
    database.publications.forEach((publication) =>{
    if(publication.id === parseInt(req.params.id)){
        publication.name = req.body.newPublicationName;
        return;
    }
    });
    return res.json({publications:database.publications});
    });
 /*
Route           /publication/update/book
Description    update/add books to publications
Access          PUBLIC
Parameter      isbn
Methods         PUT
*/
booky.put("/publication/update/book/:isbn",(req,res) =>{
//Update the publication databse
database.publications.forEach((publication) => {
    if(publication.id === req.body.pubId){
        return publication.books.push(req.params.isbn);
    }
});
//Update the book database
database.books.forEach((book)=>{
    if(book.ISBN === req.params.isbn){
        book.publication =req.body.pubId;
        message:"Sucessfully updated publication"
        return;
    }
});
return res.json({books:database.books,publications:database.publications,message:""})
});
 /*
Route           /book/delete
Description    delete a book
Access          PUBLIC
Parameter      isbn
Methods         DELETE
*/
booky.delete("/book/delete/:isbn",async(req,res) =>{
    const updatedBookDatabase =await BookModel.findOneAndDelete({
        ISBN:req.params.isbn,
    });
// const updatedBookDatabase = database.books.filter(
//     (book) => book.ISBN !== req.params.isbn);
//     database.books = updatedBookDatabase;
return res.json({books:updatedBookDatabase});
});
 /*
Route           /book/delete/author
Description    delete an author from a book
Access          PUBLIC
Parameter      isbn
Methods         DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId",async (req,res) =>{
    //Update the book data base
    const updatedBook =await BookModel.findOneAndUpdate(
        {
             ISBN: req.params.isbn,
        },
    {
        $pull:{
            authors:parseInt(req.params.authorId),
        },
    },
        {
            new:true
        }
    );

//update the author database
const updatedAuthor =await AuthorModel.findOneAndUpdate({
    id:parseInt(req.params.authorId),
},
{
    $pull:{
        books:req.params.isbn,
    },
},
{
    new:true
}
);
return res.json({book:updatedBook,
     author:updatedAuthor,
     message:"Author Was deleted!!",
    });
});
 /*
Route           /author
Description    delete an author using its id
Access          PUBLIC
Parameter      id
Methods         DELETE
*/
booky.delete("/author/:id",(req,res) =>{
    const updatedAuthor =database.authors.filter(
        (author) =>author.id !== parseInt (req.params.id));
        database.authors = updatedAuthor;
        return res.json({authors:database.authors});
});
 /*
Route           /publication/delete/book
Description    delete a book from publication
Access          PUBLIC
Parameter      isbn, publication id
Methods         DELETE
*/
booky.delete("/publication/delete/book/:isbn/:pubId",(req,res) =>{
    database.publications.forEach((publication) =>{
        if(publication.id === parseInt(req.params.pubId)){
            const newBooksList = publication.books.filter(
                (book) =>book!== req.params.isbn);
        
        publication.books =newBooksList;
        return;
    }
});
//update book database 
database.books.forEach((book) =>{
    if(book.ISBN === req.params.isbn){
        book.publication =0 ;// 0 means no publication avaliable
        return;
    }
});
return res.json({books:database.books, 
    publications:database.publications});
});
booky.listen(3000,()=> console.log("Hey server is running fine"))