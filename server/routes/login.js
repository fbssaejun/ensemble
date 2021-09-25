const router = require('express').Router();


module.exports = (db) => {

  router.post('/', (req, res) => {
    // const user_id = req.body.user_id;

    query = `SELECT * FROM users WHERE email = $1 AND password = $2 LIMIT 1;`;
    db.query(query, [req.body.email, req.body.password])
    .then((results) => {
      res.json(results.rows);
    });
  })

  return router;
}





