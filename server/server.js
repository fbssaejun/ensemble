const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8081;
const db = require('./db/index');

// Express Configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// ROUTERS
const loginApiRoutes = require('./routes/api/login');
app.use('/api/login', loginApiRoutes(db));
const usersApiRoutes = require('./routes/api/users');
app.use('/api/users', usersApiRoutes(db));
const genresApiRoutes = require('./routes/api/genres');
app.use('/api/genres', genresApiRoutes(db));
const bandsApiRoutes = require('./routes/api/bands');
app.use('/api/bands', bandsApiRoutes(db));
const spotsApiRoutes = require('./routes/api/spots');
app.use('/api/spots', spotsApiRoutes(db));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
