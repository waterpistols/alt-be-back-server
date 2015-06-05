'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	events = require('../../app/controllers/events.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/events')
		.get(events.list)
		.post(users.requiresLogin, events.create);

	app.route('/events/:articleId')
		.get(events.read)
		.put(users.requiresLogin, events.hasAuthorization, events.update)
		.delete(users.requiresLogin, events.hasAuthorization, events.delete);

	// Finish by binding the article middleware
	app.param('eventId', events.eventByID);
};