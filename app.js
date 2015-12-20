var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var passport = require('passport');
var expressSession = require('express-session');
var passportLocal = require('passport-local')
app.use(expressSession({secret: 'mySecretKey',
    resave : false,
    saveUninitialized: false
    }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.name);
});

passport.deserializeUser(function(id, done) {
    done(null, { name: id});
});




  

//passport config

passport.use(new passportLocal.Strategy(
  function(username, password, done) {
   // User.findOne({ username: username }, function (err, user) {
   //   if (err) { return done(err); }
   //   if (!user) { return done(null, false); }
   //   if (!user.verifyPassword(password)) { return done(null, false); }
   //   return done(null, user);
    if(username == password)
    {
      return done(null, { name: username });
    }
    else return done(null, false);
    })
  
);
function verifyAuthentification(req,res, next){
  console.log("verify user ");
  if(req.isAuthenticated())
    next();
   else
    res.redirect('/login');
};
app.use('/users',verifyAuthentification);
app.get('/', function (req, res){
    res.render('index', { user: req.user,
    isAuthenticated: req.isAuthenticated()}); 
});

app.get('/users', function (req, res){
    res.render('index', { user: req.user,
    isAuthenticated: req.isAuthenticated()}); 
});


app.get('/login',function(req,res){
   res.render('login');
    
});
app.get('/logout',function(req,res){
  req.logout();
   res.redirect('/');
    
});
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
  

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
