let books = [
    {
        ISBN: "12345Books",
        title: "Getting started with MERN",
        pubDate:"2021-08-08",
        language: "en",
        Page_num:250,
        Author:[1,2],
        publication: 1,
        category:["tech","programming","education","thriller"]
    },
    {
        ISBN: "1234567Book2",
        title: "Getting started with HTML",
        pubDate:"2021-09-09",
        language: "en",
        Page_num:250,
        Author:[1,2],
        publication: [1],
        category:["tech","programming","education"]
    }
];
const authors = [
    {
        id:1,
        name:"Yaswanth",
        books:["12345Books","1234567Book2"],
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

module.exports = {books,authors,publications}