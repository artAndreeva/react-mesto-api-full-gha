const NotFoundError = require('../erorrs/not-found-error');

const wrongPath = () => {
  throw new NotFoundError('неправильный путь');
};

module.exports = { wrongPath };
