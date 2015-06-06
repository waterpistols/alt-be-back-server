'use strict';

// Setting up route
angular.module('setting').config(['$stateProvider',
	function($stateProvider) {
		// Members state routing
		$stateProvider.
			state('app.setting', {
				url: '/setting',
				templateUrl: 'modules/setting/views/setting.client.view.html',
				authenticate: true
			});
	}
]);