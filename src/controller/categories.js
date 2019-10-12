// import model
const categoryModel = require("../models/categories")
const redis = require("redis")
const client = redis.createClient(6379)
const myClient = "user : category"

module.exports = {
  getCategories: (req, res) => {
    return client.get(myClient, function (categories) {
      if (categories) {
        const result = JSON.parse(categories)
        return res.json({
          from: "cache",
          status: 200,
          data: result,
          message: "Show data success"
        })
      } else {
        categoryModel.getCategories()
          .then(resultQuery => {
            client.setex(myClient, 3600, JSON.stringify(resultQuery))
            res.json({
              status: 300,
              message: "success getting all data categories",
              data: resultQuery
            })
          })
          .catch(err => {
            console.log(err)
            res.status(500).json({
              status: 500,
              message: "error getting all data categories"
            })
          })
      }
    });

  },
  getByOneCategories: (req, res) => {
    const { id } = req.params
    const id_category = id
    categoryModel.getByOneCategories(id_category)
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "success get one data category",
          data: resultQuery
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({
          status: 400,
          message: "error get one data category"
        })
      })
  },

  addCategories: (req, res) => {

    const { category } = req.body
    const data = { category }
    console.log(data)

    categoryModel.addCategories(data)
      .then(resultQuery => {
        client.del(myClient, (resultQuery))
        res.json({
          status: 200,
          message: "success adding all data categories",
          data: data
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({
          status: 400,
          message: "error adding data from database categories"
        })
      })
  },
  updateCategories: (req, res) => {

    const { id } = req.params
    const id_category = id

    const data = { ...req.body }

    categoryModel.updateCategories([data, id_category])
      .then(resultQuery => {
        client.del(myClient, (resultQuery))
        res.json({
          status: 200,
          message: "success update data category",
          data: data
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({
          status: 400,
          message: "error update data category"
        })
      })
  },
  deleteCategories: (req, res) => {

    const { id } = req.params
    const id_category = id

    categoryModel.deleteCategories(id_category)
      .then(resultQuery => {
        client.del(myClient, (resultQuery))
        res.json({
          status: 200,
          message: "success delete data category",
          data: req.params.id
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({
          status: 400,
          message: "error delete data category"
        })
      })
  }
}
