'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * Post Schema
 */
var PostSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	content: {
		type: String,
		trim: true,
		required: 'Content cannot be blank'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	posts: {
		type: Schema.ObjectId,
		ref: 'Comment'
	}
});

mongoose.model('Post', PostSchema);