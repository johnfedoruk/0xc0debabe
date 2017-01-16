(function() {
	"use strict";

	angular.module("0xc0debabe").factory("APIService",service);

	service.$inject = [
		"$http",
		"config",
		"LoggingService"
	];

	function service($http,config,LoggingService) {
		var services = {
			GET:GET
		};

		return services;

		function GET(resource) {
			var url	=		config.API + resource;
			var method =	"POST";
			var data =		null;
			var request = {
				url:url,
				method:method,
				data:data
			};
			return call(request);
		}

		function call(request) {
			var promise = $http(request).then(
				function successCallback(response) {
					LoggingService.log(request.url);
					LoggingService.log(response);
					return response;
				}, function errorCallback(response) {
					LoggingService.warn(request.url+" could not be accessed");
					return response;
				}
			);
			return promise;
		}
	}
})();
