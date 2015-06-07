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
		type: Schema.Types.Mixed
	}]
});

mongoose.model('Post', PostSchema);