'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Schedule = mongoose.model('Schedule'),
	Dish = mongoose.model('Dish'),
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
	Confirmation.find({username: req.user.username}).sort('-created').populate('user', 'displayName').exec(function(err, confirmations) {
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

/**
 * Confirm a single confirmation
 */
exports.confirm = function(req, res, next){

	console.log('Inside confirmation.server.confirm(), req.body.dishname: ' + req.body.dishname + ', req.body.username: ' + req.body.username + '.');

	var cur_dishname = req.body.dishname;

	Confirmation.update({'dishname': cur_dishname, 'username': req.body.username}, {$set: {'confirm_status': true} }, function(err) {
		if (err) {
			console.log('Error in updating');
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('update done');


			// For every confirmation status, check if there are enough confirmations to create a schedule entry
			process.nextTick(function() {


				console.log('\nChecking for enough "confirmed" confirmations. dishname: ' + cur_dishname + '\n');

				Confirmation.find({dishname: cur_dishname}).exec(function(err, confirmations){
						console.log('\nConfirmations: ' + confirmations + '.');

						// Check if there are any unconfirmed entries
						var all_confirmed = true;
						for (var i = confirmations.length - 1; i >= 0; i--) {
							if (confirmations[i].confirm_status == false) {
								all_confirmed = false;
							}
						};

						console.log('All confirmed? ' + all_confirmed + '.\n');

						// If all are confirmed, then create a schedule entry and remove all the confirmations
						if(all_confirmed){

							// Find the dish schedule using the dishname
							console.log('look for dish object: ' + cur_dishname + '.\n');
							Dish.find({dishname: cur_dishname}).exec(function(err,cur_dish){

								if (err) {
									return res.status(400).send({
										message: errorHandler.getErrorMessage(err)
									});
								} else {

									console.log('cur_dish: ' + cur_dish[0] + '.\n');

									//error saving schedule: ValidationError: Please assign a schedule date, Please fill cook username

									for (var i = confirmations.length - 1; i >= 0; i--) {

										console.log('\nCreating schedule with the following properties: dishname: ' + cur_dishname + ', cook_username: ' + cur_dish.username + ', patron_username: ' + confirmations[i].username + ', schedule_date: ' + cur_dish.availability + ', complete_status: ' + false + '.\n\n');

										var new_schedule = new Schedule({name: cur_dishname, cook_username: cur_dish.username, patron_username: confirmations[i].username, schedule_date: cur_dish.availability, complete_status: false});

										console.log('Created new schedule entry: ' + new_schedule);

										new_schedule.save(function(err) {
											if (err) {
												console.log('error saving schedule: ' + err);
											} else {
												console.log('saved schedule');
											}
										});

									};// for loop ends here

									// Remove confirmation entries for this dish
									Confirmation.remove({dishname: cur_dishname}, function(err) {
										if (err) {
											console.log('Error removing: ' + errorHandler.getErrorMessage(err));
										} else {
											console.log('Successfully removed confirmation');
										}
									});

								}// else page

							});

						}// if ends here

					}
				);

			});// NextTick()

			// res.jsonp({'confirmed': 'true'});
			res.jsonp();
		}// else ends here
	});

}