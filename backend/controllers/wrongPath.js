const NotFoundError = require('../erorrs/not-found-error');

const wrongPath = (next) => next(new NotFoundError('неправильный путь'));

module.exports = { wrongPath };
