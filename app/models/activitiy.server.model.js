'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Activity Schema
 */
var ActivitySchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Name cannot be blank'
	},
	actionLabel: {
		type: String,
		default: '',
		trim: true		
	},
	image: {
		type: String,
		default: '',
		trim: true		
	},
	points: {
		type: Number,
		default: '',
		trim: true		
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Activity', ActivitySchema);