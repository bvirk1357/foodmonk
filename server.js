'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
  // uriUtil = require('mongodb-uri'),
	chalk = require('chalk');

/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */
// var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
//                 replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };


/*
 * Mongoose uses a different connection string format than MongoDB's standard.
 * Use the mongodb-uri library to help you convert from the standard format to
 * Mongoose's format.
 */
// var mongodbUri = 'mongodb://user:pass@host:port/db';
// var mongodbUri = 'mongodb://heroku_z4nprw8j:krn69cn1rcmi9tu77pt056pv9f@ds031903.mongolab.com:31903/heroku_z4nprw8j'
// var mongooseUri = uriUtil.formatMongoose(mongodbUri);

// mongoose.connect(mongooseUri, options);

// var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);
