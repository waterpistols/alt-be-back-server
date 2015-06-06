'use strict';

//Members service used for communicating with the articles REST endpoints
angular.module('members').factory('Members', ['$resource',
	function($resource) {
		return $resource('members/:memberId', {
			memberId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);