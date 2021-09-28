const router = require('express').Router();

module.exports = (db) => {

  router.get('/', (req, res) => {
    const query = `SELECT * FROM instruments;`
    db.query(query).then((results) => {
      res.json(results.rows);
    });
  });

  return router;
};