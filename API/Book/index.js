//Intalizing Express Router
//Prefix: /book
const Router =require("express").Router();
//Database Models
const BookModel =require("../../database/book");
/*
Route           /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/

Router.get("/",async(req,res) =>{
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

Router.get("/is/:isbn",async(req,res)=>{
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

Router.get("/c/:category",async(req,res) =>{
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
Route           /book/add
Description    to add new book
Access          PUBLIC
Parameter      None
Methods         POST
*/
Router.post("/add",async (req,res) => {
    const {newBook} = req.body;
    const addNewBook =  BookModel.create(newBook);

    return res.json({meaage:"Book was added"});
});
/*
Route           /l
Description     Get specific books based on language
Access          PUBLIC
Parameter       LANGUAGE
Methods         GET
*/
/*
Route           /l
Description     Get specific books based on language
Access          PUBLIC
Parameter       LANGUAGE
Methods         GET
*/
Router.get("/l/:language",async (req,res) =>{
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
Route           /book/update/title/
Description    to update book title
Access          PUBLIC
Parameter      isbn
Methods         PUT
*/
Router.put("/update/title/:isbn",async (req,res)=>{
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
Router.put("/author/update/:isbn",async(req,res) => {
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
Route           /book/delete
Description    delete a book
Access          PUBLIC
Parameter      isbn
Methods         DELETE
*/
Router.delete("/delete/:isbn",async(req,res) =>{
    const updatedBookDatabase =await BookModel.findOneAndDelete({
        ISBN:req.params.isbn,
    });
// const updatedBookDatabase = database.books.filter(
//     (book) => book.ISBN !== req.params.isbn);
//     database.books = updatedBookDatabase;
return res.json({books:updatedBookDatabase});
});
module.exports =Router;