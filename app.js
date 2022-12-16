const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { CORS, limiter } = require('./utils/constants');
const { serverError } = require('./utils/errors/ServerError');

const { MONGO_URI } = process.env;

const app = express();

app.use('*', cors(CORS));
app.use(helmet());
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URI);

app.use(cookieParser());

app.use(requestLogger);

app.use(require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  serverError(err, req, res, next);
});

app.listen(3000);
