'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Like = mongoose.model('Like'),
	_ = require('lodash');

/**
 * Create a Like
 */
exports.create = function(req, res) {

	console.log('\nlikes.server.ctrl.create, req.body: ' + req.body + '\n');

	var like = new Like(req.body);
		like.user = req.user;
		like.username = req.user.username;
		like.name = req.user.displayName;

	like.save(function(err) {
		if (err) {
			console.log('\nERROR: likes.server.ctrl.create, err: ' + err + '\n');
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('\nSUCCESS likes.server.ctrl.create, like: ' + like + '\n');
			res.jsonp(like);
		}
	});
};

/**
 * Show the current Like
 */
exports.read = function(req, res) {
	res.jsonp(req.like);
};

/**
 * Update a Like
 */
exports.update = function(req, res) {
	var like = req.like ;

	like = _.extend(like , req.body);

	like.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(like);
		}
	});
};

/**
 * Delete an Like
 */
exports.delete = function(req, res) {
	var like = req.like ;

	like.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(like);
		}
	});
};

/**
 * List of Likes
 */
exports.list = function(req, res) {
	Like.find({username: req.user.username}).sort('-created').populate('user', 'displayName').exec(function(err, likes) {
		if (err) {
			console.log('FUCK ERROR');
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('hey Im also here!!!' + likes);
			res.jsonp(likes);
		}
	});
};

/**
 * Like middleware
 */
exports.likeByID = function(req, res, next, id) {
	Like.findById(id).populate('user', 'displayName').exec(function(err, like) {
		if (err) return next(err);
		if (! like) return next(new Error('Failed to load Like ' + id));
		req.like = like ;
		next();
	});
};

/**
 * Like authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.like.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
