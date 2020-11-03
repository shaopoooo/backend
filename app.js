const express = require('express');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// passport config
require('./utils/passport')(passport);

app.use(passport.initialize());

app.use('/api', routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is on ${PORT}.`);
});
