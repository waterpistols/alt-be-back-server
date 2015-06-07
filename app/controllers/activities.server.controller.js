'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Activity = mongoose.model('Activity'),
	_ = require('lodash');

/**
 * Create a activity
 */
exports.create = function(req, res) {
	var activity = new Activity(req.body);
	activity.user = req.user;

	activity.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(activity);
		}
	});
};

/**
 * Show the current activity
 */
exports.read = function(req, res) {
	res.json(req.activity);
};

/**
 * Update a activity
 */
exports.update = function(req, res) {
	var activity = req.activity;

	activity = _.extend(activity, req.body);

	activity.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(activity);
		}
	});
};

/**
 * Delete an activity
 */
exports.delete = function(req, res) {
	var activity = req.activity;

	activity.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(activity);
		}
	});
};

/**
 * List of activities
 */
exports.list = function(req, res) {
	Activity.find().sort('-created').populate('user', 'displayName').exec(function(err, activities) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(activities);
		}
	});
};

/**
 * Activity middleware
 */
exports.activityByID = function(req, res, next, id) {
	Activity.findById(id).populate('user', 'displayName').exec(function(err, activity) {
		if (err) return next(err);
		if (!activity) return next(new Error('Failed to load activity ' + id));
		req.activity = activity;
		next();
	});
};

/**
 * Activity authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.activity.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};

exports.upload = function(req, res, next) {
	console.log(req);
	console.log(res);
};