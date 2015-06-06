'use strict';

// Configuring the Articles module
angular.module('setting').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Settings', 'setting', 'dropdown', '/setting', false, null, 4, 'icon-settings');
	}
]);