'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var dishes = require('../../app/controllers/dishes.server.controller');

	// Dishes Routes
	app.route('/dishes')
		.get(dishes.list)
		.post(users.requiresLogin, dishes.create);

	app.route('/dishes/:dishId')
		.get(dishes.dishByID)
		.put(users.requiresLogin, dishes.hasAuthorization, dishes.update)
		.delete(users.requiresLogin, dishes.hasAuthorization, dishes.delete);

	app.route('/alldishes')
		.get(dishes.listAll);



	// Finish by binding the Dish middleware
	app.param('dishId', dishes.dishByID);
};
