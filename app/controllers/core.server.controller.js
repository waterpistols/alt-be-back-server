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

	if(payload.length !== 2) {
		res.json({ 'error': 'well cock' });
	} else {
		if(model === 'e') {
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
	}
};

exports.rank = function(req, res) {
	Member.find({}).sort("-points").exec(function(err, top) {
		if (err) {
			return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
		} else {

			// Get settings

			res.json(entries);
		}
	});
};

exports.postAdd = function(req, res) {
	Member.findById(req.body.memberId).exec(function(err, member) {
		if (err) {
			return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
		}

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
	});
};

exports.postDetail = function(req, res) {
	res.json(req.post);
};

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

		Post.findById(req.body.postId).populate('user').exec(function(err, post) {
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
	Post.findById(id).populate('user').exec(function(err, post) {
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