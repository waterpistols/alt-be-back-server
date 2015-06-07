'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	ranking = require('../../app/controllers/ranking.server.controller');

module.exports = function(app) {
	// Event Routes
	app.route('/ranking')
		.get(ranking.list)
		// .post(users.requiresLogin, ranking.create);
		// .post(ranking.create);

	// app.route('/ranking/:userId')
	// 	.get(ranking.read)
		// .put(users.requiresLogin, ranking.hasAuthorization, ranking.update)
		// .put(ranking.update)
		// .delete(users.requiresLogin, ranking.hasAuthorization, ranking.delete);
		// .delete(ranking.delete);	

	// Finish by binding the event middleware
	// app.param('userId', ranking.userByID);
};