'use strict';

angular.module('setting').controller('SettingController', ['$scope', '$stateParams', '$location', '$timeout', 'Authentication', 'Setting',
  function($scope, $stateParams, $location, $timeout, Authentication, Setting) {
    $scope.authentication = Authentication;

    $scope.create = function() {
      var setting = new Setting({
        label: this.label,
        value: this.value,
        
      });
      setting.$save(function(response) {
        $location.path('setting');

        $scope.label = '';
        $scope.value = '';
        
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.remove = function(setting) {
      if (setting) {
        setting.$remove();

        for (var i in $scope.setting) {
          if ($scope.setting[i] === setting) {
            $scope.setting.splice(i, 1);
          }
        }
      } else {
        $scope.setting.$remove(function() {
          $location.path('setting');
        });
      }
    };

    $scope.update = function() {
      var setting = $scope.setting;

      setting.$update(function() {
        $location.path('setting/' + setting._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.findOne = function() {
      $scope.setting = Setting.get({
        settingId: $stateParams.settingId
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
          sSearch:      'Search all columns:',
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
          removeAction = '<a style="display:inline" class="btn btn-danger" data-ng-click="remove();"><i class="fa fa-trash"></i></a>';
          action += editAction + removeAction + '</div>';
          data[key]    = [value.label, value.value, action];
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