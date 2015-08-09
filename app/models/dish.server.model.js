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
	username: {
		type: String,
		required: 'Please fill username',
		trim: true
	},
	name: {
		type: String,
		default: '',
		required: 'Please fill Dish name',
		trim: true
	},

	pic: {
		type: String,
		default: '',
		required: 'Please provide picture',
		trim: true
	},

	description: {
		type: String,
		default: '',
		required: 'Please provide description',
		trim: true
	},

	user_story: {
		type: String,
		default: '',
		required: 'Please provide user story',
		trim: true
	},

	cost: {
		type: String,
		default: '',
		required: 'Please provide cost',
		trim: true
	},

	ingredients: {
		type: String,
		default: '',
		required: 'Please provide ingredients',
		trim: true
	},

	prep_time: {
		type: String,
		default: '',
		required: 'Please provide prep time',
		trim: true
	},

	availability: {
		type: String,
		default: '',
		required: 'Please provide availability',
		trim: true
	},

	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	lat: {
		type: Number,
		default: 0
	},
	lng: {
		type: Number,
		default: 0
	}
});

mongoose.model('Dish', DishSchema);
