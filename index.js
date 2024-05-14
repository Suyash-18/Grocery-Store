const express = require('express');
const app = express();
const mysql = require('mysql2');
const path = require("path");
const { faker } = require('@faker-js/faker');
// const { ifError } = require('assert');


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
    let {username,email,number,password} = req.body;
    let id = faker.string.uuid();
    let q=`insert into user(id, name, email, phnumber, password) value ('${id}', '${username}', '${email}', '${number}', '${password}')`;
    try {
        connection.query(q, (err, result) =>{
            if(err) throw err;
            res.render("login");
        })
    } catch {
        console.log(err);
    }
});

// Login Route
app.post("/login" , (req,res) => {
    let {email,password} = req.body;
    let q=`select * from user where email = '${email}'`;
    try {
        connection.query(q, (err, result) =>{
            if(err) throw err;
            let user = result[0];
            if(password == user.password){
                res.render('home', {user});
            }else{
                res.render("error");
            }
        })
    } catch {
        console.log(err);
    }
});

app.get("/err" ,(req,res) => {
    res.render('error');
});

app.listen(port, () =>{
    console.log(`App is listening on ${port}.`);
});



// To insert fake data
// let q="insert into user(id, name, email, phnumber, password) value ?;";
// let data = [];


// for(let i = 0; i < 10; i++){
//   data.push(getRandomUser());
// }
// try{
//   connection.query(q, [data], (err, result) => {
//     if (err) throw err ;
//     console.log(result); // results contains rows returned by server
//   });
  
// }catch{
//   console.log(err);
// }

// connection.end();
