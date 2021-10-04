const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(
      `
      SELECT * FROM spots;
      `
    ).then((results) => {
      res.json(results.rows);
    });
  });

  router.get('/bands/:id', (req, res) => {

    const query = `
    SELECT spots.*, users.profile_image, users.username, users.profile_image,
    instruments.instrument_image FROM spots
    LEFT JOIN instruments ON instruments.id = spots.instrument_id
    LEFT JOIN users ON users.id = spots.user_id
    WHERE spots.band_id = $1
    ORDER BY user_id;
    `;

    db.query(query, [req.params.id]).then((results) => {
      res.json(results.rows);
    });
  });

  router.get('/users/:id', (req, res) => {
    const query = `
    SELECT bands.name AS band_name, instruments.name AS instrument_name, spots.* FROM spots
    LEFT JOIN instruments ON instruments.id = spots.instrument_id
    LEFT JOIN bands ON bands.id = spots.band_id
    WHERE spots.user_id = $1;
    `;
    db.query(query, [req.params.id]).then((results) => {
      res.json(results.rows);
    });
  });

  router.delete('/:id', (req, res) => {
    const spotId = req.params.id;
    const query = `DELETE FROM spots WHERE spots.id = $1 RETURNING *;`;

    db.query(query, [spotId]).then((results) => {
      return res.status(200).send({
        message: `spot ${spotId} removed`,
        result: results,
      });
    });
  });

  router.patch('/:id', (req, res) => {
    const spotId = req.params.id;
    const { userId } = req.body;
    console.log('patch spot_applications userid:', userId);
    const query = `UPDATE spots SET user_id = NULL WHERE spots.id = $1 RETURNING *;`;

    db.query(query, [spotId]).then((results) => {
      const updateUserAppQuery = `DELETE FROM spot_applications WHERE user_id = $1`;
      db.query(updateUserAppQuery, [userId]);
      return res.status(200).send({
        message: `spot ${spotId} updated`,
        result: results,
      });
    });
  });

  router.post('/new', (req, res) => {
    const { bandId, username, instrumentId, title, description } = req.body;
    const query = `
      INSERT INTO spots (band_id, user_id, instrument_id, title, description)
      VALUES ($1, (SELECT id AS user_id FROM users WHERE users.username = $2), $3, $4, $5) 
      RETURNING *;
    `;

    db.query(query, [bandId, username, instrumentId, title, description]).then((results) => {
      return res.status(200).send({
        message: `spot added`,
        result: results,
      });
    });
  });

  return router;
};
