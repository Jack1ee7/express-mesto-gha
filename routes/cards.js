const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { createCardRule, deleteOrLikeOrDislikeCardRule } = require('../utils/validationRules');

router.get('/', getCards);
router.post('/', createCardRule, createCard);
router.delete('/:cardId', deleteOrLikeOrDislikeCardRule, deleteCard);
router.put('/:cardId/likes', deleteOrLikeOrDislikeCardRule, likeCard);
router.delete('/:cardId/likes', deleteOrLikeOrDislikeCardRule, dislikeCard);

module.exports = router;
