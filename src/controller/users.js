// import model
const usersModel = require("../models/users")
const conn = require("../configs/db")
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let config = require('../../auth/configs');
let middleware = require('../../auth/middleware');

module.exports = {
  login: (req, res) => {

    let username = req.body.username
    let password = req.body.password

    // const bcrypt = require('bcrypt');
    // const saltRounds = 10;
    // let salt = bcrypt.genSaltSync(saltRounds);
    // let hash = bcrypt.hashSync(password, salt);


 
    // console.log(data)
    if (username && password) {
      conn.query('SELECT * from users WHERE username =?', username, (err, result) => {
        const passwordCheck = bcrypt.compareSync(password, result[0].password)
        // console.log(result[0].password)
        console.log(passwordCheck)
        // console.log(username)
        // console.log(password)
        if (passwordCheck) {
          let token = jwt.sign({ username: username }, process.env.SECRET_KEY,  { expiresIn: "24h" })
          return res.json({
            status: 200,
            success: true,
            message: "Authentication success",
            token: token
          })

        } else {
          res.json({
            status: 400,
            success: false,
            message: "Incorrect username or password",
            username: username,
            password: password
          })
        }
        
        
      }

      )
    } else {
      res.status(400).json({
        success: false,
        message: "Please Insert username and password"
      })
    }
    // usersModel.login(data)
    //   .then(resultQuery => {

    //     let token = jwt.sign({ username: username }, config.secret, { expiresIn: "24h" })

    //     // const check = bcrypt.compareSync(password, resultQuery[0].password)

    //     res.json({
    //       success: true,
    //       message: "Authentication success",
    //       token: token,
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     res.status(500).json({
    //       status: 500,
    //       message: "error login"
    //     })
    //   })
  },
  getUsers: (req, res) => {
    let { username, password } = req.body

    const data = { username, password }
    usersModel.getUsers(data)
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "success getting all USERS",
          data: resultQuery
        })
      })
      .catch(err => {
        res.json({
          status: 500,
          message: "error getting all USERS from database"
        })
      })
  },
  getByOneUsers: (req, res) => {

    const { id } = req.params
    const { username, password } = req.body
    const data = { id, username, password }
    usersModel.getByOneUsers(data)
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "success get one data",
          data: data
        })
      })
      .catch(err => {
        res.status(400).json({
          status: 400,
          message: "error get one data from database"
        })
      })
  },

  registration: (req, res) => {
    let { username, password } = req.body


    const bcrypt = require('bcryptjs');
    const saltRounds = 10;
    if (username && password) {

      let salt = bcrypt.genSaltSync(saltRounds);
      let hash = bcrypt.hashSync(password, salt);

      const data = { username, hash }

      usersModel.registration(data).then(result => {
        res.json({
          status: 200,
          message: "registration success",
          data: data
        })
      }).catch(err => {
        res.json({
          status: 500,
          message: err
        })
      })
    } else {
      res.json({
        status: 500,
        message: err
      })
    }





    // usersModel.checkExistUsername(username).then(result => {
    //   if (result.length > 0) {
    //     return res.json({
    //       status: 200,
    //       message: "username already exist",
    //     })
    //   } else if (result.length == 0) {
    //     usersModel.registration(data)
    //       .then(resultQuery => {
    //         res.json({
    //           status: 200,
    //           message: "success getting registration Users",
    //           data: {
    //             username: req.body.username,
    //             password: hash
    //           }
    //         })
    //       })
    //       .catch(err => {
    //         res.json({
    //           status: 500,
    //           message: "error getting registration from database"
    //         })
    //       })
    //   }
    // })
  }
}
