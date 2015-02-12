// define globals
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var FacebookStrategy = require('passport-facebook').Strategy;

var http = require('http').Server(app);
var io = require('socket.io')(http);

// Passport
require('./config/passport.js')(passport);

// set up our express application
app.use(morgan('combined')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating
app.set('views', __dirname + '/app/views');

// required for passport
app.use(session({ secret: '31aa12a5dd38d9554192aa5ad7bc1ffcade950cf' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// App
require('./app/routes.js')(app,passport);

// set up our socket server
require('./sockets/base')(io,passport);

// DB setup...
var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to our database

// start the server
http.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});

