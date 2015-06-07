'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Setting = mongoose.model('Setting'),
	Action = mongoose.model('Action'),
	_ = require('lodash');

/**
 * Create a setting
 */
exports.create = function(req, res) {
	var setting = new Setting(req.body);
	setting.user = req.user;

	setting.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			if(req.body.label == 'Announcement') {
				var action = new Action({
					category: 'announcement',
					action: {
						id: setting._id,
						title: setting.value,
						label: ''
					},
					user: req.body.memberId
				});

				action.save(function(err) {
					if (err) {
						return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
					}
					res.json(setting);
				});
			}
		}
	});
};

/**
 * Show the current setting
 */
exports.read = function(req, res) {
	res.json(req.setting);
};

/**
 * Update a setting
 */
exports.update = function(req, res) {
	var setting = req.setting;

	setting = _.extend(setting, req.body);

	setting.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(setting);
		}
	});
};

/**
 * Delete an setting
 */
exports.delete = function(req, res) {
	var setting = req.setting;

	setting.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(setting);
		}
	});
};

/**
 * List of settings
 */
exports.list = function(req, res) {
	Setting.find().sort('-created').populate('user', 'displayName').exec(function(err, settings) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(settings);
		}
	});
};

/**
 * Setting middleware
 */
exports.settingByID = function(req, res, next, id) {
	Setting.findById(id).populate('user', 'displayName').exec(function(err, setting) {
		if (err) return next(err);
		if (!setting) return next(new Error('Failed to load setting ' + id));
		req.setting = setting;
		next();
	});
};

/**
 * Setting authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.setting.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};

/**
 * Setting import middleware
 */
exports.import = function(req, res, next) {
	
	res.json({'msg':'da'});
};
