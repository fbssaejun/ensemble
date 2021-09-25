const router = require('express').Router();


module.exports = (db) => {

  router.post('/', (req, res) => {
    const user_id = req.body.user_id;
    db.query(`
    SELECT * FROM users WHERE id = ${user_id} LIMIT 1;
    `)
    .then((results) => {
      res.json(results.rows);
    });
  })

  return router;
}





