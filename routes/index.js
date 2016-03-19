'use strict';
const passportLocal = require('../config/passport');

module.exports = app => {
  require('./public')(app);
  require('./authenticate')(app);
  
  // Routes required after this middleware must pass auth check
  app.use(passportLocal.ensureAuthenticated);
  require('./private')(app);
}