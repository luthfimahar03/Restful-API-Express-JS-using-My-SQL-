const orderModel = require("../models/order")
const redis = require("redis")
const conn = require("../configs/db")

module.exports = {
  getOrder: (req, res) => {
    // const {id, product, date_update, amount} = req.body
    // const data = {id, product, date_update, amount} 
    // console.log(data)
    orderModel.getOrder()
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "success get Order",
          data: resultQuery
        })
      })
      .catch(err => {
        res.json({
          status: 400,
          message: err
        })
      })
  },

  getRevenue: (req, res) => {
    const { orderBy } = req.query
    orderModel.getRevenue(orderBy)
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "success get Revenue",
          data: resultQuery
        })
      })
      .catch(err => {
        res.json({
          status: 400,
          message: err
        })
      })
  },

  getOrderBy: (req, res) => {
    const { by } = req.query
    orderModel.getOrderBy(by)
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "success get Revenue",
          data: resultQuery
        })
      })
      .catch(err => {
        res.json({
          status: 400,
          message: err
        })
      })
  },

  getIncome: (req, res) => {
    orderModel.getIncome()
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "success get Revenue",
          data: resultQuery
        })
      })
      .catch(err => {
        res.json({
          status: 400,
          message: err
        })
      })
  }
}
