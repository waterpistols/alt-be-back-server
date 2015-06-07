'use strict';

angular.module('setting').controller('SettingController', [
  '$scope', 
  '$state',
  '$stateParams', 
  '$timeout', 
  'Authentication', 
  'Setting',
  function($scope, $state, $stateParams, $location, $timeout, Authentication, Setting) {
    $scope.authentication = Authentication;

    // Create
    // $scope.setting = new Setting();

    $scope.create = function() {
      $scope.setting.$save(function(response) {
        $state.go('app.listSetting');
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove
    $scope.remove = function() {
      $scope.setting.$remove(function() {
        $state.go('app.listSetting');
      });
    };
    
    // Update
    $scope.update = function() {
      $scope.setting.$update(function() {
        $state.go('app.viewSetting', { settingId: $scope.setting._id})
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.findOne = function(disabled) {
      if(typeof(disabled) !== 'undefined') {
        $scope.viewPage = true;
      }

      Setting.get({
        settingId: $stateParams.settingId
      }, function(response) {
        $scope.setting = response;
      });
    };

    $timeout(function(){
      var settingTable;  

      if ( ! $.fn.dataTable ) return;      

      settingTable = $('#settingTable').dataTable({
        'paging':   true,  // Table pagination
        'ordering': true,  // Column ordering 
        'info':     true,  // Bottom left status text        
        // Text translation options
        // Note the required keywords between underscores (e.g _MENU_)
        oLanguage: {
          sSearch:      'Search:',
          sLengthMenu:  '_MENU_ records per page',
          info:         'Showing page _PAGE_ of _PAGES_',
          zeroRecords:  'Nothing found - sorry',
          infoEmpty:    'No records available',
          infoFiltered: '(filtered from _MAX_ total records)'
        }
      });
      
      $scope.setting = Setting.query(function(items) {        
        var data       = [];
        var editRoute  = '';
        var editAction = '';
        var removeAction = '';
        var action = '';

        angular.forEach(items, function(value, key) {
          action = '<div class="pull-left">';
          editRoute    = '#!/setting/' + value._id + '/edit';
          editAction   = '<a style="display:inline; margin-right: 2px;" class="btn btn-primary" href="' + editRoute + '"><i class="fa fa-edit"></i></a>';
          action += editAction + '</div>';
          data[key] = [
            '<a href="#!/activities/' + value._id + '">' + value.label + '</a>',
            value.value, 
            action
          ];
        });
        
        if (data.length) {
          settingTable.fnAddData(data);          
        }
      });

      var inputSearchClass = 'datatable_input_col_search';
      var columnInputs = $('tfoot .'+inputSearchClass);

      // On input keyup trigger filtering
      columnInputs
        .keyup(function () {
            settingTable.fnFilter(this.value, columnInputs.index(this));
        });
        
      $scope.$on('$destroy', function(){        
        settingTable.fnDestroy();        
        $('[class*=ColVis]').remove();
      });
    });    
  }
]);