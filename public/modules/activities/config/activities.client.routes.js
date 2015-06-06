'use strict';

// Setting up route
angular.module('activities').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
			state('app.listActivities', {
				url: '/activities',
				templateUrl: 'modules/activities/views/list-activities.client.view.html',
				controller: 'ActivitiesController',
				authenticate: true
			}).
			state('app.createActivity', {
				url: '/activities/create',
				views: {
					'': {
						templateUrl: 'modules/activities/views/create-activity.client.view.html',
						controller: 'ActivitiesController'
					},
					'form@app.createActivity': {
						templateUrl: 'modules/activities/views/form-activity.client.view.html'
					}
				},
				authenticate: true
			}).
			state('app.viewActivity', {
				url: '/activities/:activityId',
				views: {
					'': {
						templateUrl: 'modules/activities/views/view-activity.client.view.html',
						controller: 'ActivitiesController',		
					},
					'form@app.viewActivity': {
						templateUrl: 'modules/activities/views/form-activity.client.view.html'
					}
				},
				authenticate: true
			}).
			state('app.editActivity', {
				url: '/activities/:activityId/edit',
				views: {
					'': {
						templateUrl: 'modules/activities/views/edit-activity.client.view.html',
						controller: 'ActivitiesController'		
					},
					'form@app.editActivity': {
						templateUrl: 'modules/activities/views/form-activity.client.view.html',
					}
				},
				authenticate: true
			});
	}
]);