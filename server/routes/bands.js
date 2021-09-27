const router = require('express').Router();

module.exports = (db) => {
  router.post('/new', (req, res) => {
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
      return res.status(200).send({
        message: 'data inserted',
        result: results.rows[0],
      });
    });
  });

  return router;
};
