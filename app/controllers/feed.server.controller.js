'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),

	Action = mongoose.model('Action');

// Frontend
/////////////////////////////////////////////////////////////
exports.all = function(req, res) {
	Action.find({}).populate('user').sort("-date").exec(function(err, entries) {
		if (err) {
			return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
		} else {
			res.json(entries);
		}
	});
};