'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ActionSchema = new Schema({
	date: {
		type: Date,
		default: Date.now
	},
	category: {
		type: String,
		default: '',
		required: 'Category cannot be blank'
	},
	action: {
		type: Schema.Types.Mixed
	},
	user: {
		type: Schema.ObjectId,
		ref: 'Member'
	}
});

mongoose.model('Action', ActionSchema);