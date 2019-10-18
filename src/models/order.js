const conn = require("../configs/db")

module.exports = {
    getOrder: () => {
        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM history", (err, result) => {
                // console.log(result)
                // console.log(data)
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    getRevenue: (orderBy) => {
        return new Promise((resolve, reject) => {
            conn.query("SELECT *,SUM(amount) AS income, EXTRACT(YEAR FROM date_update) AS year ," +
                "DAYNAME(date_update) AS dayname, MONTHNAME(date_update) AS monthname," +
                "EXTRACT(DAY FROM date_update) AS day ,EXTRACT(MONTH FROM date_update) AS month," +
                "EXTRACT(WEEK from date_update) AS week FROM history GROUP BY " + orderBy, (err, result) => {
                    console.log(result)
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(err)
                    }
                })
        })

    }, 

    getOrderBy: (by) => {
        let orderBy = by
        let to = 0
        if (orderBy == "day") {
            to = 10
        } else if (orderBy == "month") {
            to = 7
        } else if (orderBy == "year") {
            to = 4
        }
        return new Promise((resolve, reject) => {
            conn.query("SELECT *, SUBSTR(date_update,1, " + to + ") AS dateday, SUBSTR(CURDATE(),1," + to + ") AS datenow FROM history HAVING dateday = datenow", (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    getIncome: () => {
        return new Promise((resolve, reject) => {
            conn.query("SELECT (SELECT sum(amount) FROM history WHERE DATE(date_update) = DATE(NOW() - INTERVAL 1 DAY)) AS yesterday," +
            "(SELECT sum(amount) FROM history WHERE DATE(date_update) = DATE(NOW() - INTERVAL 0 DAY)) AS daynow," +
            "(SELECT sum(amount) FROM history WHERE YEAR(date_update) = YEAR(CURDATE())-1) AS yearlast ," +
            "(SELECT sum(amount) FROM history WHERE YEAR(date_update) = YEAR(CURDATE())) AS yearnow," +
            "(SELECT COUNT(*) FROM history WHERE WEEK(date_update) = WEEK(CURDATE())-1) AS lastweek," +
            "(SELECT COUNT(*) FROM history WHERE WEEK(date_update) = WEEK(CURDATE())) AS weeknow", (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })

        })
    }
}
