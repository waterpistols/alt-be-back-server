/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

angular.module('core')
  .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
      'use strict';

      // Set the following to true to enable the HTML5 Mode
      // You may have to set <base> tag in index and a routing configuration in your server
      $locationProvider.html5Mode(false);

      // default route
      $urlRouterProvider.otherwise('/login');

      // 
      // Application Routes
      // -----------------------------------   
      $stateProvider
        .state('app', {
          // url: '/',
          abstract: true,
          templateUrl: 'modules/core/views/core.client.view.html',
          resolve: helper.resolveFor('morris', 'modernizr', 'icons', 'datatables', 'datatables-pugins', 'angularFileUpload', 'monospaced.qrcode', 'qrcode', 'inputmask', 'moment'),
        })
        
        .state('app.home', {
          url: '/home',
          templateUrl: 'modules/core/views/home.client.view.html'
        })

        .state('blank', {
          abstract: true,
          templateUrl: 'modules/core/views/blank.client.view.html'      
        })
        
        // 
        // CUSTOM RESOLVES
        //   Add your own resolves properties
        //   following this object extend
        //   method
        // ----------------------------------- 
        // .state('app.someroute', {
        //   url: '/some_url',
        //   templateUrl: 'path_to_template.html',
        //   controller: 'someController',
        //   resolve: angular.extend(
        //     helper.resolveFor(), {
        //     // YOUR RESOLVES GO HERE
        //     }
        //   )
        // })
        ;

  }])

  .run(function ($rootScope, $location, Authentication) {
      // Redirect to login if route requires auth and you're not logged in
      $rootScope.$on('$stateChangeStart', function (event, toState) {
        console.log()
        if (toState.authenticate && Authentication.user === '') {
          $location.path('/login');
        }
      });
    });
