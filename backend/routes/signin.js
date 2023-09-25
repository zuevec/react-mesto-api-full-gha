const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  login,
} = require('../controlletrs/users');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), login);

module.exports = router;
