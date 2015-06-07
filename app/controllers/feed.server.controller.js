'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	async = require('async'),
	_ = require('lodash'),
	moment = require('moment'),

	Activity = mongoose.model('Activity'),
	Event = mongoose.model('Event');

function formatFeed(all) {
	var newFeed = [];
	_(all).forEach(function(entry) {

		var newEntry = {
			category: 'post',
			date: entry.created,
			timestamp: moment(entry.created).format('x'),
			user: entry.user || {},
			action: entry
		}

		// Event
		if(entry.repeat) {
			newEntry.category = 'event';
		}

		// Activity
		if(entry.actionLabel) {
			newEntry.category = 'activity';
		}

		newFeed.push(newEntry);
	});

	// Sort
	newFeed = newFeed.sort(function(a, b) {
	return (a.timestamp < b.timestamp) 
	  ? 1 : (a.timestamp > b.timestamp) ? -1 : 0;
	});

	return newFeed;
}

exports.all = function(req, res) {
	async.concat([Activity, Event],function(model, callback) {

		var query;

		switch(model.modelName) {
			case 'Event':
				query = model.find({}).populate('user').sort({ "created": -1 });
				break;

			default:
				query = model.find({}).sort({ "created": -1 });
				break;
		}
	  
		query.exec(function(err, docs) {
			if (err) throw err;
			callback(err, docs);
		});
	},
	function(err, result) {
	  	if (err) throw err;

		res.json(formatFeed(result));
	});
};