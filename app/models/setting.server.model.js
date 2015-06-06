'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Setting Schema
 */
var SettingSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	label: {
		type: String,
		default: '',
		trim: true,		
	},
	value: {
		type: String,
		default: '',
		trim: true		
	},	
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Setting', SettingSchema);