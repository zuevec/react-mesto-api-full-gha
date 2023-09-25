const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlPattern = require('../constant');

const {
  getUsers, getUser, editUserData, editUserAvatar, getCurrentUser,
} = require('../controlletrs/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }).unknown(true),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), editUserData);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlPattern),
  }).unknown(true),
}), editUserAvatar);

module.exports = router;
