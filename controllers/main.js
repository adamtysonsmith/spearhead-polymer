'use strict';

let data = require('../mock-data.json');

module.exports = {
  index: (req, res, next) => res.render('index', { data: data }),
  app:   (req, res, next) => res.render('app',   { data: data })
}