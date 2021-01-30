var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("ccess-Control-Allow-Credentials", true);
  res.header("ccess-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Content-Lenght, X-Requested-With, Accept, Authorization");
  next();
});

// Setup Controller Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var personalRouter = require('./routes/personal');
var memberRouter = require('./routes/member');
var bookingsRouter = require('./routes/bookings');
var member_progressRouter = require('./routes/member_progress');
var member_dietRouter = require('./routes/member_diet');
var member_mealsRouter = require('./routes/member_meals');
var slotsRouter = require('./routes/slots');
var usersRouter = require('./routes/users');
var invoiceRouter = require('./routes/invoice');

//Setup Login middleware
const { login } = require('./src/middleware/token');
const auth = require('./src/middleware/auth');

//specify address and port the app will run
const hostname = '0.0.0.0';
const port = process.env.PORT;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Setup app routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/personal', personalRouter);
app.use('/member', memberRouter);
app.use('/bookings', bookingsRouter);
app.use('/member_progress', member_progressRouter);
app.use('/member_diet', member_dietRouter);
app.use('/member_meals', member_mealsRouter);
app.use('/slots', slotsRouter);
app.use('/invoice', invoiceRouter);

app.get("/", (req, res) => {
  res.json({
      gym: "app",
  });
});

//Path to login
app.post('/login', login);
app.use(auth);

//Handle error responses
app.use((req, res) => {
  res.status(404).json({
    error: 404,
    message: 'Route not found',
  });
});

app.use((req, res) => {
  res.status(403).json({
    error: 403,
    message: 'Invalid credentials!',
  });
});

app.use((req, res) => {
  res.status(401).json({
    error: 401,
    message: 'Invalid credentials!',
  });
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
// app.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);    
// });

module.exports = app;
