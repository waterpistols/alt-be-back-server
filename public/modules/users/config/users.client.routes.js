'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
			state('blank.login', {
				url: '/login',
				templateUrl: 'modules/users/views/authentication/signin.client.view.html',
			}).
			state('app.password', {
				url: '/settings/password',
				templateUrl: 'modules/users/views/settings/change-password.client.view.html',
				authenticate: true
			}).
			state('app.profile', {
				url: '/settings/profile',
				templateUrl: 'modules/users/views/settings/edit-profile.client.view.html',
				authenticate: true
			}).
			state('app.accounts', {
				url: '/settings/accounts',
				templateUrl: 'modules/users/views/settings/social-accounts.client.view.html',
				authenticate: true
			});
	}
]);