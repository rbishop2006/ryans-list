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

router.get("/subCat/:slug", (req, res, next) => {
  const slug = `${req.params.slug}`
  const sqlm = `
  SELECT categories.name, listings.listing_name, listings.id
  FROM listings
  LEFT JOIN categories ON listings.subCat_id = categories.id
  Where categories.slug = ?`

  conn.query(sqlm, [slug], (err, results, fields) => {
    console.log(err)
    res.json(results)
  })
})

router.get("/listing/:id", (req, res, next) => {
  const id = `${req.params.id}`
  const sqlmn = `
  SELECT listing_name, \`desc\`
  FROM listings
  WHERE listings.id = ?`
  conn.query(sqlmn, [id], (err, results, fields) => {
    res.json(results)
  })
})

module.exports = router
