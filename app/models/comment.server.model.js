'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	date: {
		type: Date,
		default: Date.now
	},
	message: {
		type: String,
		required: 'Message cannot be blank'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'Member'
	},
	userName: {
		type: String
	},
	avatar: {
		type: String
	}
});

mongoose.model('Comment', CommentSchema);