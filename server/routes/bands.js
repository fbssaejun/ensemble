const router = require('express').Router();

module.exports = (db) => {
  router.get('/featured', (req, res) => {
    const query = `SELECT * FROM bands WHERE featured = true;`;
    db.query(query).then((results) => {
      res.json(results.rows);
    });
  });


  router.get('/:id/edit', (req,res) => {

    const query_genre = `
    SELECT band_genre.genre_id AS id, genres.name AS name 
    FROM band_genre
    LEFT JOIN genres ON genres.id = band_genre.genre_id
    WHERE band_id = $1;
    `;

    db.query(query_genre, [req.params.id])
    .then(results => {
      res.json(results.rows)
    });
  })


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

    console.log(req.body.band_genre);
    const bandGenreArr = req.body.band_genre;

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

        let genreValues = "";
        const band_id = results.rows[0].band_id
        const genre_length = bandGenreArr.length;
        for (let i = 0; i < genre_length; i ++) {
          genreValues += `(${band_id}, ${bandGenreArr[i].id}), `
        }

        let genreQuery = `
        INSERT INTO band_genre(band_id, genre_id)
        VALUES
        ${genreValues.substring(0, genreValues.length - 2)}
        RETURNING band_id;
        `;

        console.log(genreQuery)

        db.query(genreQuery).then((results) => {
          return res.status(200).send({
            message: 'data inserted',
            result: results.rows[0],
          });
        });
      });
    });
  });

  router.patch('/:id', (req, res) => {
    const bandId = req.params.id;
    const { name, description, band_image, featured } = req.body;
    const query = `
    UPDATE bands
    SET name = $1, description = $2, band_image = $3, featured = $4
    WHERE id = $5
    RETURNING *;
    `;

    db.query(query, [
      req.body.name,
      req.body.description,
      req.body.band_image,
      req.body.featured,
      bandId,
    ]).then((results) => {

      db.query(`DELETE FROM band_genre WHERE band_id = $1;`, [bandId])
      .then(results => {

        const genreUpdate = req.body.bandGenre;

        let insert_genre = `
        INSERT INTO band_genre(band_id, genre_id)
        VALUES
        `;

        for (const genre of genreUpdate) {
          insert_genre += `(${bandId}, ${genre.id}), `
        }

        insert_genre = insert_genre.substring(0, insert_genre.length - 2) + ';';

        // If no genre is added, set insert statement to empty string
        if (genreUpdate.length === 0) {
          insert_genre = ""
        }

        db.query(insert_genre).then(result => {
        })

      })

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
