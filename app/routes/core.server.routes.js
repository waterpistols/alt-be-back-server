'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller'),
		feed = require('../../app/controllers/feed.server.controller');

	app.route('/').get(core.index);

	app.route('/feed')
		.get(feed.all);

	app.route('/post')
		.post(feed.postAdd);

	app.route('/post/:postId')
		.get(feed.postDetail);

	app.route('/post/comment')
		.post(feed.postComment);
	

	// Finish by binding the event middleware
	app.param('postId', feed.postById);
};