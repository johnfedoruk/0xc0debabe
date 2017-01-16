(function() {
	"use strict";
	
	angular.module("0xc0debabe").config(router);
	router.$inject = [
		"$routeProvider",
		"$locationProvider"
	];
	function router($routeProvider,$locationProvider) {
		$routeProvider.when(
			"/",
			{
				templateUrl: 'app/views/pages/home.htm'
			}
		);
		$routeProvider.when(
			"/404",
			{
				templateUrl: 'app/views/pages/404.htm'
			}
		);
		$routeProvider.otherwise("/404");
		$locationProvider.html5Mode(
			{
				enabled: true,
				requireBase: false
			}
		);
	}
})();
