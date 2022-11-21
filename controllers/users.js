const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');

const {
  INVALID_DATA_USER_CREATE,
  INVALID_DATA_USER_UPDATE,
  INVALID_DATA_AVATAR_UPDATE,
  DEFAULT_ERROR,
  INVALID_DATA,
  UNAUTHORIZED,
} = require('../constants/constants');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(DEFAULT_ERROR.code).send({ message: DEFAULT_ERROR }));
};

module.exports.createUser = (req, res) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA_USER_CREATE.code)
          .send({ message: INVALID_DATA_USER_CREATE.message });
      } else {
        res.status(DEFAULT_ERROR.code).send({ message: DEFAULT_ERROR });
      }
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFoundError('Пользователь с указанным _id не найден.'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA.code).send({ message: INVALID_DATA.message });
      }
      return next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь с указанным _id не найден.'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA.code).send({ message: INVALID_DATA.message });
      }
      return next(err);
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new ValidationError('Переданы некорректные данные при обновлении профиля.'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA_USER_UPDATE.code)
          .send({ message: INVALID_DATA_USER_UPDATE.message });
      } else {
        res.status(DEFAULT_ERROR.code).send({ message: DEFAULT_ERROR });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA_AVATAR_UPDATE.code)
          .send({ message: INVALID_DATA_AVATAR_UPDATE.message });
      } else {
        res.status(DEFAULT_ERROR.code).send({ message: DEFAULT_ERROR });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.status(201).send({ message: 'Авторизация успешна', token });
    })
    .catch((err) => {
      if (err.message === 'Unauthorized') {
        res.status(UNAUTHORIZED.code).send({ message: UNAUTHORIZED.message });
      }
    });
};
