const Card = require('../models/card');
const {
  CARD_NOT_FOUND, INVALID_DATA_CARD_CREATE, INVALID_DATA_LIKE, DEFAULT_ERROR, INVALID_DATA,
} = require('../constants/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(DEFAULT_ERROR.code).send({ message: DEFAULT_ERROR }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA_CARD_CREATE.code)
          .send({ message: INVALID_DATA_CARD_CREATE.message });
      } else {
        res.status(DEFAULT_ERROR.code).send({ message: DEFAULT_ERROR });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(CARD_NOT_FOUND.code).send({ message: CARD_NOT_FOUND.message });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA.code).send({ message: INVALID_DATA.message });
      } else {
        res.status(DEFAULT_ERROR.code).send({ message: DEFAULT_ERROR });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error('CastError'))
    .then((card) => {
      if (!card) {
        res.status(CARD_NOT_FOUND.code).send({ message: CARD_NOT_FOUND.message });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA_LIKE.code).send({ message: INVALID_DATA_LIKE.message });
      } else {
        res.status(DEFAULT_ERROR.code).send({ message: DEFAULT_ERROR });
      }
    });
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error('CastError'))
    .then((card) => {
      if (!card) {
        res.status(CARD_NOT_FOUND.code).send({ message: CARD_NOT_FOUND.message });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA_LIKE.code).send({ message: INVALID_DATA_LIKE.message });
      } else {
        res.status(DEFAULT_ERROR.code).send({ message: DEFAULT_ERROR });
      }
    });
};
