'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var confirmations = require('../../app/controllers/confirmations.server.controller');

	// Confirmations Routes
	app.route('/confirmations')
		.get(confirmations.list)
		.post(users.requiresLogin, confirmations.create)
		.put(users.requiresLogin, confirmations.confirm);

	app.route('/confirmations/:confirmationId')
		.get(confirmations.read)
		.put(users.requiresLogin, confirmations.hasAuthorization, confirmations.update)
		.delete(users.requiresLogin, confirmations.hasAuthorization, confirmations.delete);

	// Finish by binding the Confirmation middleware
	app.param('confirmationId', confirmations.confirmationByID);
};
