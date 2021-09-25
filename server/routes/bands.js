const router = require('express').Router();

module.exports = (db) => {

  router.get('/', (req, res) => {
    db.query(
      `
      SELECT * FROM bands;
    `
    ).then((results) => {
      res.json(results.rows);
    });
  });

  router.get('/:id', (req, res) => {
    db.query(
      `
      SELECT * FROM bands WHERE id = ${req.params.id};
    `
    ).then((results) => {
      res.json(results.rows[0]);
    });
  });


  return router
}