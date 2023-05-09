const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const authRouter = require('./routes/auth');
const auth = require('./middlewares/auth');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const setHeaders = require('./middlewares/cors');
const NotFoundError = require('./erorrs/not-found-error');

const app = express();

const { PORT = 3000 } = process.env;
// const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(setHeaders);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(authRouter);
app.use(auth);
app.use(router);

app.use((req, res, next) => {
  next(new NotFoundError('неправильный путь'));
});

app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT);
