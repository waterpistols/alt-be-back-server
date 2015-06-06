'use strict';

// Setting up route
angular.module('signin').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
			
			state('blank.signin', {
				controller: 'SignInController',
				templateUrl: 'modules/signin/views/signin.client.view.html',
			})

	}
]);