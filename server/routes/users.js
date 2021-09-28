const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(
      `
      SELECT * FROM users;
    `
    ).then((results) => {
      res.json(results.rows);
    });
  });

  router.get('/:id', (req, res) => {
    db.query(
      `
      SELECT * FROM users WHERE id = ${req.params.id};
    `
    ).then((results) => {
      res.json(results.rows[0]);
    });
  });

  return router;
};
