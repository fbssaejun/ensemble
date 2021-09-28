const router = require("express").Router();

module.exports = db => {
  router.get("/", (req, res) => {
    db.query(`
    SELECT * FROM genres;
      `)
      .then((result) => {
        res.json(result.rows)
      })
    })
  
  return router;
}