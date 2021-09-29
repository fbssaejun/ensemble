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

  return router;
};
