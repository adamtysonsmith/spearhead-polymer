var data = require('../mock-data.json');

module.exports = {
  index: function(req, res, next) {
    res.render('index', { data: data });
  }
}