const router = require('express').Router();

module.exports = (db) => {
  router.post('/:id', (req, res) => {
    const spotId = req.params.id;
    const { userId, message } = req.body;
    const query = `
    INSERT INTO spot_applications (spot_id, user_id , message)
    VALUES ($1, $2, $3);`;

    db.query(query, [spotId, userId, message]).then((results) => {
      return res.status(200).send({
        message: 'application received',
        result: results.rows[0],
      });
    });
  });

  router.get('/owner/:id', (req, res) => {
    const spotId = req.params.id;
    const query = `
      SELECT users.username, users.profile_image, spot_applications.*, spots.title AS spot_title, instruments.name AS instrument_name, bands.id AS band_id FROM spot_applications 
      LEFT JOIN users ON users.id = spot_applications.user_id
      LEFT JOIN spots ON spots.id = spot_applications.spot_id
      LEFT JOIN instruments ON spots.instrument_id = instruments.id
      LEFT JOIN bands ON bands.id = spots.band_id
      WHERE spot_id = $1;
    `;

    db.query(query, [spotId]).then((results) => {
      res.json(results.rows);
    });
  });

  router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const query = `
    SELECT bands.name AS band_name, bands.id AS band_id, spots.description, spots.title, instruments.name AS instrument, spot_applications.* FROM spot_applications
    LEFT JOIN spots ON spots.id = spot_applications.spot_id
    LEFT JOIN bands ON bands.id = spots.band_id
    LEFT JOIN instruments ON spots.instrument_id = instruments.id
    WHERE spot_applications.user_id = $1;
    `;

    db.query(query, [userId]).then((results) => {
      res.json(results.rows);
    });
  });

  router.patch('/:id', (req, res) => {
    const { user_id, spot_id, decision } = req.body;
    const applicationId = req.params.id;
    const query = `
    UPDATE spot_applications
    SET accepted_status = $1
    WHERE id = $2
    RETURNING *;
    `;

    db.query(query, [decision, applicationId]).then((results) => {
      if (decision) {
        const update_spot_query = `
        UPDATE spots
        SET user_id = $1
        WHERE id = $2;
        `;
        db.query(update_spot_query, [user_id, spot_id]);
      }
      return res.status(200).send({
        message: 'application updated',
        result: results,
      });
    });
  });
  return router;
};
