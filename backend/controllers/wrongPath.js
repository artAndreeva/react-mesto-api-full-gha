const NotFoundError = require('../erorrs/not-found-error');

const wrongPath = (res, req, next) => {
  next(new NotFoundError('неправильный путь'));
};

module.exports = { wrongPath };
