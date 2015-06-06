'use strict';

// Configuring the Articles module
angular.module('activities').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Activities', 'activities', 'dropdown', '/activities(/.*)?', false, null, 2, 'icon-cup');
		Menus.addSubMenuItem('sidebar', 'activities', 'List activities', 'activities');
		Menus.addSubMenuItem('sidebar', 'activities', 'New Activity', 'activities/create');
	}
]);