'use strict';

//Setting service used for communicating with the articles REST endpoints
angular.module('setting').factory('Setting', ['$resource',
	function($resource) {
		return $resource('setting/:settingId', {
			settingId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);