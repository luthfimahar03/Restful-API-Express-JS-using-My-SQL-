const express = require("express")
const Route = express.Router()

const categoryController = require("../controller/categories")

Route
    .get("/", categoryController.getCategories)
    .get("/:id", categoryController.getByOneCategories)
    .post("/", categoryController.addCategories)
    .patch("/:id", categoryController.updateCategories)
    .delete("/:id", categoryController.deleteCategories)



module.exports = Route
