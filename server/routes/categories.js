const express = require("express")
const router = express.Router()
const conn = require("../db")

router.get("/categories", (req, res, next) => {
  const sql = "SELECT * FROM categories"

  let mainData = {}

  conn.query(sql, (err, results, fields) => {
    mainData.cats = results.filter(obj => obj.parent_id == null)

    mainData.cats.map(cat => {
      let subCats = results.filter(obj => obj.parent_id === cat.id)
      cat.subCats = subCats
    })

    res.json(mainData)
  })
})

module.exports = router
