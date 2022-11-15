const User = require('../models/user');
const {
  USER_NOT_FOUND,
  INVALID_DATA_USER_CREATE,
  INVALID_DATA_USER_UPDATE,
  INVALID_DATA_AVATAR_UPDATE,
  DEFAULT_ERROR,
  INVALID_DATA,
} = require('../constants/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(DEFAULT_ERROR.code).send({ message: DEFAULT_ERROR }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
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

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA.code).send({ message: INVALID_DATA.message });
      } else if (err.message === 'NotValidId') {
        res.status(USER_NOT_FOUND.code).send({ message: USER_NOT_FOUND.message });
      } else {
        res.status(DEFAULT_ERROR.code).send({ message: DEFAULT_ERROR.message });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
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
