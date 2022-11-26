const { celebrate, Joi } = require('celebrate');
const { REGEX } = require('./constants');

const updateAvatarRule = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(REGEX),
  }),
});

const updateProfileRule = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const getUserRule = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
});

const createCardRule = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(REGEX),
  }),
});

const deleteOrLikeOrDislikeCardRule = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  updateAvatarRule,
  updateProfileRule,
  getUserRule,
  createCardRule,
  deleteOrLikeOrDislikeCardRule,
};
