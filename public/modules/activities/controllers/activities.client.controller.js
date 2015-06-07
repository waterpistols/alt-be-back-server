'use strict';

angular.module('activities').controller('ActivitiesController', [
  '$scope', 
  '$stateParams', 
  '$state',
  '$location', 
  '$timeout', 
  'Authentication', 
  'Activities',
  'FileUploader',

  function($scope, $stateParams, $state, $location, $timeout, Authentication, Activities, FileUploader) {
    $scope.authentication = Authentication;

    $scope.uploader = new FileUploader({
        url: 'activities/' + $stateParams.activityId + '/upload',
        onSuccessItem: function () {
          $state.go('app.editActivity', { activityId: $scope.activity._id})
        }
    });

    // Create
    $scope.activity = new Activities();

    $scope.create = function() {
      $scope.activity.$save(function(response) {
        $state.go('app.listActivities');
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove
    $scope.remove = function() {
      $scope.activity.$remove(function() {
        $state.go('app.listActivities');
      });
    };

    // Update
    $scope.update = function() {
      $scope.activity.$update(function() {
        $state.go('app.viewActivity', { activityId: $scope.activity._id})
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

      Activities.get({
        activityId: $stateParams.activityId
      }, function(response) {
        $scope.activity = response;
        $scope.qrOptions = {
          data: 'a-' + $scope.activity._id,
          version: 2,
          errorCorrectionLevel: 'M',
          size: 200 // px size
        };

      });
    };

    // List
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
          sSearch:      'Search: ',
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
        var image = '';

        angular.forEach(items, function(value, key) {
          action = '<div class="pull-left">';
          editRoute    = '#!/activities/' + value._id + '/edit';
          editAction   = '<a style="display:inline; margin-right: 2px;" class="btn btn-primary" href="' + editRoute + '"><i class="fa fa-edit"></i></a>';
          action += editAction + '</div>';
          
          if (value.image) {            
            image += '<img height="60" width="60" src="' + value.image + '"/>';
          }

          data[key] = [
            '<a href="#!/activities/' + value._id + '">' + value.name + '</a>',
            value.actionLabel, 
            value.points,
            value.description,
            image,
            action
          ];
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