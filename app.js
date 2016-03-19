'use strict';
const express       = require('express');
const session       = require('express-session');
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const mongoose      = require('mongoose');
const passport      = require('passport');

// Connect to spearhead database
mongoose.connect('mongodb://localhost/spearhead_2');

// Express Config
const app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Express Session
app.use(session({
  secret: 'super secret app secret dont tell',
  resave: false,
  saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Load Routes
require('./routes')(app);

// Server
const port = process.env.PORT || 3000;

const server = app.listen(port, function() {
    console.log(`Express server listening on port: ${port}`);
});
