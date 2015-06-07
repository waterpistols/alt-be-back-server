'use strict';

angular.module('events').controller('DashboardController', [
  '$scope', 
  '$state', 
  '$stateParams', 
  '$location', 
  '$timeout', 
  'Authentication',
  'colors',
  'Dashboard',
  function($scope, $state, $stateParams, $location, $timeout, Authentication, colors, Dashboard) {
  	
  	// Most Popular day
  	$scope.dayData = [
      { x: "Monday", y: 100 },
      { x: "Tuesday", y: 70 },
      { x: "Wednesday", y: 50 },
      { x: "Thursday", y: 75 },
      { x: "Friday", y: 50 },
      { x: "Saturday", y: 65 },
      { x: "Sunday", y: 90 }
  	];

  	$scope.dayOptions = {
	    xkey: 'x',
	    ykeys: ['y'],
	    labels: ['Day'],
	    resize: true
	  };

  	// Most popular activities
  	$scope.activitiesData = [
	    {label: "Bar", value: 12},
	    {label: "Board Games",value: 30},
	    {label: "Cinema", value: 20},
	    {label: "Pool", value: 10},
	    {label: "Video Games", value: 12},
	    {label: "Reading", value: 7},
	  ];

	  $scope.activitiesOptions = {
	    colors: [ colors.byName('danger'), colors.byName('yellow'), colors.byName('warning'), colors.byName('success'), colors.byName('info'), colors.byName('purple') ],
	    resize: true,
	  };

  	// Checkin / Attends
  	$scope.eventsData = [
      { y: "Iceland Road Trip", a: 100, b: 90 }
  	];

  	$scope.eventsOptions = {
	    xkey: 'y',
	    ykeys: ["a", "b"],
	    labels: ["Checkin", "Attend"],
	    xLabelMargin: 2,
	    barColors: [ colors.byName('info'), colors.byName('danger') ],
	    resize: true
	  };

	  // Most active users
	  $scope.membersData = [
      { x: "Andrei Demian", y: 100 },
      { x: "Claudiu Filip", y: 70 },
      { x: "Andrei Laza", y: 50 },
      { x: "Bogdan Negrescu", y: 75 }
  	];

  	$scope.membersOptions = {
	    xkey: 'x',
	    ykeys: ['y'],
	    labels: ['Day'],
	    resize: true
	  };

  }
]);
