// config/database.js

module.exports = {
	'url' : process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/timer' 
};
