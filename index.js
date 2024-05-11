const express = require('express');
const app = express();
const mysql = require('mysql2');
const path = require("path");

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
    database: '',
    password: '@Suyash1234'
});

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

app.listen(port, () =>{
    console.log(`App is listening on ${port}.`);
});