'use strict';

// Configuring the Articles module
angular.module('dashboard').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Dashboard', 'dashboard', 'dropdown', '/dashboard', false, null, 0, 'icon-speedometer');
	}
]);