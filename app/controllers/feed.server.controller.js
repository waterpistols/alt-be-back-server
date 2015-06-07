'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	async = require('async'),
	_ = require('lodash'),
	moment = require('moment'),

	Action = mongoose.model('Action'),
	Activity = mongoose.model('Activity'),
	Event = mongoose.model('Event');

exports.all = function(req, res) {
	Action.find({}).populate('user').sort({ "created": -1 }).exec(function(err, entries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(entries);
		}
	});
	
};