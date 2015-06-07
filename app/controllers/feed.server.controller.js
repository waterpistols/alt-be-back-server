'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),

	Action = mongoose.model('Action');

// Frontend
/////////////////////////////////////////////////////////////
exports.all = function(req, res) {
	Action.find({}).populate('user').sort("-date").exec(function(err, entries) {
		if (err) {
			return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
		} else {
			res.json(entries);
		}
	});
};

exports.dailyChart = function(req, res) {
	var weekday = new Array(7);
	weekday[0]  = "Sunday";
	weekday[1]  = "Monday";
	weekday[2]  = "Tuesday";
	weekday[3]  = "Wednesday";
	weekday[4]  = "Thursday";
	weekday[5]  = "Friday";
	weekday[6]  = "Saturday";

	var result  = {		
		'Monday' : 0,
		'Tuesday' : 0,
		'Wednesday' : 0,
		'Thursday' : 0,
		'Friday' : 0,
		'Saturday' : 0,
		'Sunday' : 0
	};

	Action.find({}).populate('user').sort("-date").exec(function(err, entries) {
		if (err) {
			return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
		} else {
			var total = 0;

			entries.forEach(function(item) {
				var day = weekday[item.date.getDay()];
				result[day]++;
				total++;
			});

			result.total = total;

			res.json(result);
		}
	});
};

exports.popularActivity = function(req, res) {
	Action.find({category: 'activity'}).populate('user').sort("-date").exec(function(err, entries) {
		if (err) {
			return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
		} else {
			var activities = {};
			var total = 0;
			entries.forEach(function(item) {
				activities[item.action.label] = 0;
			});

			entries.forEach(function(item) {
				activities[item.action.label]++;
				total++;
			});

			activities.total = total;

			res.json(activities);
		}
	});
};