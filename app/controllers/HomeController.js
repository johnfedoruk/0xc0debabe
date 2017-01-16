(function() {

	"use strict";

	angular.module("0xc0debabe").controller("HomeController",controller);

	controller.$inject = [
		"$scope",
		"LoggingService"
	];

	function controller($scope,LoggingService) {
		LoggingService.info("HomeController started");
		$scope.pageTitle = "0xc0debabe";
	}

})();
