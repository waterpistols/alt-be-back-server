'use strict';

angular.module('members').controller('MembersController', [
  '$scope', 
  '$state', 
  '$stateParams', 
  '$location', 
  '$timeout', 
  'Authentication', 
  'Members',
  function($scope, $state, $stateParams, $location, $timeout, Authentication, Members) {
    $scope.authentication = Authentication;

    // Create
    $scope.member = new Members();

    $scope.create = function() {
      $scope.member.$save(function(response) {
        $state.go('app.listMembers');
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove
    $scope.remove = function() {
      $scope.member.$remove(function() {
        $state.go('app.listMembers');
      });
    };


    // Update
    $scope.update = function() {
      $scope.member.$update(function() {
        $state.go('app.viewMember', { eventId: $scope.member._id})
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // View
    $scope.findOne = function(disabled) {
      if(typeof(disabled) !== 'undefined') {
        $scope.viewPage = true;
      }
      Members.get({
        memberId: $stateParams.memberId
      }, function(response) {
        $scope.member = response;
      });
    };

    $timeout(function(){
      var membersTable;  

      if ( ! $.fn.dataTable ) return;      

      membersTable = $('#membersTable').dataTable({
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
      
      $scope.members = Members.query(function(items) {        
        var data       = [];
        var editRoute  = '';
        var editAction = '';
        var removeAction = '';
        var action = '';

        angular.forEach(items, function(value, key) {
          action = '<div class="pull-left">';
          editRoute    = '#!/members/' + value._id + '/edit';
          editAction   = '<a style="display:inline; margin-right: 2px;" class="btn btn-primary" href="' + editRoute + '"><i class="fa fa-edit"></i></a>';
          action += editAction + '</div>';
          data[key] = [
            '<a href="#!/members/' + value._id + '">' + value.firstName + ' ' + value.lastName + '</a>',
            value.email,
            action
          ];
        });
        
        if (data.length) {
          membersTable.fnAddData(data);
        }
        
      });

      var inputSearchClass = 'datatable_input_col_search';
      var columnInputs = $('tfoot .'+inputSearchClass);

      // On input keyup trigger filtering
      columnInputs
        .keyup(function () {
            membersTable.fnFilter(this.value, columnInputs.index(this));
        });
      $scope.$on('$destroy', function(){        
        membersTable.fnDestroy();        
        $('[class*=ColVis]').remove();
      });
    });    
  }
]);

angular.module('members').controller('FileUploadController', ['$scope', '$stateParams', 'FileUploader',
  function($scope, $stateParams, FileUploader) {  

    var uploader = $scope.uploader = new FileUploader({
        url: 'members/import'
    });

    // FILTERS

    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);
  }
]);  