'use strict';

module.exports = {
	// db: 'mongodb://localhost/foodmonk-dev',
	db: 'mongodb://heroku_z4nprw8j:krn69cn1rcmi9tu77pt056pv9f@ds031903.mongolab.com:31903/heroku_z4nprw8j',
	app: {
		title: 'foodmonk - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '1606409169622638',
		clientSecret: process.env.FACEBOOK_SECRET || '532ad9b2094c80883cc7e974a76a1532',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	// facebook: {
	// 	clientID: process.env.FACEBOOK_ID || 'APP_ID',
	// 	clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
	// 	callbackURL: '/auth/facebook/callback'
	// },
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
