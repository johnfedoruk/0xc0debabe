(function() {
    "use strict";

    angular.module("0xc0debabe").factory("LoggingService",service);

    service.$inject = [
		"config"
    ];

    function service(config) {
		var config_debug_level = config.DEBUG_LEVEL;
		var debug = window.console;
		disableConsole();

		var services = {
			info:info,
			log:log,
			warn:warn,
			error:error
		};
		return services;

		function info(message) {
			tryDebugger("info",message);
		}

		function log(message) {
			tryDebugger("log",message);
		}

		function warn(message) {
			tryDebugger("warn",message);
		}

		function error(message) {
			tryDebugger("error",message);
		}

		function loggingLevelToInt(debug_level) {
			switch(debug_level) {
				case "info":
					return 0;
				case "log":
					return 1;
				case "warn":
					return 2;
				case "error":
					return 3;
				default:
					return 4;
			}
		}

		function tryDebugger(function_debug_level,message) {
			if(loggingLevelToInt(config_debug_level)<=loggingLevelToInt(function_debug_level))
				debug[function_debug_level](message);
		}

		function disableConsole() {
			var console_debug_levels = [
				"info",
				"log",
				"warn",
				"error"
			];
			for(var i=0;i<console_debug_levels.length;i++)
				if(loggingLevelToInt(config_debug_level)>loggingLevelToInt(console_debug_levels[i]))
					window.console[console_debug_levels[i]] = function(){};

			//verifyConsoleLevels(console_debug_levels);

		}

		function verifyConsoleLevels(console_debug_levels) {
			for(var i=0;i<console_debug_levels.length;i++) {
				window.console[console_debug_levels[i]](console_debug_levels[i]);
			}
		}
	}
})();
