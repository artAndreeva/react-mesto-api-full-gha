const Card = require('../models/card');
const NotFoundError = require('../erorrs/not-found-error');
const BadRequestError = require('../erorrs/bad-request-error');
const ForbiddenError = require('../erorrs/forbidden-error');

// +
const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// GET
const getAllCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

// +
const deleteCard = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка или пользователь не найден');
      }
      if (card.owner.toString() !== _id) {
        throw new ForbiddenError('Нет соответствующих прав');
      }
      Card.findByIdAndRemove(cardId)
        .then((cardToDel) => {
          res.send(cardToDel);
        })
        .catch(next);
    })
    .catch(next);
};

// +
const likeCard = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка или пользователь не найден');
      }
      res.send(card);
    })
    .catch(next);
};

// +
const unlikeCard = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка или пользователь не найден');
      }
      res.send(card);
    })
    .catch(next);
};

module.exports = {
  createCard,
  getAllCards,
  deleteCard,
  likeCard,
  unlikeCard,
};
