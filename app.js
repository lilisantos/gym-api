var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');

// Controller Routes
var personalRouter = require('./routes/personal');
var memberRouter = require('./routes/member');
var bookingsRouter = require('./routes/bookings');
var member_progressRouter = require('./routes/member_progress');
var member_dietRouter = require('./routes/member_diet');
var slotsRouter = require('./routes/slots');
var usersRouter = require('./routes/users');

// Login middleware
// const users = require('./controllers/users')();
// const usersModel = require('./models/users')();
//const items = require('./controllers/items')();
const { login } = require('./src/middleware/token');
const auth = require('./src/middleware/auth');


//specify address and port the app will run
const hostname = '0.0.0.0';
const port = process.env.PORT || 8000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/personal', personalRouter);
app.use('/member', memberRouter);
app.use('/bookings', bookingsRouter);
app.use('/member_progress', member_progressRouter);
app.use('/member_diet', member_dietRouter);
app.use('/slots', slotsRouter);

app.get("/", (req, res) => {
  res.json({
      gym: "app",
  });
});

//Path to login
app.post('/login', login);
app.use(auth);

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

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);    
});

module.exports = app;
