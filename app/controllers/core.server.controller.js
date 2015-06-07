'use strict';


/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),

	Action = mongoose.model('Action'),
	Post = mongoose.model('Post'),
	Comment = mongoose.model('Comment'),
	Activity = mongoose.model('Activity'),
	Member = mongoose.model('Member'),
	Event = mongoose.model('Event');

// Frontend
/////////////////////////////////////////////////////////////
exports.checkin = function(req, res) {

	var payload = req.body.id.split('-');
	var model = payload[0];
	var entryId = payload[1];

	if(model === 'event') {
		Event.findById(entryId).exec(function(err, event) {
			if (err) {
				return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
			}

			event.checkins.push(req.body.memberId);
			event.save();

			var action = new Action({
				category: 'event',
				action: {
					id: event._id,
					title: event.title,
					label: 'just checked in at'
				},
				user: req.body.memberId
			});

			action.save(function(err) {
				if (err) {
					return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
				}

				Member.findById(req.body.memberId).exec(function(err, member) {
					if (err) {
						return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
					}

					// Add points to user
					member.points += event.points;
					member.save(function(err) {
						if (err) {
							return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
						}

						res.json({
							'points': event.points,
							'image': event.image
						})

					});
				});

			});
		});
	} else {
		Activity.findById(entryId).exec(function(err, activity) {
			if (err) {
				return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
			}

			var action = new Action({
				category: 'activity',
				action: {
					id: activity._id,
					label: activity.actionLabel,
					image: activity.image
				},
				user: req.body.memberId
			});

			action.save(function(err) {
				if (err) {
					return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
				}

				Member.findById(req.body.memberId).exec(function(err, member) {
					if (err) {
						return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
					}

					// Add points to user
					member.points += activity.points;
					member.save(function(err) {
						if (err) {
							return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
						}

						res.json({
							'points': activity.points,
							'image': activity.image
						})

					});
				});

			});
		});
	}
};

exports.postAdd = function(req, res) {
	var post = new Post({
		message: req.body.message,
		user: req.body.memberId
	});

	post.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var action = new Action({
				category: 'post',
				action: {
					id: post._id,
					input: post.message,
					label: 'posted'
				},
				user: req.body.memberId
			});

			action.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.json(post);
				}
			});
		}
	});
};

exports.postDetail = function(req, res) {
	res.json(req.post);
};

exports.postComment = function(req, res) {
	var comment = new Comment({
		message: req.body.message,
		user: req.body.memberId
	});

	comment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}

		Post.findById(req.body.postId).exec(function(err, post) {
			if (err) {
				return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
			}

			post.comments.push(comment);
			post.save();

			res.json(post);
		});
	});
};

exports.postById = function(req, res, next, id) {
	Post.findById(id).populate('user').populate('comments').exec(function(err, post) {
		if (err) return next(err);
		if (!post) return next(new Error('Failed to load event ' + id));
		req.post = post;
		next();
	});
};


/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};