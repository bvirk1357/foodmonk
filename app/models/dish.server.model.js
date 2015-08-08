'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Dish Schema
 */
var DishSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Dish name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Dish', DishSchema);