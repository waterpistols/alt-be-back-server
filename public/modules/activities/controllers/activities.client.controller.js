'use strict';

angular.module('activities').controller('ActivitiesController', ['$scope', '$stateParams', '$location', '$timeout', 'Authentication', 'Activities',
  function($scope, $stateParams, $location, $timeout, Authentication, Activities) {
    $scope.authentication = Authentication;

    $scope.create = function() {
      var activity = new Activities({
        name: this.name,
        actionLabel: this.actionLabel,
        points: this.points,
        description: this.description
      });
      activity.$save(function(response) {
        $location.path('activities/' + response._id);

        $scope.title = '';
        $scope.content = '';
        $scope.points = '';
        $scope.description = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.remove = function(activity) {
      if (activity) {
        activity.$remove();

        for (var i in $scope.activities) {
          if ($scope.activities[i] === activity) {
            $scope.activities.splice(i, 1);
          }
        }
      } else {
        $scope.activity.$remove(function() {
          $location.path('activities');
        });
      }
    };

    $scope.update = function() {
      var activity = $scope.activity;

      activity.$update(function() {
        $location.path('activities/' + activity._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.findOne = function() {
      $scope.activity = Activities.get({
        activityId: $stateParams.activityId
      });
    };

    $timeout(function(){
      var activitiesTable;  

      if ( ! $.fn.dataTable ) return;      

      activitiesTable = $('#activitiesTable').dataTable({
        'paging':   true,  // Table pagination
        'ordering': true,  // Column ordering 
        'info':     true,  // Bottom left status text        
        // Text translation options
        // Note the required keywords between underscores (e.g _MENU_)
        oLanguage: {
          sSearch:      'Search all columns:',
          sLengthMenu:  '_MENU_ records per page',
          info:         'Showing page _PAGE_ of _PAGES_',
          zeroRecords:  'Nothing found - sorry',
          infoEmpty:    'No records available',
          infoFiltered: '(filtered from _MAX_ total records)'
        }
      });
      
      $scope.activities = Activities.query(function(items) {        
        var data       = [];
        var editRoute  = '';
        var editAction = '';
        var removeAction = '';
        var action = '';

        angular.forEach(items, function(value, key) {
          action = '<div class="pull-left">';
          editRoute    = '#!/activities/' + value._id + '/edit';
          editAction   = '<a style="display:inline; margin-right: 2px;" class="btn btn-primary" href="' + editRoute + '"><i class="fa fa-edit"></i></a>';
          removeAction = '<a style="display:inline" class="btn btn-danger" data-ng-click="remove();"><i class="fa fa-trash"></i></a>';
          action += editAction + removeAction + '</div>';
          data[key]    = [value.name, value.actionLabel, value.description, value.points, action];
        });
        
        if (data.length) {
          activitiesTable.fnAddData(data);          
        }
      });

      var inputSearchClass = 'datatable_input_col_search';
      var columnInputs = $('tfoot .'+inputSearchClass);

      // On input keyup trigger filtering
      columnInputs
        .keyup(function () {
            activitiesTable.fnFilter(this.value, columnInputs.index(this));
        });
        
      $scope.$on('$destroy', function(){        
        activitiesTable.fnDestroy();        
        $('[class*=ColVis]').remove();
      });
    });    
  }
]);