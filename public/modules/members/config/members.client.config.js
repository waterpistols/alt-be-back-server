'use strict';

// Configuring the Articles module
angular.module('members').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Members', 'members', 'dropdown', '/members(/.*)?', false, null, 3, 'icon-user');
	}
]);