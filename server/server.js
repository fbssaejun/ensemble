const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;
const db = require("./db/index");

// ROUTERS
const usersRoutes = require("./routes/users");
app.use('/api/users', usersRoutes(db));

const genresRoutes = require("./routes/genres");
app.use('/api/genres', genresRoutes(db));

// Express Configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));


// Sample GET route
app.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
