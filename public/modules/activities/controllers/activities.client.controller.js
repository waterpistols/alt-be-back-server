'use strict';

angular.module('activities').controller('ActivitiesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Activities',
	function($scope, $stateParams, $location, Authentication, Activities) {
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

		$scope.find = function() {
			$scope.activities = Activities.query();			
		};

		$scope.findOne = function() {
			$scope.activity = Activities.get({
				activityId: $stateParams.activityId
			});

			console.log($scope.activity);
		};
	}
]);