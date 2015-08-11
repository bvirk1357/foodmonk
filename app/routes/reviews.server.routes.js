'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var reviews = require('../../app/controllers/reviews.server.controller');

	// Reviews Routes
	app.route('/reviews')
		.get(reviews.list)
		.post(users.requiresLogin, reviews.create);

	app.route('/reviews/:reviewId')
		.get(reviews.read)
		.put(users.requiresLogin, reviews.hasAuthorization, reviews.update)
		.delete(users.requiresLogin, reviews.hasAuthorization, reviews.delete);

	// Finish by binding the Review middleware
	app.param('reviewId', reviews.reviewByID);
};
