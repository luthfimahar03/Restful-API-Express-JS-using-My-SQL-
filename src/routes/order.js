const express = require("express")
const Route = express.Router()

const orderController = require("../controller/order")

Route
    .get("/", orderController.getOrder)
    .get("/revenue", orderController.getRevenue)
    .get("/orderBy", orderController.getOrderBy)
    .get("/getIncome", orderController.getIncome)

module.exports = Route
 