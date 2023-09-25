const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlPattern = require('../constant');

const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controlletrs/cards');

router.get('/', getCards);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }).unknown(true),
}), deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlPattern).required(),
  }).unknown(true),
}), createCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }).unknown(true),
}), dislikeCard);

module.exports = router;
