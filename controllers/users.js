const User = require('../models/user');
const {
  USER_NOT_FOUND,
  INVALID_DATA_USER_CREATE,
  INVALID_DATA_USER_UPDATE,
  INVALID_DATA_AVATAR_UPDATE,
  DEFAULT_ERROR,
} = require('../constants/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(DEFAULT_ERROR.id).send({ message: DEFAULT_ERROR }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(INVALID_DATA_USER_CREATE.id).send({ message: INVALID_DATA_USER_CREATE.message });
      return res.status(DEFAULT_ERROR.id).send({ message: DEFAULT_ERROR });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotFoundError') return res.status(USER_NOT_FOUND.id).send({ message: USER_NOT_FOUND.message });
      return res.status(DEFAULT_ERROR.id).send({ message: DEFAULT_ERROR });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(INVALID_DATA_USER_UPDATE.id).send({ message: INVALID_DATA_USER_UPDATE.message });
      return res.status(DEFAULT_ERROR.id).send({ message: DEFAULT_ERROR });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(INVALID_DATA_AVATAR_UPDATE.id).send({ message: INVALID_DATA_AVATAR_UPDATE.message });
      return res.status(DEFAULT_ERROR.id).send({ message: DEFAULT_ERROR });
    });
};
