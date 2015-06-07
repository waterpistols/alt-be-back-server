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
	Post = mongoose.model('Post'),
	Comment = mongoose.model('Comment'),
	Activity = mongoose.model('Activity'),
	Event = mongoose.model('Event');

// Frontend
/////////////////////////////////////////////////////////////
exports.all = function(req, res) {
	Action.find({}).populate('user').sort("-date").exec(function(err, entries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(entries);
		}
	});
	
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
