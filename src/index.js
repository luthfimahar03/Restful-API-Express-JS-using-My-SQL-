const express = require("express")
const Route = express.Router()


//import routes
const products = require("./routes/products")
const categories = require("./routes/categories")
const users = require("./routes/users")
const order = require("./routes/order")

Route
    .use("/products", products)
    .use("/categories", categories)
    .use("/users", users)
    .use("/order", order)

module.exports = Route
