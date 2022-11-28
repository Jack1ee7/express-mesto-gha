const mongoose = require('mongoose');
const Card = require('../models/card');
const ForbiddenAccessError = require('../utils/errors/ForbiddenAccessError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ValidationError = require('../utils/errors/ValidationError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findById(cardId)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (card.owner.toString() !== userId) {
        throw new ForbiddenAccessError('Нельзя удалить чужую карточку');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((cardDeleted) => {
          res.send({ cardDeleted });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .orFail(new NotFoundError('Карточка с указанным _id не найдена.'))
    .then((card) => {
      res.send({ card });
    })
    .catch(next);
};
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .orFail(new NotFoundError('Карточка с указанным _id не найдена.'))
    .then((card) => {
      res.send({ card });
    })
    .catch(next);
};
