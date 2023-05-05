const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const { PORT, BASE_URL } = require('./utills/constants');
const authRouter = require('./routes/auth');
const auth = require('./middlewares/auth');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect(BASE_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(authRouter);
app.use(auth);
app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT);
