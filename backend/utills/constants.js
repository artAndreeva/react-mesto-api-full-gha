const regExp = /https?:\/\/(www\.)?[a-zA-Z0-9-]{1,100}\.[a-zA-Z]{1,8}[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*/;
const JWT_SECRET = '5ec8c0d866a6afd6d03ac9736278d0963453b59d50c6bf4f90431ec405185fa6';
const PORT = 3000;
const BASE_URL = 'mongodb://127.0.0.1:27017/mestodb';

module.exports = {
  regExp,
  JWT_SECRET,
  PORT,
  BASE_URL,
};
