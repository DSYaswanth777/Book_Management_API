const Router = require("express").Router();
const AuthorModel =require("../../database/author");
/*
Route           /authors
Description     to get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
Router.get("/", async (req,res) =>{
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
Router.get("/:name",async (req,res)=>{
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
Router.get("/id/:id",(req,res)=>{
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
Router.get("/book/:isbn",(req,res) => {
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
Route           /author/add
Description    to add new author
Access          PUBLIC
Parameter      none
Methods         POST
*/
Router.post("/add",async (req,res) => {
    const {newAuthor} =req.body;
    const addNewAuthor = await AuthorModel.create(newAuthor);
    return res.json({message:"New Author was added"});
});
/*
Route           /author/update/name
Description     Update Author name using it's id 
Access          PUBLIC
Parameter      id
Methods         PUT
*/
Router.put("/update/name/:id",(req,res)=>{
    database.authors.forEach((author) =>{
    if(author.id === parseInt (req.params.id)){
        author.name = req.body.newAuthor.name;
        return;
    }
    });
    return res.json({authors:database.authors});
    });
     /*
Route           /author
Description    delete an author using its id
Access          PUBLIC
Parameter      id
Methods         DELETE
*/
Router.delete("/:id",async (req,res) =>{
    const updatedAuthor =await AuthorModel.findOneAndDelete({
id:req.params.id
    });
    // const updatedAuthor =database.authors.filter(
    //     (author) =>author.id !== parseInt (req.params.id));
    //     database.authors = updatedAuthor;
        return res.json({authors:updatedAuthor});
});