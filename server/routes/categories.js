const express = require("express")
const router = express.Router()
const conn = require("../db")

router.get("/categories", (req, res, next) => {
  const sql = "SELECT * FROM categories"
  conn.query(sql, (err, results, fields) => {
    res.json(results)

    results.filter()
  })
})

module.exports = router
