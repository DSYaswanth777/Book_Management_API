const Router = require("express").Router();

booky.get("/",async (req,res) =>{ 
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
booky.get("/:name",async (req,res) =>{
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
booky.get("/book/:isbn",async(req,res) => {
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
Route           /publication/add
Description    to add new publication
Access          PUBLIC
Parameter      none
Methods         POST
*/
booky.post("/add",async (req,res) => {
    const {newPublication} =req.body;
    const addNewPublication =await PublicationModel.create(newPublication);
    return res.json({publications:database.publications});
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