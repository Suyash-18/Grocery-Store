const express = require('express');
const app = express();
const mysql = require('mysql2');
const path = require("path");
const { faker } = require('@faker-js/faker');


app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.static(path.join(__dirname,"/public/js")));
app.use(express.static(path.join(__dirname,"/public/images")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'grocery',
    password: '@Suyash1234'
});

let getRandomUser = () => {
    return [faker.string.uuid(), faker.internet.userName(), faker.internet.email(), faker.phone.number(), faker.internet.password()];
}
let q="insert into user(id, name, email, phnumber, password) value ?;";
let data = [];


for(let i = 0; i < 10; i++){
  data.push(getRandomUser());
}
try{
  connection.query(q, [data], (err, result) => {
    if (err) throw err ;
    console.log(result); // results contains rows returned by server
  });
  
}catch{
  console.log(err);
}

connection.end();


//Home Route
app.get("/" , (req, res) => {
    res.render("home");
});
//Contact Route
app.get("/contact" , (req, res) => {
    res.render("contact-us");
});
//About Route
app.get("/about" , (req, res) => {
    res.render("about");
});
//Cart Route
app.get("/cart" , (req, res) => {
    res.render("cart");
});
//Signin Route
app.get("/signin" , (req, res) => {
    res.render("signin");
});
// User info route
app.post("/user" , (req,res) => {
    let body = req.body;
    res.send(body);
});

app.listen(port, () =>{
    console.log(`App is listening on ${port}.`);
});