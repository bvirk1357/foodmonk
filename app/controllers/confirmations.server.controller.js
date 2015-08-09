'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Confirmation = mongoose.model('Confirmation'),
	_ = require('lodash');

/**
 * Create a Confirmation
 */
exports.create = function(req, res) {
	var confirmation = new Confirmation(req.body);
	confirmation.user = req.user;

	confirmation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(confirmation);
		}
	});
};

/**
 * Show the current Confirmation
 */
exports.read = function(req, res) {
	res.jsonp(req.confirmation);
};

/**
 * Update a Confirmation
 */
exports.update = function(req, res) {
	var confirmation = req.confirmation ;

	confirmation = _.extend(confirmation , req.body);

	confirmation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(confirmation);
		}
	});
};

/**
 * Delete an Confirmation
 */
exports.delete = function(req, res) {
	var confirmation = req.confirmation ;

	confirmation.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(confirmation);
		}
	});
};

/**
 * List of Confirmations
 */
exports.list = function(req, res) { 
	Confirmation.find().sort('-created').populate('user', 'displayName').exec(function(err, confirmations) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(confirmations);
		}
	});
};

/**
 * Confirmation middleware
 */
exports.confirmationByID = function(req, res, next, id) { 
	Confirmation.findById(id).populate('user', 'displayName').exec(function(err, confirmation) {
		if (err) return next(err);
		if (! confirmation) return next(new Error('Failed to load Confirmation ' + id));
		req.confirmation = confirmation ;
		next();
	});
};

/**
 * Confirmation authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.confirmation.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
