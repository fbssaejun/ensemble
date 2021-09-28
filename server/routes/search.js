const router = require('express').Router();

module.exports = (db) => {


  router.get('/', (req,res) => {
    let term  = req.query.term;
    console.log("this is term:", term)
    
    // query = `    
    // SELECT * FROM bands
    // WHERE LOWER(bands.name) LIKE '%${term}%';
    // `
    select_user_genres=`
    SELECT genre.name FROM genre
    INNER JOIN user_genre ON user_genre.genre_id = genre.id
    INNER JOIN users ON users.id = user_genre.user_id;
    WHERE genre.id = ${req.query.val1};
    `

    query_new = `
    SELECT id, NULL as leader_id, username AS name, first_name, last_name, NULL as description, profile_image AS image  FROM users
    WHERE LOWER(users.first_name) LIKE '%${term}%'
    OR LOWER(users.last_name) LIKE '%${term}%'
    OR LOWER(users.username) LIKE '%${term}%'
    UNION ALL
    SELECT id, leader_id, name, NULL as first_name, NULL as last_name, description, band_image FROM bands
    WHERE LOWER(bands.name) LIKE '%${term}%';
    `
    
    db.query(query_new)
    .then((results) =>{
      res.json(results.rows)
    })
  })

  return router;
}
//1. RE-SEED WITH CORRECT DATA
//2. vvvvv
//promise.all the db.queries, then(all) store the results of each db query into one fat object -> res.json(fatobject)
//Promise.all([db.query(users_query),db.query(band_query)]).then(all)

/*
QUERY FOR USERS
`
SELECT user_id, genre_id, NULL AS instrument_id, users.* FROM user_genre
LEFT JOIN users ON users.id = user_genre.user_id
UNION
SELECT user_id, NULL AS genre_id, instrument_id, users.* FROM user_instrument
LEFT JOIN users ON users.id = user_instrument.user_id;
`
*/

/*
QUERY FOR BANDS
`
SELECT band_genre.band_id, genre_id, bands.*, spots.user_id, spots.title, spots.description FROM band_genre
LEFT JOIN bands ON bands.id = band_genre.band_id
LEFT JOIN spots ON bands.id = spots.band_id;
`
*/