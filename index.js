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

app.get("/" , (req, res) => {
    res.render("home");
});

app.listen(port, () =>{
    console.log(`App is listening on ${port}.`);
});