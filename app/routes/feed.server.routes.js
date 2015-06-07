'use strict';

module.exports = function(app) {
	// Root routing
	var feed = require('../../app/controllers/feed.server.controller');

	app.route('/feed')
		.get(feed.all);
};