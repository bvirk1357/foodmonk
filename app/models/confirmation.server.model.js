'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Confirmation Schema
 */
var ConfirmationSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Confirmation name',
		trim: true
	},
	dishname: {
		type: String,
		default: '',
		required: 'Please assign a dish name'
	},
	username: {
		type: String,
		required: 'Please fill username',
		trim: true
	},
	confirm_status: {
		type: Boolean,
		default: false,
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

mongoose.model('Confirmation', ConfirmationSchema);
