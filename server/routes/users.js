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

    // Because of the way Autocomplete component works, these queries must return the
    // user's personal instruments and genre in following format:
    // {id: instrument_id, name: instrument_name }
    // {id: genre_id, name: genre_name }
    
    // The queries below will return the user_instrument, and user_genre rows
    // that belong to a particular user, except it will return the id of that
    // particular instrument/genre and their name, instead of returning
    // the user_id and (genre_id/instrument_id).

    query_inst = `
    SELECT user_instrument.instrument_id AS id,instruments.name AS name
    FROM user_instrument
    LEFT JOIN instruments ON instruments.id = user_instrument.instrument_id
    WHERE user_id = $1;
    `
    query_genre = `
    SELECT user_genre.genre_id AS id, genres.name AS name 
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
