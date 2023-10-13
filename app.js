var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const passportConfig = require('./passport-config')



/**___________________________________________________
  
                    MongoDB Connection                 
  ____________________________________________________ **/

  const mongoose = require('mongoose');

  mongoose.connect('mongodb+srv://vrutika:vrutika123@atlascluster.cfdzeov.mongodb.net/blog-app')
    .then(() => console.log('Connected!'))
    .catch((error)=>{console.log(error)});

    
    
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var categoryRouter = require('./routes/category');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// for Log in with Gmail

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/category', categoryRouter);

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
