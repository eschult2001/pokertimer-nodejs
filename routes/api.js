
module.exports = function(app) {
    'use strict';

    var timers = require('./timers');
	app.get('/timers/:id', timers.findById);
	app.get('/timers', wines.findAll);

	var status = require('./status');
	app.get('/status/:id', status.findById);
	app.get('/status', status.findAll);

};


