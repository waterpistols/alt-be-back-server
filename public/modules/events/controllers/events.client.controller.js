'use strict';

angular.module('events').controller('EventsController', ['$scope', '$stateParams', '$location', '$timeout', 'Authentication', 'Events',
  function($scope, $stateParams, $location, $timeout, Authentication, Events) {
    $scope.authentication = Authentication;

    $scope.create = function() {
      var event = new Events({
        title: this.title,
        content: this.content
      });
      event.$save(function(response) {
        $location.path('events/' + response._id);

        $scope.title = '';
        $scope.content = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.remove = function(event) {
      if (event) {
        event.$remove();

        for (var i in $scope.events) {
          if ($scope.events[i] === event) {
            $scope.events.splice(i, 1);
          }
        }
      } else {
        $scope.event.$remove(function() {
          $location.path('events');
        });
      }
    };

    $scope.update = function() {
      var event = $scope.event;

      event.$update(function() {
        $location.path('events/' + event._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };        

    $scope.findOne = function() {
      $scope.event = Events.get({
        eventId: $stateParams.eventId
      });
    };

    $timeout(function(){
      var eventsTable;  

      if ( ! $.fn.dataTable ) return;      

      eventsTable = $('#eventsTable').dataTable({
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
      
      $scope.events = Events.query(function(items) {
        var data = [];
        angular.forEach(items, function(value, key) {
          data[key] = [value.title, value.content];
        });
        
        eventsTable.fnAddData(data);
      });

      var inputSearchClass = 'datatable_input_col_search';
      var columnInputs = $('tfoot .'+inputSearchClass);

      // On input keyup trigger filtering
      columnInputs
        .keyup(function () {
            eventsTable.fnFilter(this.value, columnInputs.index(this));
        });

      $scope.$on('$destroy', function(){        
        eventsTable.fnDestroy();        
        $('[class*=ColVis]').remove();
      });
    });


  }
]);