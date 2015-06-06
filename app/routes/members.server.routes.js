'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	members = require('../../app/controllers/members.server.controller');

module.exports = function(app) {
	// Member Routes
	app.route('/members')
		.get(members.list)
		// .post(users.requiresLogin, members.create);
		.post(members.create);

	app.route('/members/:memberId')
		.get(members.read)
		// .put(users.requiresLogin, members.hasAuthorization, members.update)
		.put(members.update)
		.delete(users.requiresLogin, members.hasAuthorization, members.delete);
	app.route('/members/import')
		.post(members.import);
	// Finish by binding the member middleware
	app.param('memberId', members.memberByID);
};