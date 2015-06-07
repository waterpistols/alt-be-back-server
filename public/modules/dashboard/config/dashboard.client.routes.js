'use strict';

// Setting up route
angular.module('dashboard').config(['$stateProvider',
	function($stateProvider) {
		// Members state routing
		$stateProvider.
			state('app.dashboard', {
				url: '/dashboard',
				templateUrl: 'modules/dashboard/views/dashboard.client.view.html',
				controller: 'DashboardController',
				authenticate: true
			});
	}
]);