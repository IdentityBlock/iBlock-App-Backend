var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var auth = require('./middlewares/auth');

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/contract');
var transactRouter = require('./routes/transact');

var app = express();
var cors = require('cors');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

app.use(auth);
app.use('/contract', usersRouter);
app.use('/transact', transactRouter);

module.exports = app;
