// import all dependencies required
// import es5
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser") // for parsing req.body
const logger = require("morgan")
const fileUpload = require('express-fileupload');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()

// const expressValidator = require("express-validator")
// const expressSession = require("express-session")


// import es6
// import express from "express"

//import routes
const routerNav = require("./src/index")

// use express
const app = express()

app.use(cors())
// use body parser from json
app.use(bodyParser.json())
app.use(express.static('uploads'))
// use body parser from urlencoded
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger("dev"))
app.use(fileUpload());
// app.use(expressValidator())
// app.use(expressSession({secret: "max", saveUnitialized: false, resave: false}))


//define import
const port = process.env.SERVER_PORT || 5000



// start server
app.listen(port, function(){
  console.log(`Console sedang berjalan di Port: ${port}`)
})


// // add route/endpoint with arrow function
// app.get("/", (req,res) => {
//   res.send(`Halo cuy, selamat datang`)
// })
//
// // add product with req.body
// app.post("/product", (req,res) => {
//   // const { name, price } = req.body -----> (destructuring)
//   res.json({
//     status: "200",
//     message: "success add product",
//     data: {
//       name: req.body.name,
//       price: req.body.price
//     },
//     error: false
//   })
// })
//
// //update product with params
// app.put("/product/:productID", (req,res) => {
//   res.json({
//     status: "200",
//     message: `success update product at ${req.params.productID} `,
//     data: [],
//     error: false
//   })
// })

app.use("/", routerNav)


//add 404 not found
app.get("*", (req,res) => {
  res.send(`404 Not Found`)
})
