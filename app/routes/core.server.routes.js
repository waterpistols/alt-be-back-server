'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');

	app.route('/').get(core.index);

	// Posts
	app.route('/post')
		.post(core.postAdd);

	app.route('/post/:postId')
		.get(core.postDetail);

	app.route('/post/comment')
		.post(core.postComment);
	
	// Finish by binding the event middleware
	app.param('postId', core.postById);

	// Scan 
	app.route('/checkin')
		.post(core.checkin);

	app.route('/rank')
		.get(core.rank);

};