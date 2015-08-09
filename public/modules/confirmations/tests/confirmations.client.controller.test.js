'use strict';

(function() {
	// Confirmations Controller Spec
	describe('Confirmations Controller Tests', function() {
		// Initialize global variables
		var ConfirmationsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Confirmations controller.
			ConfirmationsController = $controller('ConfirmationsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Confirmation object fetched from XHR', inject(function(Confirmations) {
			// Create sample Confirmation using the Confirmations service
			var sampleConfirmation = new Confirmations({
				name: 'New Confirmation'
			});

			// Create a sample Confirmations array that includes the new Confirmation
			var sampleConfirmations = [sampleConfirmation];

			// Set GET response
			$httpBackend.expectGET('confirmations').respond(sampleConfirmations);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.confirmations).toEqualData(sampleConfirmations);
		}));

		it('$scope.findOne() should create an array with one Confirmation object fetched from XHR using a confirmationId URL parameter', inject(function(Confirmations) {
			// Define a sample Confirmation object
			var sampleConfirmation = new Confirmations({
				name: 'New Confirmation'
			});

			// Set the URL parameter
			$stateParams.confirmationId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/confirmations\/([0-9a-fA-F]{24})$/).respond(sampleConfirmation);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.confirmation).toEqualData(sampleConfirmation);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Confirmations) {
			// Create a sample Confirmation object
			var sampleConfirmationPostData = new Confirmations({
				name: 'New Confirmation'
			});

			// Create a sample Confirmation response
			var sampleConfirmationResponse = new Confirmations({
				_id: '525cf20451979dea2c000001',
				name: 'New Confirmation'
			});

			// Fixture mock form input values
			scope.name = 'New Confirmation';

			// Set POST response
			$httpBackend.expectPOST('confirmations', sampleConfirmationPostData).respond(sampleConfirmationResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Confirmation was created
			expect($location.path()).toBe('/confirmations/' + sampleConfirmationResponse._id);
		}));

		it('$scope.update() should update a valid Confirmation', inject(function(Confirmations) {
			// Define a sample Confirmation put data
			var sampleConfirmationPutData = new Confirmations({
				_id: '525cf20451979dea2c000001',
				name: 'New Confirmation'
			});

			// Mock Confirmation in scope
			scope.confirmation = sampleConfirmationPutData;

			// Set PUT response
			$httpBackend.expectPUT(/confirmations\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/confirmations/' + sampleConfirmationPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid confirmationId and remove the Confirmation from the scope', inject(function(Confirmations) {
			// Create new Confirmation object
			var sampleConfirmation = new Confirmations({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Confirmations array and include the Confirmation
			scope.confirmations = [sampleConfirmation];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/confirmations\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleConfirmation);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.confirmations.length).toBe(0);
		}));
	});
}());