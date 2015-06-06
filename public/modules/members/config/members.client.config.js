'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Members', 'members', 'dropdown', '/members(/.*)?', false, null, 20);
		Menus.addSubMenuItem('sidebar', 'members', 'List members', 'members');
		Menus.addSubMenuItem('sidebar', 'members', 'New Member', 'members/create');
	}
]);