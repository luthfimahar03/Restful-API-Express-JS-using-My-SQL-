// import model
const productModel = require("../models/products")
const uuidv4 = require('uuid/v4');
const conn = require("../configs/db")

module.exports = {
  getProducts: (req, res) => {
    let { name, search, sortBy, sortType, limit, page } = req.query

    name = typeof name !== 'undefined' ? name : ""
    page = typeof page !== 'undefined' ? page : 0
    limit = typeof limit !== 'undefined' ? limit : 10
    sortBy = typeof sortBy !== 'undefined' ? sortBy : "quantity"
    sortType = typeof sortType !== 'undefined' ? sortType : "ASC"

    // const {price, description, image, category, quantity} = req.body
    // const data = {price, description, image, category, quantity}
    // console.log(data)
    if (search) {
      productModel.searchProduct(search)
        .then(async resultQuery => {
          res.json({
            status: 200,
            message: "success search data by name",
            data: resultQuery
          })
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({
            status: 500,
            message: "error search data by name"
          })
        })
    } else {
      conn.query("select product.* from product", (err, result) => {
        const totalData = result.length

        if (totalData <= limit) {
          pages = 1
        } else if (totalData % limit == 0) {
          pages = totalData / limit
        } else if (totalData % limit) {
          pages = Math.round(totalData / limit)
        }

        productModel.getProducts(name, page, limit, sortBy, sortType)
          .then(async resultQuery => {
            res.json({
              totalData: totalData,
              totalPage: pages,
              status: 200,
              message: "success getting all data",
              data: resultQuery
            })
          })
          .catch(err => {
            console.log(err)
            res.status(500).json({
              status: 500,
              message: "error getting all data from database"
            })
          })


      })



    }
  },
  addProduct: (req, res) => {
    const { name, price, description, category, quantity } = req.body


    let images = req.files.image;
    let image = uuidv4() + `.${req.files.image.mimetype.split("/")[1]}`

    images.mv('uploads/' + image, function (err) {
      if (err)
        return res.status(500).send(err);
    });

    const data = { name, price, description, image, category, quantity }

    productModel.addProduct(data)
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "success adding all data",
          data: data
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({
          status: 400,
          message: "error adding data from database"
        })
      })
  },
  getByOneProducts: (req, res) => {

    const { id } = req.params

    productModel.getByOneProducts(id)
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "success get one data",
          data: resultQuery
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({
          status: 400,
          message: "error get one data from database"
        })
      })
  },
  updateProduct: (req, res) => {

    const { name, price, description, category, quantity } = req.body
    const { id } = req.params
    var data
    if (!req.files || Object.keys(req.files).length === 0) {
      data = { id, ...req.body }

    } else {
      let images = req.files.image;
      let image = uuidv4() + `.${req.files.image.mimetype.split("/")[1]}`

      images.mv('uploads/' + image, function (err) {
        if (err) res.send(err);
        console.log("success")
      })
      data = { id, image, ...req.body }
    }

    productModel.updateProduct(data)
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "success update data",
          data: data
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({
          status: 400,
          message: "error update data from database"
        })
      })
  },

  deleteProduct: (req, res) => {

    const { id } = req.params

    productModel.deleteProduct(id)
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "success delete data",
          data: req.params.id
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({
          status: 400,
          message: "error delete data from database"
        })
      })
  },
  reduceProduct: (req, res) => {


    const { id, quantity, username, total } = req.body

    const data = { id, quantity, username, total }
    // console.log(data.id)
    // console.log(data.quantity)
    // console.log(data.username)
    productModel.reduceProduct(data)
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "success",
          data: "Final Quantity is " + resultQuery
        })
      })
      .catch(err => {
        console.log(err.message)
        res.status(400).json({
          status: 400,
          message: "Sory bro, quantity is negative"
        })
      })
  },
  plusProduct: (req, res) => {

    const { id } = req.params
    const { quantity } = req.body
    const data = { quantity, id }

    productModel.plusProduct(data)
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "success",
          data: "Final Quantity is " + resultQuery
        })
      })
      .catch(err => {
        res.status(400).json({
          status: 400,
          message: err
        })
      })
  },

  getOrder: (req, res) => {
    // const {id, product, date_update, amount} = req.body
    // const data = {id, product, date_update, amount} 
    // console.log(data)
    productModel.getOrder()
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
    const {orderBy} = req.query
    console.log(orderBy)
    productModel.getRevenue()
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
