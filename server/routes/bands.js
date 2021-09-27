const router = require('express').Router();

module.exports = (db) => {
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
      const band_id = results.rows[0].id
      for(let i=0; i < length; i++) {
        spotValues += `(${band_id}, (SELECT users.id FROM users WHERE users.username = '${spot.username[i]}'), ${spot.instrumentId[i]}, '${spot.title[i]}', '${spot.description[i]}'), `;
      }
    
      let spotQuery = `
      INSERT INTO spots(band_id, user_id, instrument_id, title, description)
      VALUES
      ${spotValues.substring(0, spotValues.length - 2)}
      RETURNING band_id;
      `
      console.log("SPOT QUERY:", spotQuery)
      db.query(spotQuery).then((results)=>{
        console.log("AFTER SPOT QUERY:", results)
        return res.status(200).send({
        message: 'data inserted',
        result: results.rows[0]
      });
     })
    });
  });

  return router;
};
