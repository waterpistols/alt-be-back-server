'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	settings = require('../../app/controllers/settings.server.controller');

module.exports = function(app) {
	// Event Routes
	app.route('/settings')
		.get(settings.list)
		// .post(users.requiresLogin, settings.create);
		.post(settings.create);

	app.route('/settings/:settingId')
		.get(settings.read)
		// .put(users.requiresLogin, settings.hasAuthorization, settings.update)
		.put(settings.update)
		.delete(users.requiresLogin, settings.hasAuthorization, settings.delete);

	// Finish by binding the event middleware
	app.param('settingId', settings.settingByID);
};