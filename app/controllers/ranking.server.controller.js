'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Ranking listing
 */

 exports.list = function(req, res) {
	User.find().sort('-points').populate('user', 'displayName').exec(function(err, activities) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(user);
		}
	});
};