
var statusService = require('statusService');

exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);
    res.jsonp(statusService.findTimerById(id));
};

exports.findAll = function(req, res) {
    console.log('findAll: ');
	res.jsonp(statusService.listTimers());
};
 
