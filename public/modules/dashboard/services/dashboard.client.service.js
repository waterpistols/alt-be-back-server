'use strict';

//Events service used for communicating with the articles REST endpoints
angular.module('events').factory('Dashboard', ['$resource',
	function($resource) {
		return $resource('/:type', {
			eventId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);