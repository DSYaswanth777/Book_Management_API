const express = require("express");
//Database
const database = require("./database");
//Intilization
const booky = express();
//Configuration
booky.use(express.json());
/*
Route           /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/

booky.get("/",(req,res) =>{
    return res.json({books:database.books});
});

/*
Route           /is
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       ISBN
Methods         GET
*/

booky.get("/is/:isbn",(req,res)=>{
const getSpecficBook =database.books.filter(
    (books) => books.ISBN === req.params.isbn
    );
    if(getSpecficBook.length === 0){
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

booky.get("/c/:category",(req,res) =>{
    const getSpecficBook =database.books.filter((books) =>
    books.category.includes(req.params.category)
    );
    if(getSpecficBook.length === 0){
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
booky.get("/l/:language",(req,res) =>{
 const getSpecficBook =database.books.filter((books) =>
 books.language.includes(req.params.language)
 );
 if(getSpecficBook.length === 0){
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
booky.get("/author",(req,res) =>{
    return res.json({authors:database.authors});
});
/*
Route           /authors
Description     to get specific author based on name
Access          PUBLIC
Parameter       name
Methods         GET
*/
booky.get("/author/:name",(req,res)=>{
    const getSpecficAuthor =database.authors.filter(
        (author) => author.name === (req.params.name)
        );
        if(getSpecficAuthor.length === 0){
            return res.json({error: `No book found for ISBN of ${req.params.name}`,
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
booky.get("/publications",(req,res) =>{
    return res.json({publications:database.publications});
});
/*
Route           /publications
Description    to get specific publication 
Access          PUBLIC
Parameter      name
Methods         GET
*/
booky.get("/publications/:name",(req,res) =>{
const getSpecficPublication =database.publications.filter(
    (publications) => publications.name === (req.params.name)
);
if(getSpecficPublication.length === 0){
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
booky.get("/publications/book/:isbn",(req,res) => {
    const getSpecficAuthor =database.authors.filter((publications) =>
    publications.books.includes(req.params.isbn)
    );
    if(getSpecficPublication.length === 0){
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
booky.post("/book/add",(req,res) => {
    const {newBook} =req.body;
    database.books.push(newBook);
    return res.json({books: database.books});
});
/*
Route           /author/add
Description    to add new author
Access          PUBLIC
Parameter      none
Methods         POST
*/
booky.post("/author/add",(req,res) => {
    const {newAuthor} =req.body;
    database.authors.push(newAuthor);
    return res.json({authors: database.authors});
});
/*
Route           /author/add
Description    to add new author
Access          PUBLIC
Parameter      none
Methods         POST
*/
booky.post("/publication/add",(req,res) => {
    const {newPublication} =req.body;
    database.publications.push(newPublication);
    return res.json({publications:database.publications});
});
/*
Route           /book/update/title/
Description    to update book title
Access          PUBLIC
Parameter      isbn
Methods         PUT
*/
booky.put("/book/update/title/:isbn",(req,res)=>{
database.books.forEach((book) =>{
if(book.ISBN === req.params.isbn){
    book.title = req.body.newBookTitle;
    return;
}
});
return res.json({books:database.books});
});
/*
Route           /book/update/author
Description     update/add new author for a book
Access          PUBLIC
Parameter      isbn
Methods         PUT
*/
booky.put("/book/update/author/:isbn/:authorId",(req,res) => {
//Update book database
database.books.forEach((book) =>{
    if(book.ISBN === req.params.isbn){
        return book.Author.push(parseInt(req.params.authorId));
    }
});
//update author databse
database.authors.forEach((author) =>{
    if(author.id === parseInt(req.params.authorId))
    return authors.books.push(req.params.isbn);
});
return res.json({books:database.books,authors:database.authors})
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
booky.delete("/book/delete/:isbn",(req,res) =>{
const updatedBookDatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn);
    database.books = updatedBookDatabase;
return res.json({books:database.books});
});
 /*
Route           /book/delete/author
Description    delete an author from a book
Access          PUBLIC
Parameter      isbn
Methods         DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId",(req,res) =>{
    //Update the book data base
database.books.forEach((book) =>{
    if(book.ISBN === req.params.isbn){
        const newAuthorList = book.Author.filter(
            (author) => author!== parseInt(req.params.authorId)
            );
            book.Author = newAuthorList;
            return;
    }
});
//update the author database
database.authors.forEach((author) => {
    if(author.id === parseInt(req.params.authorId)){
        const newBooksList = author.books.filter(
            (book) => book !== req.params.isbn
        );
        author.books =newBooksList;
        return;
    }
});
return res.json({book:database.books,
     author:database.authors,
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
        (author) =>author !== req.params.id);
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