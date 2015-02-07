var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'pokertimer-nodejs'
    }
    ,port: 3000
    ,db: 'mongodb://localhost/pokertimer-nodejs-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'pokertimer-nodejs'
    }
    ,port: 3000
    ,db: 'mongodb://localhost/pokertimer-nodejs-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'pokertimer-nodejs'
    }
    ,port: 3000
    ,db: 'mongodb://localhost/pokertimer-nodejs-production'
  }
};

module.exports = config[env];
