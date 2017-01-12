#!/bin/sh
_print_curr_cmd() {
	echo "*******************************************************************************"
	echo "$1"
	echo "*******************************************************************************"
}

_print_curr_error() {
	echo ""
	echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
	echo "ERROR"
	echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
	echo ""
	echo "'$1' failed"
	echo "Is it installed?"
	echo ""
	echo "Maybe try running '$1' by yourself.."
	echo ""
	echo "Exiting..."
	exit 1
}

_bower_install() {
	_print_curr_cmd "Running bower install..."
	bower install
	if [ "$?" != "0" ]; then
		_print_curr_error "bower install"
	fi
	echo "bower install complete"
	echo ""
}
_npm_install() {
	_print_curr_cmd "Running npm install..."
	npm install
	if [ "$?" != "0" ]; then
		_print_curr_error "npm install"
	fi
	echo "npm install complete!"
	echo ""
}
_grunt_wiredep() {
	_print_curr_cmd "Running grunt wiredep..."
	./node_modules/grunt-cli/bin/grunt wiredep
	if [ "$?" != "0" ]; then
		echo "Failed to run grunt wiredep.. trying to update packages before throwing error"
		echo ""
		_bower_install
		_npm_install
		./node_modules/grunt-cli/bin/grunt wiredep
		if [ "$?" != "0" ]; then
			_print_curr_error "./node_modules/grunt-cli/bin/grunt wiredep"
		fi
	fi
	echo "grunt wiredep complete!"
	echo ""
}

_help_msg() {
	echo "This script will allow you to call bower update, npm install, and grunt wiredep with one command."
	echo "Run it, make coffee, come back and build something cool!"
	echo ""
	echo "If you are having trouble:"
	echo "--------------------------"
	echo "Make sure you have npm and bower installed!"
	echo "Your package.json file should be configured to install grunt, grunt-cli, and grunt-wiredep!"
	echo "Your Gruntfile.js should be configured to use grunt-wiredep!"
	echo "Your index file should be configured to allow grunt load bower dependencies automatically!"
	echo ""
	echo "Available flags:"
	echo "\t-b | --bower  Will do a bower install"
	echo "\t-n | --npm    Will do a npm install"
	echo "\t-g | --grunt  Will run grunt wiredep"
	echo "\t-h | --help   Will give you this help menu"
	echo ""
	echo "If you don't provide any flags, then bower, npm, and grunt wiredep happen synchronously"
	exit 1
}

_use_help=false
_use_bower=false
_use_npm=false
_use_grunt=false


while [ ! $# -eq 0 ]
do
	case "$1" in
		--bower | -b)
			_use_bower=true
			;;
		--npm | -n)
			_use_npm=true
			;;
		--grunt | -g)
			_use_grunt=true
			;;
		--help | -h)
			_use_help=true
			;;
		*)
			echo "Unknown flag '$1'..."
			echo ""
			_use_help=true
			break
			;;
	esac
	shift
done

if [ "$_use_help" = false ] && [ "$_use_bower" = false ] && [ "$_use_npm" = false ] && [ "$_use_grunt" = false ]; then
	_bower_install
	_npm_install
	_grunt_wiredep
else
	if [ "$_use_help" = true ]; then
		_help_msg
	fi
	if [ "$_use_bower" = true ]; then
		_bower_install
	fi
	if [ "$_use_npm" = true ]; then
		_npm_install
	fi
	if [ "$_use_grunt" = true ]; then
		_grunt_wiredep
	fi
fi
echo ""
echo "Update complete!"
exit 0

