'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	events = require('../../app/controllers/events.server.controller');

module.exports = function(app) {
	// Event Routes
	app.route('/events')
		.get(events.list)
		// .post(users.requiresLogin, events.create);
		.post(events.create);

	app.route('/events/:eventId')
		.get(events.read)
		// .put(users.requiresLogin, events.hasAuthorization, events.update)
		.put(events.update)
		// .delete(users.requiresLogin, events.hasAuthorization, events.delete);
		.delete(events.delete);

	// Finish by binding the event middleware
	app.param('eventId', events.eventByID);
};