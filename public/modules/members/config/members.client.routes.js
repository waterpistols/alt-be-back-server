'use strict';

// Setting up route
angular.module('members').config(['$stateProvider',
	function($stateProvider) {
		// Members state routing
		$stateProvider.
		state('app.listMembers', {
			url: '/members',
			templateUrl: 'modules/members/views/list-members.client.view.html'
		}).
		state('app.createMember', {
			url: '/members/create',
			templateUrl: 'modules/members/views/create-member.client.view.html'
		}).
		state('app.viewMember', {
			url: '/members/:memberId',
			templateUrl: 'modules/members/views/view-member.client.view.html',
			controller: 'MembersController'
		}).
		state('app.editMember', {
			url: '/members/:memberId/edit',
			templateUrl: 'modules/members/views/edit-member.client.view.html'
		});
	}
]);