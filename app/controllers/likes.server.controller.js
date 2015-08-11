'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Like = mongoose.model('Like'),
	Confirmation = mongoose.model('Confirmation'),
	_ = require('lodash');


/**
 * Create a Like
 */
exports.create = function(req, res) {

	console.log('\nlikes.server.ctrl.create, req.body: ' + req.body + ', dishname: ' + req.body.dishname + '\n');

	var cur_dishname = req.body.dishname;

	var new_like = new Like(req.body);
	new_like.user = req.user;
	new_like.username = req.user.username;
	new_like.name = req.user.displayName;

	new_like.save(function(err) {
		if (err) {
			console.log('\nERROR: likes.server.ctrl.create, err: ' + err + '\n');
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('\nSUCCESS likes.server.ctrl.create, new_like: ' + new_like + '\n');

			// schedule the counting of likes on next Node cycle
			process.nextTick(function() {

				console.log('\nChecking for enough likes.\n');

				Like.find({dishname: cur_dishname}).exec(function(err, likes){
						console.log('\n\nLikes: ' + likes + '.');
						var like_count = likes.length;
						console.log('There are currently ' + like_count + ' likes for dish(before saving new one): ' + cur_dishname + '\n\n');
						console.log('\nlikes: ' + likes + '\n');
						if(likes.length >= 1){
							console.log('**Found the confirmations case**');
							var new_confirm;
							for (var i = likes.length - 1; i >= 0; i--) {
								console.log('Creating confirmation');
								new_confirm = new Confirmation({dishname: cur_dishname, username: likes[i].username, confirm_status: false});
								new_confirm.save(function(err) {
									if (err) {
										console.log('error saving confirmation: ' + err);
									} else {
										console.log('saved confirmation');
									}
								});
							}
						}
				});
			});


			res.jsonp(new_like);
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
