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
  SELECT categories.name, listings.subCat_id, listings.listing_name, listings.id, listings.time_stamp, listings.location, listings.price
  FROM listings
  LEFT JOIN categories ON listings.subCat_id = categories.id
  Where categories.slug = ?
  ORDER BY listings.time_stamp DESC
  LIMIT 25`

  conn.query(sqlm, [slug], (err, results, fields) => {
    res.json(results)
  })
})

router.get("/listing/:id", (req, res, next) => {
  const id = `${req.params.id}`
  const sqln = `
  SELECT listing_name, \`desc\`, time_stamp, city, location, price
  FROM listings
  WHERE listings.id = ?`
  conn.query(sqln, [id], (err, results, fields) => {
    res.json(results)
  })
})

router.post("/subCat/:slug", (req, res, next) => {
  const slug = req.params.slug
  const title = req.body.title
  const desc = req.body.desc
  const city = req.body.city
  const location = req.body.location
  const price = req.body.price

  const sqlo = "SELECT id FROM categories WHERE slug = ?"
  const sqlp = `INSERT INTO listings(listing_name,subCat_id,\`desc\`,city,location,price)VALUES(?,?,?,?,?,?)`
  conn.query(sqlo, [slug], (err, results, fields) => {
    const subCat_id = results[0].id

    conn.query(
      sqlp,
      [title, subCat_id, desc, city, location, price],
      (err2, results2, fields2) => {
        res.json(results2)
      }
    )
  })
})

module.exports = router
