const express = require("express");
//Database
const database = require("./database");
//Intilization
const booky = express();

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
Route           /publications
Description    to get specific publication 
Access          PUBLIC
Parameter      name
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
booky.listen(3000,()=> console.log("Hey server is running fine"))