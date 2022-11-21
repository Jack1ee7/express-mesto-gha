const Card = require('../models/card');
const {
  INVALID_DATA_LIKE, DEFAULT_ERROR, INVALID_DATA,
} = require('../constants/constants');
const ForbiddenAccess = require('../errors/ForbiddenAccess');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(DEFAULT_ERROR.code).send({ message: DEFAULT_ERROR }));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .orFail(new ValidationError('Переданы некорректные данные при создании карточки'))
    .then((card) => res.send({ data: card }))
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findById(cardId)
    .then((card) => {
      if (card.owner._id.toString() !== userId) {
        throw new ForbiddenAccess('Нельзя удалить чужую карточку');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .orFail(new NotFoundError('Карточка не найдена'))
        .then((cardDeleted) => {
          res.send({ data: cardDeleted });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INVALID_DATA.code).send({ message: INVALID_DATA.message });
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Карточка с указанным _id не найдена.'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INVALID_DATA_LIKE.code).send({ message: INVALID_DATA_LIKE.message });
      }
      return next(err);
    });
};
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Карточка с указанным _id не найдена.'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INVALID_DATA_LIKE.code).send({ message: INVALID_DATA_LIKE.message });
      }
      return next(err);
    });
};
