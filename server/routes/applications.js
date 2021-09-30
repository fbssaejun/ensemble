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

  router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const query = `
    SELECT bands.name AS band_name, spots.description, spots.title, instruments.name AS instrument, spot_applications.* FROM spot_applications
    LEFT JOIN spots ON spots.id = spot_applications.spot_id
    LEFT JOIN bands ON bands.id = spots.band_id
    LEFT JOIN instruments ON spots.instrument_id = instruments.id
    WHERE spot_applications.user_id = $1;
    `

    db.query(query, [userId]).then((results) => {
      console.log("GOT BACK FROM QUERY")
      res.json(results.rows)
      });
    });
  return router;
};
