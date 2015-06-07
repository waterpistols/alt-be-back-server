'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PostSchema = new Schema({
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
	comments: [{
		type: Schema.ObjectId,
		ref: 'Comment'
	}]
});

mongoose.model('Post', PostSchema);