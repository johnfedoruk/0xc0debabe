(function() {
	"use strict";

	angular.module("0xc0debabe").directive("header",directive);
	directive.$inject = [
	];

	function directive() {
		return {
			restrict:		"E",
			templateUrl:	"app/views/partials/header.htm",
			link:			function(scope,elem,attr) {

			},
			controller:		null
		}
	}
})();
