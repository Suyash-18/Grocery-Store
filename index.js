const express = require('express');
const app  = express();
const mongoose = require('mongoose');
const Product = require("./models/product.js");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
// const wrapAsync = require("./utils/wrapAsync.js");
// const ExpressError = require("./utils/ExpressError.js");
// const {listingSchema} = require("./schema.js");

let port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")))

// const mongoUrl = "mongodb://127.0.0.1:27017/grocery";

// main().then(() => {
//     console.log("Connected Successfully!!");
// }).catch((err) => {
//     console.log(err);
// })

// async function main(){
//     await mongoose.connect(mongoUrl);
// }


//Home Route
app.get("/" , (req, res) => {
    res.render("home");

});
// //Contact Route
// app.get("/contact" , (req, res) => {
//     res.render("contact-us");
// });
// //About Route
// app.get("/about" , (req, res) => {
//     res.render("about");
// });
// //Cart Route
// app.get("/cart" , (req, res) => {
//     res.render("cart");
// });
// //Signin Route
// app.get("/signin" , (req, res) => {
//     res.render("signin");
// });
// User info route
// app.post("/user" , (req,res) => {
//     let {username,email,number,password} = req.body;
//     let id = faker.string.uuid();
//     let q=`insert into user(id, name, email, phnumber, password) value ('${id}', '${username}', '${email}', '${number}', '${password}')`;
//     try {
//         connection.query(q, (err, result) =>{
//             if(err) throw err;
//             res.render("login");
//         })
//     } catch {
//         console.log(err);
//     }
// });

// Login Route
// app.post("/user/login" , (req,res) => {
//     let {email,password} = req.body;
//     let q=`select * from user where email = '${email}'`;
//     try {
//         connection.query(q, (err, result) =>{
//             if(err) throw err;
//             let user = result[0];
//             if(password == user.password){
//                 res.render('home', {user});
//             }else{
//                 res.render("error");
//             }
//         })
//     } catch {
//         console.log(err);
//     }
// });

//Profile Route
// app.get("/user/profile/:id" ,(req,res) => {
//     let {id} = req.params;
//     let q=`select * from user where id = '${id}'`;
//     try {
//         connection.query(q, (err, result) =>{
//             if(err) throw err;
//             let user = result[0]
//             res.render("profile", {user});
//         })
//     } catch {
//         console.log(err);
//     }
// });

app.listen(port, () =>{
    console.log(`App is listening on ${port}.`);
});


