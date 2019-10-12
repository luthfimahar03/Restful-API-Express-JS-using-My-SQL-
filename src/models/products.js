const conn = require("../configs/db")
const uuidv4 = require('uuid/v4')

module.exports = {

  getProducts: (name, page, limit, sortBy, sortType) => {

    let pageInt = parseInt(page, 10)
    let limitInt = parseInt(limit, 10)

    return new Promise((resolve, reject) => {
      conn.query("select product.* from product join categories on product.category=categories.id WHERE name LIKE '%" + name + "%' ORDER BY " + sortBy + " " + sortType + " LIMIT " + pageInt + "," + limitInt,
        // conn.query(`SELECT * from product JOIN categories ON product.category=categories.id WHERE name  LIKE \'${"%" + name + "%"}'\ ${limit ? `LIMIT ${limit} OFFSET ${offset}` : ""} ${sort ? `ORDER BY ${sort}` : ""}`,
        // conn.query(`SELECT * from product JOIN categories ON product.category=categories.id ${data ? `ORDER BY ${data}` : ''}`,
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
    })
  },
  getByOneProducts: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * from product WHERE id=?", [data, data.id],
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
    })
  },
  addProduct: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("INSERT INTO product SET ?", data,
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
    })
  },
  updateProduct: (data) => {
    return new Promise((resolve, reject) => {
      console.log(data)
      conn.query("UPDATE product SET ? WHERE id=?", [data, data.id],
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
    })
  },
  deleteProduct: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("DELETE FROM product WHERE id=?", data,
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
    })
  },
  searchProduct: (data) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM product WHERE name LIKE ?`, [`%${data}%`],
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
    })
  },
  reduceProduct: (data) => {
    return new Promise((resolve, reject) => {
      //let countData = data.quantity
      //console.log(counData)
      // console.log(data.id)
      const data_id = uuidv4(data.id)
      // console.log(data.username)
      // console.log(data.quantity)
      
      for (let i = 0; i < data.id.length; i++) {
        let checkOut = { id : data.id[i], quantity: data.quantity[i] }
        // console.log(checkOut.id)

        conn.query("SELECT * from product WHERE id=?", [data.id[i]],
          (err, result) => {
            // console.log(result)
            if (result.length > 0) {
              let reduce = result[0].quantity - checkOut.quantity
              // console.log(result[0].quantity)
              // console.log(checkOut.quantity)
              
              if (reduce >= 0) {
                conn.query("UPDATE product SET quantity=? WHERE id=?", [reduce, checkOut.id],
                  (err, result) => {
                    // console.log(data.id[1])
                    // console.log(data.username[1])
                    // console.log(data.quantity[1])
                   console.log(data.username)
                   console.log(data.id)
                    if (!err) {
                      // for(let i = 0; i < data.id.length; i++){
                        conn.query("INSERT INTO history (id, product, amount) VALUES ('"+data_id+"', '"+ data.username+"', '"+data.total+"')", (err, result) => {
                          if (!err) {
                            resolve(result)
                          } else {
                            reject(err)
                          }
                        })
                      // }
                      console.log()
                      
                    } else {
                      reject(err)
                    }
                  })

              } else {
                result = "Out of data"
                resolve(result)
              }

            } else {
              result = "Your id is wrong"
            }
          })
      }

    })
  },
  plusProduct: (data) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * from product WHERE id=?`, [data.id],
        (err, plus) => {

          let [result] = plus
          let number_quantity = parseInt(data.quantity, 10)
          let final_quantity = result.quantity + number_quantity

          if (final_quantity >= 0) {
            conn.query("UPDATE product SET quantity=? WHERE id=?", [final_quantity, data.id],
              (err, result) => {
                if (!err) {
                  resolve(plus[0].quantity + number_quantity)
                } else {
                  reject(err)
                }
              })
          } else {
            reject(err)
          }
        })
    })
  },
}

