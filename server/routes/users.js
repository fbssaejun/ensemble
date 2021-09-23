const router = require("express").Router();

module.exports = db => {
  router.get("/", (req, res) => {
    
    db.query(`
      SELECT * FROM users;
    `).then((results) => {
      res.json(results.rows)
    })
  })

  return router;
}