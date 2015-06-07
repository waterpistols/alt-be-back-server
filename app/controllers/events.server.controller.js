'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Event = mongoose.model('Event'),
	Comment = mongoose.model('Comment'),
	Action = mongoose.model('Action'),
	Member = mongoose.model('Member'),
	_ = require('lodash');

// Frontend
/////////////////////////////////////////////////////////////

/**
 * Post comment
 */
exports.postComment = function(req, res) {

	Member.findById(req.body.memberId).exec(function(err, member) {
		if (err) {
			return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
		}

		var comment = {
			message: req.body.message,
			user: req.body.memberId,
			userName: member.name,
			avatar: member.avatar,
			date: new Date()
		};

		Event.findById(req.body.eventId).populate('user').exec(function(err, event) {
			if (err) {
				return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
			}

			event.comments.push(comment);
			event.save();

			res.json(event);
		});
	});
}

exports.go = function(req, res) {

	Event.findById(req.body.eventId).exec(function(err, event) {
		if (err) {
			return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
		}

		event.attending.push(req.body.memberId);
		event.save();

		var action = new Action({
			category: 'event',
			action: {
				id: event._id,
				title: event.title,
				label: 'is attending'
			},
			user: req.body.memberId
		});

		action.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.json(event);
			}
		});
	});
};


// Backend
/////////////////////////////////////////////////////////////
/**
 * Create a event
 */
exports.create = function(req, res) {
	var event = new Event(req.body);
	event.user = req.user;

	event.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(event);
		}
	});
};


/**
 * Show the current event
 */
exports.read = function(req, res) {
	var event = req.event;
	event.currentUser = req.user;
	
	res.json(req.event);
};

/**
 * Update a event
 */
exports.update = function(req, res) {
	var event = req.event;

	event = _.extend(event, req.body);

	event.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(event);
		}
	});
};

/**
 * Delete an event
 */
exports.delete = function(req, res) {
	var event = req.event;

	event.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(event);
		}
	});
};

/**
 * List of events
 */
exports.list = function(req, res) {
	Event.find().sort('-created').exec(function(err, events) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(events);
		}
	});
};

/**
 * Event middleware
 */
exports.eventByID = function(req, res, next, id) {
	Event.findById(id).populate('user').exec(function(err, event) {
		if (err) return next(err);
		if (!event) return next(new Error('Failed to load event ' + id));
		req.event = event;
		next();
	});
};

/**
 * Event authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.event.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};

exports.upload = function(req, res, next) {
	var file = req.files.file;

	var event = req.event;

	event = _.extend(event, req.body);

	event.image = file.path.replace('public/', '');

	event.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(event);
		}
	});
};