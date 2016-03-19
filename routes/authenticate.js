'use strict';
const AuthController = require('../controllers/authenticate');

module.exports = app => {
  // Login and Logout
  app.get('/auth/login', AuthController.login);
  app.get('/auth/logout', AuthController.logout);
  
  // Submitting & creating logins
  app.post('/auth/login', AuthController.processLogin);
  app.post('/auth/signup', AuthController.processSignup);
}