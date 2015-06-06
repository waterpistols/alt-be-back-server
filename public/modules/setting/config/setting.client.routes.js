'use strict';

// Setting up route
angular.module('setting').config(['$stateProvider',
	function($stateProvider) {
		// Setting state routing
		$stateProvider.
		state('app.listSetting', {
			url: '/setting',
			templateUrl: 'modules/setting/views/list-setting.client.view.html',
			authenticate: true
		}).
		state('app.createSetting', {
			url: '/setting/create',
			templateUrl: 'modules/setting/views/create-setting.client.view.html',
			authenticate: true
		}).
		state('app.viewSetting', {
			url: '/setting/:settingId',
			templateUrl: 'modules/setting/views/view-setting.client.view.html',
			controller: 'SettingController',
			authenticate: true
		}).
		state('app.editSetting', {
			url: '/setting/:settingId/edit',
			templateUrl: 'modules/setting/views/edit-setting.client.view.html',
			authenticate: true
		});
	}
]);