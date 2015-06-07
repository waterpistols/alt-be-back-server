'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Member Schema
 */
var MemberSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	accessKey: {
		type: String,
		// required: 'accessKey cannot be blank'
	},
	type: {
		type: String
	},
	email: {
		type: String,
		required: 'email cannot be blank'
	},
	externalId: {
		type: String,
		// required: 'externalId cannot be blank'
	},
	avatar: {
		type: String
	},
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Name cannot be blank'
	},	
	phone: {
		type: String
	},
	firstLogin: {
		type: Boolean,
		default: true
	},
	points: {
		type: Number,
		default: 0
	}
});

mongoose.model('Member', MemberSchema);