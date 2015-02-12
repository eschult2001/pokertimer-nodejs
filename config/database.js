// config/database.js
// mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/
var dbhost = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
var dbport = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017;

module.exports = {
	'url' : 'mongodb://' + dbhost + ':' + dbport + '/timer'
};
