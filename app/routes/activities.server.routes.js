'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	activities = require('../../app/controllers/activities.server.controller');

module.exports = function(app) {
	// Event Routes
	app.route('/activities')
		.get(activities.list)
		// .post(users.requiresLogin, activities.create);
		.post(activities.create);

	app.route('/activities/:activityId')
		.get(activities.read)
		// .put(users.requiresLogin, activities.hasAuthorization, activities.update)
		.put(activities.update)
		.delete(users.requiresLogin, activities.hasAuthorization, activities.delete);

	// Finish by binding the event middleware
	app.param('activityId', activities.activityByID);
};