'use strict';

module.exports = function(app) {
  var categoriesSrvCtrl = require('../../app/controllers/categories.server.controller');
	// Routing logic
	// ...
  app.route('/categories')
    .get(categoriesSrvCtrl.list)
    .post(categoriesSrvCtrl.create);
};
