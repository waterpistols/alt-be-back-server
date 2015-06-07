'use strict';

// Setting up route
angular.module('events').config(['$stateProvider', 'RouteHelpersProvider',
	function($stateProvider, helper) {
		// Articles state routing
		$stateProvider.
			state('app.listEvents', {
				url: '/events',
				templateUrl: 'modules/events/views/list-events.client.view.html',
				controller: 'EventsController',
				authenticate: true

			}).
			state('app.createEvent', {
				url: '/events/create',
				views: {
					'': {
						templateUrl: 'modules/events/views/create-event.client.view.html',
						controller: 'EventsController',
					},
					'form@app.createEvent': {
						templateUrl: 'modules/events/views/form-event.client.view.html',
					}
				},				
				authenticate: true
			}).
			state('app.viewEvent', {
				url: '/events/:eventId',
				views: {
					'': {
						templateUrl: 'modules/events/views/view-event.client.view.html',
						controller: 'EventsController',		
					},
					'form@app.viewEvent': {
						templateUrl: 'modules/events/views/form-event.client.view.html',	
					}
				},
				authenticate: true
			}).
			state('app.editEvent', {
				url: '/events/:eventId/edit',
				views: {
					'': {
						templateUrl: 'modules/events/views/edit-event.client.view.html',
						controller: 'EventsController',
					},
					'form@app.editEvent': {
						templateUrl: 'modules/events/views/form-event.client.view.html',		
					}
				},				
				authenticate: true
			});
	}
]);