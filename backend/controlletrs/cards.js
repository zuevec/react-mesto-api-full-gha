const { default: mongoose } = require('mongoose');

const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const Card = require('../models/card');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .orFail()
        .then((data) => res.status(HTTP_STATUS_CREATED).send(data))
        .catch((err) => {
          if (err instanceof mongoose.Error.DocumentNotFoundError) {
            next(new NotFoundError(`Карточка по указанному _id: ${req.params.cardId} не найден`));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(HTTP_STATUS_OK).send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка с указанным _id: ${req.params.cardId} не найден`);
      }
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Карточка другого пользователя');
      }
      Card.deleteOne(card)
        .orFail()
        .then(() => {
          res.status(HTTP_STATUS_OK).send({ message: 'Карточка удалена' });
        }).catch((err) => {
          if (err instanceof mongoose.Error.CastError) {
            next(new BadRequestError(`Некорректный _id: ${req.params.userId}`));
          } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
            next(new NotFoundError(`Карточка с указанным _id: ${req.params.userId} не найден`));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(`Некорректный _id: ${req.params.userId}`));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(`Карточка с указанным _id: ${req.params.userId} не найден`));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) return res.send({ data: card });
      throw new NotFoundError(`Карточка с указанным _id: ${req.params.cardId} не найден`);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(`Некорректный _id: ${req.params.userId}`));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) return res.send({ data: card });
      throw new NotFoundError(`Карточка с указанным _id: ${req.params.cardId} не найден`);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(`Некорректный _id: ${req.params.cardId}`));
      } else {
        next(err);
      }
    });
};
