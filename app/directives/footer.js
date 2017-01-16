(function() {
	"use strict";

	angular.module("0xc0debabe").directive("footer",directive);
	directive.$inject = [
	];

	function directive() {
		return {
			restrict:		"E",
			templateUrl:	"app/views/partials/footer.htm",
			link:			function(scope,elem,attr) {

			},
			controller:		null
		}
	}
})();
