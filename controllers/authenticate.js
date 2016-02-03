'use strict';

const passport = require('passport');
const User     = require('../models/user.js');

// Utility function we will use for both authentications and signups
const performLogin = (req, res, next, user) => {
  // Passport injects functionality into the express ecosystem,
  // so we are able to call req.login and pass the user we want
  // logged in.
  req.login(user, (err) => {
    // If there was an error, allow execution to move to the next middleware
    if (err) return next(err);

    // Otherwise, send the user to the app dashboard.
    return res.redirect('/dashboard');
  });
}

// Controller
const authController = {
    login: (req, res) => res.render('login'),
    logout: (req, res) => {
        // Passport injects the logout method for us to call
        req.logout();

        // Redirect back to the home page
        res.redirect('/');
	},
    processLogin: (req, res, next) => {
        // This is the post handler for login attempts
        
        // Passport's "authenticate" method returns a method, so we store it
        // in a variable and call it with the proper arguments afterwards.
        // We are using the "local" strategy defined (and used) in the
        // config/passport.js file
        var authFunction = passport.authenticate('local', (err, user, info) => {

          // If there was an error, allow execution to move to the next middleware
          if (err) return next(err);

          // If the user was not successfully logged in due to not being in the
          // database or a password mismatch, redirect to the login page
          if (!user) {
            console.log('Error logging in!', err);
            return res.redirect('/auth/login');
          }

          // If we make it this far, the user has correctly authenticated with passport
          // so now, we'll just log the user in to the system.
          performLogin(req, res, next, user);
        });

        // Now that we have the authentication method created, we'll call it here.
        authFunction(req, res, next);
	},
    processSignup: (req, res, next) => {
        // This is the post handler for signups
		// Create a new instance of the User model with the data passed to this
        // handler. By using "param," we can safely assume that this route will
        // work regardless of how the data is sent (post, get).
        // It is safer to send as post, however, because the actual data won't
        // show up in browser history.
        let user = new User({
          email: req.body.email,
          password: req.body.password
        });

        // Now that the user is created, we'll attempt to save them to the
        // database.
        user.save((err, user) => {

          // If there is an error, it will come with some special codes and
          // information. We can customize the printed message based on
          // the error mongoose encounters
          if (err) {

            // By default, we'll show a generic message...
            let errorMessage = 'An error occured, please try again';

            // If we encounter this error, the duplicate key error,
            // this means that one of our fields marked as "unique"
            // failed to validate on this object.
            if (err.code === 11000) {
              errorMessage = 'This user already exists.';
            }

            // Log the error and redirect
            console.log('Error Signing Up:', errorMessage, err);
            return res.redirect('/auth/login');
          }

          // If we make it this far, we are ready to log the user in.
          performLogin(req, res, next, user);
        });
	}
}

module.exports = authController;