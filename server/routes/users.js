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

  router.get('/:id/edit', (req,res) => {

    query_inst = `
    SELECT * FROM uesr_instrument
    WHERE user_id = $1;
    `
    query_genre = `
    SELECT * FROM user_genre
    WHERE user_id = $1;
    `

    Promise.all([
      db.query(query_inst, [req.params.id]),
      db.query(query_genre, [req.params.id])
    ])
    .then((all) =>{
      const instResult = all[0].rows
      const genreResult = all[1].rows
      res.json({
        instResult,
        genreResult
      })
    })
  })

  return router;
};
