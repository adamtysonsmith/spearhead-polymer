'use strict';

const express       = require('express');
const session       = require('express-session');
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const mongoose      = require('mongoose');

const passport      = require('passport');
const passportLocal = require('./config/passport.js');

const MainController  = require('./controllers/main.js');
const AuthController  = require('./controllers/authenticate.js');
const APIController   = require('./controllers/api.js');

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
// Initialize passport & passport session management
app.use(passport.initialize());
app.use(passport.session());


// Publicly accessible routes
app.get('/', MainController.index);

// Login and Logout
app.get('/auth/login', AuthController.login);
app.get('/auth/logout', AuthController.logout);

// Submitting & creating logins
app.post('/auth/login', AuthController.processLogin);
app.post('/auth/signup', AuthController.processSignup);


// Middleware for authenication check
// Any routes below this middleware will be redirected if not authenticated
app.use(passportLocal.ensureAuthenticated);

// Authenticated routes
app.get('/dashboard', MainController.app);
app.get('/projects', MainController.app);

// Authenticated API Routes
//app.get('/api/projects', apiController.readProject);

//app.post('/api/projects', apiController.createProject);
//app.post('/api/projects/:id/stages', apiController.createStage);
//app.post('/api/projects/:id/stages/:stageid/tasks', apiController.createTask);
//app.post('/api/projects/:id/stages/:stageid/tasks/:taskid/notes', apiController.createNote);
//app.post('/api/projects/:id/stages/:stageid/tasks/:taskid', apiController.checkTask)
//
//app.delete('/api/projects/:id/stages/:stageid/tasks/:taskid', apiController.deleteTask);
//app.delete('/api/projects/:id/stages/:stageid/tasks/:taskid/notes/:noteid', apiController.deleteNote);

// Server
const port = process.env.PORT || 3000;

const server = app.listen(port, function() {
    console.log(`Express server listening on port: ${port}`);
});
