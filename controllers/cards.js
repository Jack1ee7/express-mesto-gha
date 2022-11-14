const Card = require('../models/card');
const {
  CARD_NOT_FOUND, INVALID_DATA_CARD_CREATE, INVALID_DATA_LIKE, DEFAULT_ERROR, INVALID_DATA,
} = require('../constants/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(DEFAULT_ERROR.id).send({ message: DEFAULT_ERROR }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(INVALID_DATA_CARD_CREATE.id).send({ message: INVALID_DATA_CARD_CREATE.message });
      return res.status(DEFAULT_ERROR.id).send({ message: DEFAULT_ERROR });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) return res.status(CARD_NOT_FOUND.id).send({ message: CARD_NOT_FOUND.message });
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(INVALID_DATA.id).send({ message: INVALID_DATA.message });
      if (err.name === 'NotFoundError') return res.status(CARD_NOT_FOUND.id).send({ message: CARD_NOT_FOUND.message });
      return res.status(DEFAULT_ERROR.id).send({ message: DEFAULT_ERROR });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) return res.status(CARD_NOT_FOUND.id).send({ message: CARD_NOT_FOUND.message });
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(INVALID_DATA.id).send({ message: INVALID_DATA.message });
      if (err.name === 'ValidationError') return res.status(INVALID_DATA_LIKE.id).send({ message: INVALID_DATA_LIKE.message });
      return res.status(DEFAULT_ERROR.id).send({ message: DEFAULT_ERROR });
    });
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) return res.status(CARD_NOT_FOUND.id).send({ message: CARD_NOT_FOUND.message });
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(INVALID_DATA.id).send({ message: INVALID_DATA.message });
      if (err.name === 'ValidationError') return res.status(INVALID_DATA_LIKE.id).send({ message: INVALID_DATA_LIKE.message });
      return res.status(DEFAULT_ERROR.id).send({ message: DEFAULT_ERROR });
    });
};
