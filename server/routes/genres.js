const router = require("express").Router();

module.exports = db => {
  router.get("/", (req, res) => {

    const query = `
    SELECT * FROM genres;
    `;

    db.query(query)
    .then((result) => {
      res.json(result.rows)
    })
  })

  router.get("/bands/:id", (req, res) => {

    const query = `
    SELECT band_genre.*, genres.name FROM band_genre
    LEFT JOIN genres ON genres.id = band_genre.genre_id
    WHERE band_id = $1
    `;

    db.query(query, [req.params.id])
    .then((result) => {
      res.json(result.rows)
    })

  })

  return router;
}