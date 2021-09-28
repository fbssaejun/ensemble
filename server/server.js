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
const loginApiRoutes = require('./routes/login');
app.use('/api/login', loginApiRoutes(db));
const usersApiRoutes = require('./routes/users');
app.use('/api/users', usersApiRoutes(db));
const genresApiRoutes = require('./routes/genres');
app.use('/api/genres', genresApiRoutes(db));
const bandsApiRoutes = require('./routes/bands');
app.use('/api/bands', bandsApiRoutes(db));
const spotsApiRoutes = require('./routes/spots');
app.use('/api/spots', spotsApiRoutes(db));
const instrumentsApiRoutes = require('./routes/instruments');
app.use('/api/instruments', instrumentsApiRoutes(db));
const searchApiRoutes = require('./routes/search');
app.use('/api/search', searchApiRoutes(db));


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
