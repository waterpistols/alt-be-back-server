'use strict';

// Setting up route
angular.module('events').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
			state('app.listEvents', {
				url: '/events',
				templateUrl: 'modules/events/views/list-events.client.view.html',
				authenticate: true

			}).
			state('app.createEvent', {
				url: '/events/create',
				templateUrl: 'modules/events/views/create-event.client.view.html',
				authenticate: true
			}).
			state('app.viewEvent', {
				url: '/events/:eventId',
				templateUrl: 'modules/events/views/view-event.client.view.html',
				controller: 'EventsController',
				authenticate: true
			}).
			state('app.editEvent', {
				url: '/events/:eventId/edit',
				templateUrl: 'modules/events/views/edit-event.client.view.html',
				authenticate: true
			});
	}
]);