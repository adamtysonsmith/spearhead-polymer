'use strict';
const PublicController = require('../controllers/public');

module.exports = app => {
  app.get('/', PublicController.index)
}