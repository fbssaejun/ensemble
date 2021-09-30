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

  router.get('/bands/:id', (req, res) => {
    const query = `
    SELECT * FROM spots WHERE spots.band_id = $1;
    `;
    db.query(query, [req.params.id]).then((results) => {
      res.json(results.rows);
    });
  });

  router.get('/users/:id', (req, res) => {
    const query = `
    SELECT bands.name AS band_name, instruments.name AS instrument_name, spots.* FROM spots
    LEFT JOIN instruments ON instruments.id = spots.instrument_id
    LEFT JOIN bands ON bands.id = spots.band_id
    WHERE spots.user_id = $1;
    `;
    db.query(query, [req.params.id]).then((results) => {
      res.json(results.rows);
    });
  });


  return router;
};
