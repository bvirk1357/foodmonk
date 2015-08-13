'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Dish = mongoose.model('Dish'),
	Review = mongoose.model('Review'),
	_ = require('lodash');

/**
 * Create a Dish
 */
exports.create = function(req, res) {
	console.log('\n\n\nMade it to create\n\n');
	console.log(req.body);
	var dish = new Dish(req.body);
	dish.user = req.user;
	dish.username=req.user.username;
	console.log('req.user:' + req.user);
	dish.save(function(err) {
		if (err) {
			console.log('error' + err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('success');
			res.jsonp(dish);
		}
	});
};

/**
 * Show the current Dish
 */
exports.read = function(req, res, id) {
	console.log('\n\n\nMade it to read\n\n');
	// var ObjectId = mongoose.Types.ObjectId;
	// var query = { '_id': new ObjectId(id) };
	// Dish.find({'_id': ObjectId.fromString(id)}).exec(function(err, dish) {
	// 	// if (err) return next(err);
	// 	// if (! dish){
	// 	// 	// return next(new Error('Failed to load Dish ' + id));
	// 	// }
	// 	// req.dish = dish;
	// 	console.log('\ndish: ' + dish + '\n');
	// 	res.jsonp(dish);
	// });

	Dish.findById(id).populate('user', 'displayName').exec(function(err, dish) {
    if (err || !dish) {
    	console.log('Crashed!: ' + err + '.\n');
      return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
    } else { 
    	console.log('\ndish: ' + dish + '\n');
      res.jsonp(dish);
    }
	});

  // Dish.findOne({ '_id' : new mongoose.Types.ObjectId(id) }, function(err, dish) {
  //   if (err || !dish) {
  //   	console.log('Crashed!: ' + err + '.\n');
  //     return res.status(400).send({
		// 		message: errorHandler.getErrorMessage(err)
		// 	});
  //   } else { 
  //   	console.log('\ndish: ' + dish + '\n');
  //     res.jsonp(dish);
  //   }
  // });

};

/**
 * Update a Dish
 */
exports.update = function(req, res) {
	console.log('\n\n\nMade it to update\n\n');
	var dish = req.dish ;

	dish = _.extend(dish , req.body);

	dish.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(dish);
		}
	});
};

/**
 * Delete an Dish
 */
exports.delete = function(req, res) {
	console.log('\n\n\nMade it to delete\n\n');
	var dish = req.dish ;

	dish.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(dish);
		}
	});
};

/**
 * List of Dishes
 */
exports.list = function(req, res) {
	console.log('\n\n\nMade it to list\n\n');
	Dish.find({username: req.user.username}).sort('-created').populate('user', 'displayName').exec(function(err, dishes) {
		console.log('dishes unaltered:' + dishes);
		if (err) {
			console.log('user123:' + req.user);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('userk:' + req.user);
			res.jsonp(dishes);
		}
	});
};

/**
 * List of Dishe Locations
 */
exports.listAll = function(req, res) {
	console.log('\n\n\nMade it to listAll\n\n');
	Dish.find({}, {'name': 1, 'lat': 1, 'long': 1, 'pic': 1, 'cost': 1, 'description': 1, 'availability': 1}).exec(function(err, allDishes) {
		if (err) {
			console.log("Error:" );
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(allDishes);
		}
	});
};

/**
 * Dish middleware
 */
exports.dishByID = function(req, res, next, id) {
	console.log('\n\n\nMade it to dishbyID\n\n');
	Dish.findById(id).populate('user', 'displayName').exec(function(err, dish) {
		if (err) return next(err);
		if (! dish){
			return next(new Error('Failed to load Dish ' + id));
		}
		// req.dish = dish;
		console.log('\ndish: ' + dish + '\n');
		Review.find({dishname: dish.name}).exec(function(err, reviews) {
			console.log('reviews:' + reviews);
			if (err) {

				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				console.log('success:');
				// dish.reviews=reviews;
				res.jsonp({dish: dish, reviews: reviews});
			}
		});
		// next();
		// res.jsonp({dish: dish, reviews: reviews});
	});
};

/**
 * Dish authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	console.log('\n\n\nMade it to authorization\n\n');
	if (req.dish.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
