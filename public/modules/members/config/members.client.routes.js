'use strict';

// Setting up route
angular.module('members').config(['$stateProvider',
	function($stateProvider) {
		// Members state routing
		$stateProvider.
		state('app.listMembers', {
			url: '/members',
			templateUrl: 'modules/members/views/list-members.client.view.html',
			controller: 'MembersController',
			authenticate: true
		}).
		state('app.createMember', {
			url: '/members/create',
			views: {
				'': {
					templateUrl: 'modules/members/views/create-member.client.view.html',
					controller: 'MembersController'
				},
				'form@app.createMember': {
					templateUrl: 'modules/members/views/form-member.client.view.html'
				}
			},
			authenticate: true
		}).
		state('app.viewMember', {
			url: '/members/:memberId',
			views: {
				'': {
					templateUrl: 'modules/members/views/view-member.client.view.html',
					controller: 'MembersController'
				},
				'form@app.viewMember': {
					templateUrl: 'modules/members/views/form-member.client.view.html'
				}
			},
			authenticate: true
		}).
		state('app.editMember', {
			url: '/members/:memberId/edit',
			views: {
				'': {
					templateUrl: 'modules/members/views/edit-member.client.view.html',
					controller: 'MembersController'
				},
				'form@app.editMember': {
					templateUrl: 'modules/members/views/form-member.client.view.html'
				}
			},
			authenticate: true
		});
	}
]);