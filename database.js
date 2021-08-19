const books = [
    {
        ISBN: "12345Book",
        title: "Getting started with MERN",
        pubDate:"2021-08-08",
        language: "en",
        Page_num:250,
        Author:[1,2],
        publication: [1],
        category:["tech","programming","education","thriller"]
    },
];
const authors = [
    {
        id:1,
        name:"Yaswanth",
        books:["12345Book","1234567Book2"],
    },
    {
        id:2,
        name:"ElonMusk",
        books:["12345Book"],
    }
];

const publications =[
    {
        id:1,
        name: "Vikrant",
        books:["12345Book"],
    },
    {
        id:2,
        name:"VGS",
        books:["1234567Book2"],
    }
];

module.exports = {books, authors,publications}