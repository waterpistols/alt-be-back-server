'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller'),
		feed = require('../../app/controllers/feed.server.controller');

	app.route('/').get(core.index);

	app.route('/feed')
		.get(feed.all);
};