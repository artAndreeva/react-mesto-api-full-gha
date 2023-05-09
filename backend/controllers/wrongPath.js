const NotFoundError = require('../erorrs/not-found-error');

const wrongPath = (err, next) => {
  next(new NotFoundError('неправильный путь'));
};

module.exports = { wrongPath };
