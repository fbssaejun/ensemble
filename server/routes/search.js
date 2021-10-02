const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    let term = req.query.term;

    const query_users = `
      SELECT genre_id, NULL AS instrument_id, users.* FROM user_genre
      LEFT JOIN users ON users.id = user_genre.user_id
      WHERE LOWER(users.first_name) LIKE LOWER($1)
      OR LOWER(users.last_name) LIKE LOWER($1)
      OR LOWER(users.username) LIKE LOWER($1)
      UNION
      SELECT NULL AS genre_id, instrument_id, users.* FROM user_instrument
      LEFT JOIN users ON users.id = user_instrument.user_id
      WHERE LOWER(users.first_name) LIKE LOWER($1)
      OR LOWER(users.last_name) LIKE LOWER($1)
      OR LOWER(users.username) LIKE LOWER($1);
    `;

    // to find bands when term is user name, add band leader name to band schema, also update for createband
    const query_bands = `
      SELECT genre_id, bands.*, spots.instrument_id AS spot_instrument, 
        spots.id AS spot_id, spots.user_id AS spot_user_id, spots.title AS spot_title, 
        spots.description AS spot_description FROM band_genre
      LEFT JOIN bands ON bands.id = band_genre.band_id
      LEFT JOIN spots ON bands.id = spots.band_id
      WHERE LOWER(bands.name) LIKE LOWER($1)
      OR LOWER(bands.description) LIKE LOWER($1);
    `;

    Promise.all([db.query(query_users, [`%${term}%`]), db.query(query_bands, [`%${term}%`])]).then(
      (all) => {
        const usersResult = all[0].rows;
        const bandsResult = all[1].rows;
        res.json({
          usersResult,
          bandsResult,
        });
      }
    );
  });

  return router;
};
//1. RE-SEED WITH CORRECT DATA (x)
//2. vvvvv
//promise.all the db.queries, then(all) store the results of each db query into one fat object -> res.json(fatobject)
//Promise.all([db.query(users_query),db.query(band_query)]).then(all)

/*
QUERY FOR USERS
`
SELECT genre_id, NULL AS instrument_id, users.* FROM user_genre
LEFT JOIN users ON users.id = user_genre.user_id
UNION
SELECT NULL AS genre_id, instrument_id, users.* FROM user_instrument
LEFT JOIN users ON users.id = user_instrument.user_id;
`
*/

/*
QUERY FOR BANDS
`
SELECT genre_id, bands.*, spots.id AS spot_id, spots.user_id AS spot_user_id, spots.title AS spot_title, spots.description AS spot_description FROM band_genre
LEFT JOIN bands ON bands.id = band_genre.band_id
LEFT JOIN spots ON bands.id = spots.band_id;
`
*/

/*
TESTING TERMS

SELECT genre_id, bands.*, spots.instrument_id AS spot_instrument, spots.id AS spot_id, spots.user_id AS spot_user_id, spots.title AS spot_title, spots.description AS spot_description FROM band_genre
      LEFT JOIN bands ON bands.id = band_genre.band_id
      LEFT JOIN spots ON bands.id = spots.band_id
      WHERE LOWER(bands.name) LIKE LOWER('%PO%')
      OR LOWER(bands.description) LIKE LOWER('%PO%');

*/

// const query_bands =`
// SELECT genre_id, bands.*, spots.id AS spot_id, spots.user_id AS spot_user_id, spots.title AS spot_title, spots.description AS spot_description FROM band_genre
// LEFT JOIN bands ON bands.id = band_genre.band_id
// LEFT JOIN spots ON bands.id = spots.band_id
// WHERE LOWER(bands.name) LIKE '%${term}%'
// OR LOWER(bands.description) LIKE '%${term}%'
// OR LOWER(SELECT first_name FROM users )

// `;
