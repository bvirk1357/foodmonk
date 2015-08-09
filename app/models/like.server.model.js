'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Like Schema
 */
var LikeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Like name',
		trim: true
	},
	dishname: {
		type: String,
		default: '',
		required: 'Please assign a dish name',
		trim: true
	},
	username: {
		type: String,
		required: 'Please fill username',
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

mongoose.model('Like', LikeSchema);
