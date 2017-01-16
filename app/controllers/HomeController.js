(function() {

	"use strict";

	angular.module("0xc0debabe").controller("HomeController",controller);

	controller.$inject = [
		"$scope",
		"APIService",
		"LoggingService"
	];

	function controller($scope,APIService,LoggingService) {
		LoggingService.info("HomeController started");
		$scope.pageTitle = "0xc0debabe";
		APIService.GET("/app/data/user.json").then(
			function successCallback(response) {
				$scope.pageData = response.data;
			}, function errorCallback(response) {
				$scope.pageData = null;
			}
		);
	}

})();
