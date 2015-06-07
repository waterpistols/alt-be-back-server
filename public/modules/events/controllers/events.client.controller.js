'use strict';

angular.module('events').controller('EventsController', [
  '$scope', 
  '$state', 
  '$stateParams', 
  '$location', 
  '$timeout', 
  'Authentication' , 
  'FileUploader',
  'Events',
  function($scope, $state, $stateParams, $location, $timeout, Authentication, FileUploader, Events) {
    
    $scope.authentication = Authentication;

    // $scope.uploader = new FileUploader({
    //     url: 'server/upload.php'
    // });

    // Create
    $scope.event = new Events({
      repeat: 'no',
      active: true,
      comments: [],
      attending: [],
      checkins: []
    });

    $scope.create = function() {
      $scope.event.$save(function(response) {
        $state.go('app.listEvents');
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove
    $scope.remove = function() {
      $scope.event.$remove(function() {
        $state.go('app.listEvents');
      });
    };

    // Update
    $scope.update = function() {
      $scope.event.$update(function() {
        $state.go('app.viewEvent', { eventId: $scope.event._id})
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // View
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

    $scope.findOne = function(disabled) {
      if(typeof(disabled) !== 'undefined') {
        $scope.viewPage = true;
      }
      Events.get({
        eventId: $stateParams.eventId
      }, function(response) {
        $scope.event = response;
        $scope.startDate = moment(response.startDate).format('DD/MM/YYYY HH:MM');
        $scope.endDate = moment(response.endDate).format('DD/MM/YYYY HH:MM');

        $scope.qrOptions = {
          data: 'event-' + $scope.event._id,
          version: 2,
          errorCorrectionLevel: 'M',
          size: 200 // px size
        };

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
          action += editAction + '</div>';
          
          data[key] = [
            moment(value.created).format('DD/MM/YYYY HH:mm'),
            '-',
            '<a href="#!/events/' + value._id + '">' + value.title + '</a>',
            value.points,
            value.attending.length,
            value.location,
            value.active ? 'Yes' : 'No',
            action
          ];
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