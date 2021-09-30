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
    SELECT user_instrument.user_id AS user_id,instruments.name AS user_instrument
    FROM user_instrument
    LEFT JOIN instruments ON instruments.id = user_instrument.instrument_id
    WHERE user_id = $1;
    `
    query_genre = `
    SELECT user_genre.user_id AS user_id, genres.name AS user_genre 
    FROM user_genre
    LEFT JOIN genres ON genres.id = user_genre.genre_id
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
