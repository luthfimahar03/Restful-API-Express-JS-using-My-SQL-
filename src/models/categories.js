const conn = require("../configs/db")

module.exports = {
  getCategories: (category) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * from categories` ,
      (err,result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getByOneCategories: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * from categories WHERE id=?", data,
      (err,result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  addCategories: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("INSERT INTO categories SET ?", data,
      (err,result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  updateCategories: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("UPDATE categories SET ? WHERE id=?", data,
      (err,result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteCategories: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("DELETE FROM categories WHERE id=?", data,
      (err,result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}
