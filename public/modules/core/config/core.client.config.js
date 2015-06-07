'use strict';

// Configuring the Core module
angular.module('core')
  .config(['$ocLazyLoadProvider', 'APP_REQUIRES', function ($ocLazyLoadProvider, APP_REQUIRES) {
    // Lazy Load modules configuration
    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: APP_REQUIRES.modules
    });


  }]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ( $controllerProvider, $compileProvider, $filterProvider, $provide) {
    // registering components after bootstrap
    angular.module('core').controller = $controllerProvider.register;
    angular.module('core').directive  = $compileProvider.directive;
    angular.module('core').filter     = $filterProvider.register;
    angular.module('core').factory    = $provide.factory;
    angular.module('core').service    = $provide.service;
    angular.module('core').constant   = $provide.constant;
    angular.module('core').value      = $provide.value;

  }]).config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
      prefix : 'modules/core/i18n/',
      suffix : '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();

  }])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {

    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';
  }]);

  angular.module('core').directive('morrisBar',   morrisChart('Bar')   );
  angular.module('core').directive('morrisDonut', morrisChart('Donut') );
  angular.module('core').directive('morrisLine',  morrisChart('Line')  );
  angular.module('core').directive('morrisArea',  morrisChart('Area')  );

  function morrisChart(type) {
    return function () {
      return {
        restrict: 'EA',
        scope: {
          morrisData: '=',
          morrisOptions: '='
        },
        link: function($scope, elem, attrs) {
          // start ready to watch for changes in data
          $scope.$watch("morrisData", function(newVal, oldVal) {
            if (newVal) {
              $scope.morrisInstance.setData(newVal);
              $scope.morrisInstance.redraw();
            }
          }, true);
          // the element that contains the chart
          $scope.morrisOptions.element = elem;
          // If data defined copy to options
          if($scope.morrisData)
            $scope.morrisOptions.data = $scope.morrisData;
          // Init chart
          $scope.morrisInstance = new Morris[type]($scope.morrisOptions);

        }
      }
    }
  }
