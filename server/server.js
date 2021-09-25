const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8081;
const db = require("./db/index");

// Express Configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// ROUTERS
const loginRoutes = require('./routes/login');
app.use('/login', loginRoutes(db));
const usersRoutes = require("./routes/users");
app.use('/api/users', usersRoutes(db));
const genresRoutes = require("./routes/genres");
app.use('/api/genres', genresRoutes(db));
const bandsRoutes = require("./routes/bands");
app.use('/api/bands', bandsRoutes(db));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
