'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Review = mongoose.model('Review'),
	_ = require('lodash');

/**
 * Create a Review
 */
exports.create = function(req, res) {
	console.log('\nReviews.server.ctrl.create, req.body: ' + req.body + '\n');
	var review = new Review(req.body);
	review.user = req.user;
	review.dish = req.dish;
	review.username = req.user.username;
	review.name = req.user.displayName;

	review.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(review);
		}
	});
};

/**
 * Show the current Review
 */
exports.read = function(req, res) {
	res.jsonp(req.review);
};

/**
 * Update a Review
 */
exports.update = function(req, res) {
	var review = req.review ;

	review = _.extend(review , req.body);

	review.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(review);
		}
	});
};

/**
 * Delete an Review
 */
exports.delete = function(req, res) {
	var review = req.review ;

	review.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(review);
		}
	});
};

/**
 * List of Reviews
 */
exports.list = function(req, res) {

	Review.find().sort('-created').populate('user', 'displayName').exec(function(err, reviews) {
		console.log('this is the req\n');
		console.log(req);
		if (err) {
			console.log('\nReview failed\n');
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('\nReview listed\n');
			res.jsonp(reviews);
		}
	});
};

/**
 * Review middleware
 */
exports.reviewByID = function(req, res, next, id) {
	Review.findById(id).populate('user', 'displayName').exec(function(err, review) {
		if (err) return next(err);
		if (! review) return next(new Error('Failed to load Review ' + id));
		req.review = review ;
		next();
	});
};

/**
 * Review authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.review.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
