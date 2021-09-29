const router = require('express').Router();


module.exports = (db) => {

  router.post('/', (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.newEmail;
    const username = req.body.newUsername;
    const password = req.body.newPass;

    
    const query = `
    INSERT INTO users (first_name, last_name, email, username, password)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id;
    `;
    
    db.query(query, [firstName, lastName, email, username, password])
    .then((results) => {
      res.json(results.rows);
    });
  })

  return router;
}



