const router = require('express').Router();

module.exports = (db) => {
  router.get('/leader-bands/:id', (req, res) => {
    const query = `SELECT * FROM bands WHERE bands.leader_id = $1;`;
    db.query(query, [req.params.id]).then((results) => {
      res.json(results.rows);
    });
  });

  router.get('/users/:id', (req, res) => {
    const query = `SELECT bands.* FROM bands JOIN spots ON spots.band_id = bands.id WHERE spots.user_id = $1;`;
    db.query(query, [req.params.id]).then((results) => {
      res.json(results.rows);
    });
  });

  router.post('/new', (req, res) => {
    const spot = req.body.spotData;
    const length = spot.title.length;
    let spotValues = '';

    const query = `
    INSERT INTO bands (leader_id, name, description, featured, band_image)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id;
    `;
    db.query(query, [
      req.body.leader_id,
      req.body.name,
      req.body.description,
      req.body.featured,
      req.body.band_image,
    ]).then((results) => {
      const band_id = results.rows[0].id;
      for (let i = 0; i < length; i++) {
        spotValues += `(${band_id}, (SELECT users.id FROM users WHERE users.username = '${spot.username[i]}'), ${spot.instrumentId[i]}, '${spot.title[i]}', '${spot.description[i]}'), `;
      }

      let spotQuery = `
      INSERT INTO spots(band_id, user_id, instrument_id, title, description)
      VALUES
      ${spotValues.substring(0, spotValues.length - 2)}
      RETURNING band_id;
      `;
      db.query(spotQuery).then((results) => {
        return res.status(200).send({
          message: 'data inserted',
          result: results.rows[0],
        });
      });
    });
  });

  router.patch('/:id', (req, res) => {
    const bandId = req.params.id;
    const { name, description, band_image, featured } = req.body;
    console.log('inside patch band id', bandId, name, description, band_image, featured);
    const query = `
    UPDATE bands
    SET name = $1, description = $2, band_image = $3, featured = $4
    WHERE id = $5;
    `;

    db.query(query, [
      req.body.name,
      req.body.description,
      req.body.band_image,
      req.body.featured,
      bandId,
    ]).then((results) => {
      return res.status(200).send({
        message: `band ${bandId} updated`,
        result: results,
      });
    });
  });

  router.delete('/:id', (req, res) => {
    const bandId = req.params.id;
    const query = `DELETE FROM bands WHERE bands.id = $1 RETURNING *;`;

    db.query(query, [bandId]).then((results) => {
      return res.status(200).send({
        message: `band ${bandId} removed`,
        result: results,
      });
    });
  });

  router.get('/:id', (req, res) => {
    const query = `SELECT * FROM bands WHERE id = $1;`;
    db.query(query, [req.params.id]).then((results) => {
      res.json(results.rows);
    });
  });

  router.get('/', (req, res) => {
    const query = `SELECT * FROM bands;`;
    db.query(query).then((results) => {
      res.json(results.rows);
    });
  });

  return router;
};
