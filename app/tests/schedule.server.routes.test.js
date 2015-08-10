'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Schedule = mongoose.model('Schedule'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, schedule;

/**
 * Schedule routes tests
 */
describe('Schedule CRUD tests', function() {
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

		// Save a user to the test db and create new Schedule
		user.save(function() {
			schedule = {
				name: 'Schedule Name'
			};

			done();
		});
	});

	it('should be able to save Schedule instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Schedule
				agent.post('/schedules')
					.send(schedule)
					.expect(200)
					.end(function(scheduleSaveErr, scheduleSaveRes) {
						// Handle Schedule save error
						if (scheduleSaveErr) done(scheduleSaveErr);

						// Get a list of Schedules
						agent.get('/schedules')
							.end(function(schedulesGetErr, schedulesGetRes) {
								// Handle Schedule save error
								if (schedulesGetErr) done(schedulesGetErr);

								// Get Schedules list
								var schedules = schedulesGetRes.body;

								// Set assertions
								(schedules[0].user._id).should.equal(userId);
								(schedules[0].name).should.match('Schedule Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Schedule instance if not logged in', function(done) {
		agent.post('/schedules')
			.send(schedule)
			.expect(401)
			.end(function(scheduleSaveErr, scheduleSaveRes) {
				// Call the assertion callback
				done(scheduleSaveErr);
			});
	});

	it('should not be able to save Schedule instance if no name is provided', function(done) {
		// Invalidate name field
		schedule.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Schedule
				agent.post('/schedules')
					.send(schedule)
					.expect(400)
					.end(function(scheduleSaveErr, scheduleSaveRes) {
						// Set message assertion
						(scheduleSaveRes.body.message).should.match('Please fill Schedule name');
						
						// Handle Schedule save error
						done(scheduleSaveErr);
					});
			});
	});

	it('should be able to update Schedule instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Schedule
				agent.post('/schedules')
					.send(schedule)
					.expect(200)
					.end(function(scheduleSaveErr, scheduleSaveRes) {
						// Handle Schedule save error
						if (scheduleSaveErr) done(scheduleSaveErr);

						// Update Schedule name
						schedule.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Schedule
						agent.put('/schedules/' + scheduleSaveRes.body._id)
							.send(schedule)
							.expect(200)
							.end(function(scheduleUpdateErr, scheduleUpdateRes) {
								// Handle Schedule update error
								if (scheduleUpdateErr) done(scheduleUpdateErr);

								// Set assertions
								(scheduleUpdateRes.body._id).should.equal(scheduleSaveRes.body._id);
								(scheduleUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Schedules if not signed in', function(done) {
		// Create new Schedule model instance
		var scheduleObj = new Schedule(schedule);

		// Save the Schedule
		scheduleObj.save(function() {
			// Request Schedules
			request(app).get('/schedules')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Schedule if not signed in', function(done) {
		// Create new Schedule model instance
		var scheduleObj = new Schedule(schedule);

		// Save the Schedule
		scheduleObj.save(function() {
			request(app).get('/schedules/' + scheduleObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', schedule.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Schedule instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Schedule
				agent.post('/schedules')
					.send(schedule)
					.expect(200)
					.end(function(scheduleSaveErr, scheduleSaveRes) {
						// Handle Schedule save error
						if (scheduleSaveErr) done(scheduleSaveErr);

						// Delete existing Schedule
						agent.delete('/schedules/' + scheduleSaveRes.body._id)
							.send(schedule)
							.expect(200)
							.end(function(scheduleDeleteErr, scheduleDeleteRes) {
								// Handle Schedule error error
								if (scheduleDeleteErr) done(scheduleDeleteErr);

								// Set assertions
								(scheduleDeleteRes.body._id).should.equal(scheduleSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Schedule instance if not signed in', function(done) {
		// Set Schedule user 
		schedule.user = user;

		// Create new Schedule model instance
		var scheduleObj = new Schedule(schedule);

		// Save the Schedule
		scheduleObj.save(function() {
			// Try deleting Schedule
			request(app).delete('/schedules/' + scheduleObj._id)
			.expect(401)
			.end(function(scheduleDeleteErr, scheduleDeleteRes) {
				// Set message assertion
				(scheduleDeleteRes.body.message).should.match('User is not logged in');

				// Handle Schedule error error
				done(scheduleDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Schedule.remove().exec();
		done();
	});
});