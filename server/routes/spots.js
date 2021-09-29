const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(
      `
      SELECT * FROM spots;
      `
    ).then((results) => {
      res.json(results.rows);
    });
  });

  router.get('/:id', (req, res) => {
    const query = `
    SELECT * FROM spots WHERE spots.band_id = $1;
    `;
    db.query(query, [req.params.id]).then((results) => {
      res.json(results.rows);
    });
  });

  return router;
};
