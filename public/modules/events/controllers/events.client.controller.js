'use strict';

angular.module('events').controller('EventsController', [
  '$scope', 
  '$stateParams', 
  '$location', 
  '$timeout', 
  'Authentication' , 
  'FileUploader',
  'Events',
  function($scope, $stateParams, $location, $timeout, Authentication, FileUploader, Events) {
    
    $scope.authentication = Authentication;

    // $scope.uploader = new FileUploader({
    //     url: 'server/upload.php'
    // });

    $scope.event = new Events({
      repeat: 'no',
      active: true
    });

    $scope.create = function() {
      
      $scope.event.$save(function(response) {
        console.log(response);
      //   $location.path('events/' + response._id);

      //   $scope.title = '';
      //   $scope.content = '';
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


    // View
    $scope.qrOptions = {
      data: 1,
      version: 2,
      errorCorrectionLevel: 'M',
      size: 200 // px size
    };

    $scope.printQR = function() {
      var dataUrl = document.getElementsByTagName('canvas')[0].toDataURL();
      var windowContent = ['<!DOCTYPE html>',
        '<html>',
        '<head><title>Print QR Code</title></head>',
        '<body>',
        '<img src="' + dataUrl + '">',
        '</body>',
        '</html>'
      ].join('');

      var printWin = window.open('','','width=800,height=600');
      printWin.document.open();
      printWin.document.write(windowContent);
      printWin.document.close();
      printWin.focus();
      printWin.print();
      printWin.close();
    }
     
    $scope.findOne = function() {
      $scope.event = Events.get({
        eventId: $stateParams.eventId
      });
    };

    // List
    $timeout(function(){
      var eventsTable;  

      if ( ! $.fn.dataTable ) return;      

      eventsTable = $('#eventsTable').dataTable({
        'paging':   true,  // Table pagination
        'ordering': true,  // Column ordering 
        'info':     true,  // Bottom left status text        
        oLanguage: {
          sSearch:      'Search: ',
          sLengthMenu:  '_MENU_ records per page',
          info:         'Showing page _PAGE_ of _PAGES_',
          zeroRecords:  'Nothing found - sorry',
          infoEmpty:    'No records available',
          infoFiltered: '(filtered from _MAX_ total records)'
        }
      });
      
      $scope.events = Events.query(function(items) {
        var data       = [];
        var editRoute  = '';
        var editAction = '';
        var removeAction = '';
        var action = '';

        angular.forEach(items, function(value, key) {
          action = '<div class="pull-left">';
          editRoute    = '#!/events/' + value._id + '/edit';
          editAction   = '<a style="display:inline; margin-right: 2px;" class="btn btn-primary" href="' + editRoute + '"><i class="fa fa-edit"></i></a>';
          removeAction = '<a style="display:inline" class="btn btn-danger" data-ng-click="remove();"><i class="fa fa-trash"></i></a>';
          action += editAction + removeAction + '</div>';
          
          data[key] = [
            value.created,
            '-',
            '<a href="#!/events/' + value._id + '">' + value.title + '</a>',
            value.points,
            value.attending.length,
            value.location,
            value.active, 
            action
          ];

          console.log(data)
        });
        
        if (data.length) {
          eventsTable.fnAddData(data);  
        }        
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