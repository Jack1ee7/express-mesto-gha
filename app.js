const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PAGE_NOT_FOUND } = require('./constants/constants');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '6371a44c6efd538a60dc3dca', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => res.status(PAGE_NOT_FOUND.id).send({ message: PAGE_NOT_FOUND.message }));

app.listen(3000);
