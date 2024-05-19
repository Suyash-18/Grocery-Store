const express = require('express');
const app = express();
const mysql = require('mysql2');
const path = require("path");
const { faker } = require('@faker-js/faker');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const { ifError } = require('assert');

const sessionOptions = {
    secret: 'some secret',
    resave: true,
    saveUninitialized: true
};

app.use(session(sessionOptions));
app.use(cookieParser());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'grocery',
    password: '@Suyash1234'
});

const mainuser = {
    id: "00404806-4ee3-4fe2-92d3-3574525729e0",
    name: "abcd",
    email: "abcd@gmail.com",
    phnumber: "9202",
    password: "7366729"
}

let getRandomUser = () => {
    return [faker.string.uuid(), faker.internet.userName(), faker.internet.email(), faker.phone.number(), faker.internet.password()];
}

app.get('/session' ,(req,res) => {
    req.session.user = mainuser;
    req.session.save();
    console.log(req.session);
    return res.send(req.session);
});


//Home Route
app.get("/" , (req, res) => {
    let user = req.session.user;
    console.log(req.session);
    return res.render("home", {user});

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
app.post("/user/login" , (req,res) => {
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

//Profile Route
app.get("/user/profile/:id" ,(req,res) => {
    let {id} = req.params;
    let q=`select * from user where id = '${id}'`;
    try {
        connection.query(q, (err, result) =>{
            if(err) throw err;
            let user = result[0]
            res.render("profile", {user});
        })
    } catch {
        console.log(err);
    }
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
