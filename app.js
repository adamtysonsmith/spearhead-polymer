var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

var Controller  = require('./controllers/main.js');
//var cookieParser        = require('cookie-parser');
//var session             = require('express-session');
//var passport            = require('passport');
//var passportConfig      = require('./config/passport');

// Connect to spearhead database
mongoose.connect('mongodb://localhost/spearhead_2');

// Express Config
var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieParser());

// Express Session
//app.use(session({
//	secret: 'super secret app secret dont tell',
//	resave: false,
//	saveUninitialized: false
//}));

// Passport Middleware
// Initialize passport & passport session management
//app.use(passport.initialize());
//app.use(passport.session());


// Publicly accessible routes
app.get('/', Controller.index);

// Login and Logout
//app.get('/auth/login', authController.login);
//app.get('/auth/logout', authController.logout);

// Submitting & creating logins
//app.post('/auth/login', authController.processLogin);
//app.post('/auth/signup', authController.processSignup);


// Middleware for authenication check
// Any routes below this middleware will be redirected if not authenticated
//app.use(passportConfig.ensureAuthenticated);

// Authenticated routes
//app.get('/dashboard', indexController.app);
//app.get('/projects', indexController.app);
//app.get('/ng-views/:templateName', templateController.ngview);
//app.get('/partials/:partialName', templateController.partial);

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
var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
    console.log('Express server listening on port:', port);
});