'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	setting = require('../../app/controllers/setting.server.controller');

module.exports = function(app) {
	// Member Routes
	app.route('/setting')
		.get(setting.list)
		// .post(users.requiresLogin, setting.create);
		.post(setting.create);

	app.route('/setting/:settingId')
		.get(setting.read)
		// .put(users.requiresLogin, setting.hasAuthorization, setting.update)
		.put(setting.update)
		.delete(users.requiresLogin, setting.hasAuthorization, setting.delete);
	app.route('/setting/import')
		.post(setting.import);
	// Finish by binding the member middleware
	app.param('settingId', setting.settingByID);
};