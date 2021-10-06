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
    const id = req.params.id;
    db.query('SELECT * FROM users WHERE id = $1;', [id]).then((results) => {
      res.json(results.rows[0]);
    });
  });

  router.get('/profileimgs/all', (req, res) => {
    // const username = req.params.name;
    db.query('SELECT profile_image, username FROM users;').then((results) => {
      // console.log('what are results', results);
      res.json(results.rows);
    });
  });

  router.get('/:id/edit', (req, res) => {
    // Because of the way Autocomplete component works, these queries must return the
    // user's personal instruments and genre in following format:
    // {id: instrument_id, name: instrument_name }
    // {id: genre_id, name: genre_name }

    // The queries below will return the user_instrument, and user_genre rows
    // that belong to a particular user, except it will return the id of that
    // particular instrument/genre and their name, instead of returning
    // the user_id and (genre_id/instrument_id).

    const query_inst = `
    SELECT user_instrument.instrument_id AS id, instruments.name AS name,
    instruments.instrument_image
    FROM user_instrument
    LEFT JOIN instruments ON instruments.id = user_instrument.instrument_id
    WHERE user_id = $1;
    `;
    const query_genre = `
    SELECT user_genre.genre_id AS id, genres.name AS name 
    FROM user_genre
    LEFT JOIN genres ON genres.id = user_genre.genre_id
    WHERE user_id = $1;
    `;

    Promise.all([
      db.query(query_inst, [req.params.id]),
      db.query(query_genre, [req.params.id]),
    ]).then((all) => {
      const instResult = all[0].rows;
      const genreResult = all[1].rows;
      res.json({
        instResult,
        genreResult,
      });
    });
  });

  router.post('/:id/edit', (req, res) => {
    const userId = req.params.id;

    const userInst = req.body.userInst;
    const userGenre = req.body.userGenre;

    let insert_inst = `
    INSERT INTO user_instrument(user_id, instrument_id)
    VALUES 
    `;

    // Add instruments to insert statement
    for (const inst of userInst) {
      insert_inst += `(${userId}, ${inst.id}), `;
    }

    insert_inst = insert_inst.substring(0, insert_inst.length - 2) + ';';

    // If no instrument is added, set insert statement to empty string
    if (userInst.length === 0) {
      insert_inst = '';
    }

    let insert_genre = `
    INSERT INTO user_genre(user_id, genre_id)
    VALUES
    `;

    // Add genres to insert statement
    for (const genre of userGenre) {
      insert_genre += `(${userId}, ${genre.id}), `;
    }

    insert_genre = insert_genre.substring(0, insert_genre.length - 2) + ';';

    // If no genre is added, set insert statement to empty string
    if (userGenre.length === 0) {
      insert_genre = '';
    }

    Promise.all([
      db.query(`DELETE FROM user_instrument WHERE user_id = $1;`, [userId]),
      db.query(`DELETE FROM user_genre WHERE user_id = $1;`, [userId]),
    ]).then((all) => {
      Promise.all([db.query(insert_inst), db.query(insert_genre)]).then((all) => {
        res.json({
          inst: all[0].rows,
          genre: all[1].rows,
        });
      });
    });
  });

  return router;
};
