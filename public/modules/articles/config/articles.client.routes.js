'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('app.listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html',
			authenticate: true
		}).
		state('app.createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html',
			authenticate: true
		}).
		state('app.viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html',
			controller: 'ArticlesController',
			authenticate: true
		}).
		state('app.editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html',
			authenticate: true
		});
	}
]);