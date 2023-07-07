var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const moment = require('moment');
const exhbs = require('express-handlebars')

var indexRouter = require('./routes/index');
var pacientesRouter = require('./routes/pacientes');
var medicosRouter = require('./routes/medicos');
var citasRouter = require('./routes/citas');

var app = express();

const hbs = exhbs.create({
  extname: '.hbs',
  partialsDir:['views/componentes'],
})

hbs.handlebars.registerHelper('formatearFecha', function (date) {
  return moment(date).format('YYYY-MM-DD'); // Formato de fecha deseado
  })

// view engine setup
app.engine('.hbs', hbs.engine)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/pacientes', pacientesRouter);
app.use('/medicos', medicosRouter);
app.use('/citas', citasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
