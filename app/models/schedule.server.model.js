'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Schedule Schema
 */
var ScheduleSchema = new Schema({
	name: {
		type: String,
		default: '',
		trim: true
	},
	dishname: {
		type: String,
		default: ''
		// required: 'Please assign a dish name'
	},
	cook_username: {
		type: String,
		// required: 'Please fill cook username',
		trim: true
	},
	patron_username: {
		type: String,
		required: 'Please fill patron username',
		trim: true
	},
	complete_status: {
		type: Boolean,
		default: false,
		trim: true
	},
	schedule_date: {
		type: Date,
		// required: 'Please assign a schedule date',
		default: Date.now
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

mongoose.model('Schedule', ScheduleSchema);
