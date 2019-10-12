const express = require("express")
const Route = express.Router()


//import constroller
const productsController = require("../controller/products")

Route
    .get("/", productsController.getProducts)

    .get("/:id", productsController.getByOneProducts)
   
    .post("/", productsController.addProduct)
    .patch("/:id", productsController.updateProduct)
    .delete("/:id", productsController.deleteProduct)
    .post("/reduce", productsController.reduceProduct)
    .post("/plus/:id", productsController.plusProduct)







module.exports = Route
