'use strict';

(function() {
	// Likes Controller Spec
	describe('Likes Controller Tests', function() {
		// Initialize global variables
		var LikesController,
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

			// Initialize the Likes controller.
			LikesController = $controller('LikesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Like object fetched from XHR', inject(function(Likes) {
			// Create sample Like using the Likes service
			var sampleLike = new Likes({
				name: 'New Like'
			});

			// Create a sample Likes array that includes the new Like
			var sampleLikes = [sampleLike];

			// Set GET response
			$httpBackend.expectGET('likes').respond(sampleLikes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.likes).toEqualData(sampleLikes);
		}));

		it('$scope.findOne() should create an array with one Like object fetched from XHR using a likeId URL parameter', inject(function(Likes) {
			// Define a sample Like object
			var sampleLike = new Likes({
				name: 'New Like'
			});

			// Set the URL parameter
			$stateParams.likeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/likes\/([0-9a-fA-F]{24})$/).respond(sampleLike);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.like).toEqualData(sampleLike);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Likes) {
			// Create a sample Like object
			var sampleLikePostData = new Likes({
				name: 'New Like'
			});

			// Create a sample Like response
			var sampleLikeResponse = new Likes({
				_id: '525cf20451979dea2c000001',
				name: 'New Like'
			});

			// Fixture mock form input values
			scope.name = 'New Like';

			// Set POST response
			$httpBackend.expectPOST('likes', sampleLikePostData).respond(sampleLikeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Like was created
			expect($location.path()).toBe('/likes/' + sampleLikeResponse._id);
		}));

		it('$scope.update() should update a valid Like', inject(function(Likes) {
			// Define a sample Like put data
			var sampleLikePutData = new Likes({
				_id: '525cf20451979dea2c000001',
				name: 'New Like'
			});

			// Mock Like in scope
			scope.like = sampleLikePutData;

			// Set PUT response
			$httpBackend.expectPUT(/likes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/likes/' + sampleLikePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid likeId and remove the Like from the scope', inject(function(Likes) {
			// Create new Like object
			var sampleLike = new Likes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Likes array and include the Like
			scope.likes = [sampleLike];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/likes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleLike);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.likes.length).toBe(0);
		}));
	});
}());