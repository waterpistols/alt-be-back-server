'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Events', 'events', 'dropdown', '/events(/.*)?', false, null, 20);
		Menus.addSubMenuItem('sidebar', 'events', 'List events', 'events');
		Menus.addSubMenuItem('sidebar', 'events', 'New Event', 'events/create');
	}
]);