const conn = require("../configs/db")


module.exports = {
  getUsers: (data) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * from users `,
        // conn.query(`SELECT * from product JOIN categories ON product.category=categories.id ${data ? `ORDER BY ${data}` : ''}`,
        (err,result) => {
          if(!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
      })
    },
    getByOneUsers: (data) => {
      return new Promise((resolve, reject) => {
        conn.query("SELECT * from users WHERE id=?", [data, data.id],
        (err,result) => {
          if(!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
      })
    },
    checkExistUsername: (data) => {
      return new Promise((resolve, reject) => {
        conn.query(`SELECT * from users where username = ?`,data, (err, result) => {
          if(!err) resolve(result)
          else reject(err)
        })
      })
    },
    registration: (data) => {
      console.log(data)
      return new Promise((resolve, reject) => {
        conn.query("INSERT INTO users SET username=?, password=?", [data.username, data.hash],
        (err,result) => {
          console.log(result)
          if(!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
      })
    },
    // login: (data) => {
    //   return new Promise((resolve, reject) => {
    //     conn.query(`SELECT * from users WHERE username =? && password =?`, [data.username, data.password],
    //       (err,result) => {
    //         console.log(result)
    //         if(!err) {
    //           resolve(result)
    //         } else {
    //           reject(err)
    //         }
    //     })
    //   })
    // }
  }
