'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Confirmation = mongoose.model('Confirmation'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, confirmation;

/**
 * Confirmation routes tests
 */
describe('Confirmation CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Confirmation
		user.save(function() {
			confirmation = {
				name: 'Confirmation Name'
			};

			done();
		});
	});

	it('should be able to save Confirmation instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Confirmation
				agent.post('/confirmations')
					.send(confirmation)
					.expect(200)
					.end(function(confirmationSaveErr, confirmationSaveRes) {
						// Handle Confirmation save error
						if (confirmationSaveErr) done(confirmationSaveErr);

						// Get a list of Confirmations
						agent.get('/confirmations')
							.end(function(confirmationsGetErr, confirmationsGetRes) {
								// Handle Confirmation save error
								if (confirmationsGetErr) done(confirmationsGetErr);

								// Get Confirmations list
								var confirmations = confirmationsGetRes.body;

								// Set assertions
								(confirmations[0].user._id).should.equal(userId);
								(confirmations[0].name).should.match('Confirmation Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Confirmation instance if not logged in', function(done) {
		agent.post('/confirmations')
			.send(confirmation)
			.expect(401)
			.end(function(confirmationSaveErr, confirmationSaveRes) {
				// Call the assertion callback
				done(confirmationSaveErr);
			});
	});

	it('should not be able to save Confirmation instance if no name is provided', function(done) {
		// Invalidate name field
		confirmation.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Confirmation
				agent.post('/confirmations')
					.send(confirmation)
					.expect(400)
					.end(function(confirmationSaveErr, confirmationSaveRes) {
						// Set message assertion
						(confirmationSaveRes.body.message).should.match('Please fill Confirmation name');
						
						// Handle Confirmation save error
						done(confirmationSaveErr);
					});
			});
	});

	it('should be able to update Confirmation instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Confirmation
				agent.post('/confirmations')
					.send(confirmation)
					.expect(200)
					.end(function(confirmationSaveErr, confirmationSaveRes) {
						// Handle Confirmation save error
						if (confirmationSaveErr) done(confirmationSaveErr);

						// Update Confirmation name
						confirmation.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Confirmation
						agent.put('/confirmations/' + confirmationSaveRes.body._id)
							.send(confirmation)
							.expect(200)
							.end(function(confirmationUpdateErr, confirmationUpdateRes) {
								// Handle Confirmation update error
								if (confirmationUpdateErr) done(confirmationUpdateErr);

								// Set assertions
								(confirmationUpdateRes.body._id).should.equal(confirmationSaveRes.body._id);
								(confirmationUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Confirmations if not signed in', function(done) {
		// Create new Confirmation model instance
		var confirmationObj = new Confirmation(confirmation);

		// Save the Confirmation
		confirmationObj.save(function() {
			// Request Confirmations
			request(app).get('/confirmations')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Confirmation if not signed in', function(done) {
		// Create new Confirmation model instance
		var confirmationObj = new Confirmation(confirmation);

		// Save the Confirmation
		confirmationObj.save(function() {
			request(app).get('/confirmations/' + confirmationObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', confirmation.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Confirmation instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Confirmation
				agent.post('/confirmations')
					.send(confirmation)
					.expect(200)
					.end(function(confirmationSaveErr, confirmationSaveRes) {
						// Handle Confirmation save error
						if (confirmationSaveErr) done(confirmationSaveErr);

						// Delete existing Confirmation
						agent.delete('/confirmations/' + confirmationSaveRes.body._id)
							.send(confirmation)
							.expect(200)
							.end(function(confirmationDeleteErr, confirmationDeleteRes) {
								// Handle Confirmation error error
								if (confirmationDeleteErr) done(confirmationDeleteErr);

								// Set assertions
								(confirmationDeleteRes.body._id).should.equal(confirmationSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Confirmation instance if not signed in', function(done) {
		// Set Confirmation user 
		confirmation.user = user;

		// Create new Confirmation model instance
		var confirmationObj = new Confirmation(confirmation);

		// Save the Confirmation
		confirmationObj.save(function() {
			// Try deleting Confirmation
			request(app).delete('/confirmations/' + confirmationObj._id)
			.expect(401)
			.end(function(confirmationDeleteErr, confirmationDeleteRes) {
				// Set message assertion
				(confirmationDeleteRes.body.message).should.match('User is not logged in');

				// Handle Confirmation error error
				done(confirmationDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Confirmation.remove().exec();
		done();
	});
});