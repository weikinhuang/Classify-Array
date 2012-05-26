// include the fs module
var fs = require("fs"),
// sandboxing module
vm = require("vm"),
// path utilities
path = require("path"),
// quick reference to root dir
workdir = path.dirname(path.dirname(__dirname)),
// path the the src dir
coveragedir = workdir + "/coverage",
// path the the test dir
testdir = workdir + "/test",
// path the the external dir
vendordir = workdir + "/vendor",
// read options from commandline
options = JSON.parse(process.argv[2]),
// path to the qunit library
qunitPath = path.join(__dirname, "..", "qunit/qunit.js"),
// misc variables
currentmodule;

// globals needed by qunit sandbox
var sandbox = {
	require : require,
	exports : {},
	setTimeout : setTimeout,
	setInterval : setInterval,
	clearTimeout : clearTimeout,
	clearInterval : clearInterval,
	console : console,
	Object : Object,
	Function : Function,
	Boolean : Boolean,
	Number : Number,
	String : String,
	RegExp : RegExp,
	Array : Array,
	Date : Date
};
// window is a circualr reference
sandbox.window = sandbox;

try {
	vm.runInNewContext(fs.readFileSync(qunitPath, "utf-8"), sandbox, qunitPath);
} catch (err) {
	process.exit(1);
}

// keep a reference to the "root" variable
sandbox.root = sandbox.window;

// have a global reference to QUnit within the sandbox
sandbox.QUnit = sandbox.exports;

// don't have qunit reorder tests
sandbox.QUnit.config.reorder = false;

// override the log function to output back to the parent process
sandbox.QUnit.log(function(data) {
	data.test = this.config.current.testName;
	data.module = currentmodule;
	process.send({
		event : "assertionDone",
		data : data
	});
});

// start test
sandbox.QUnit.testStart(function(test) {
	// use last module name if no module name defined
	currentmodule = test.module || currentmodule;
});

// override the testDone function to signal back to the parent process
sandbox.QUnit.testDone(function(data) {
	// use last module name if no module name defined
	data.module = data.module || currentmodule;

	process.send({
		event : "testDone",
		data : data
	});
});

sandbox.QUnit.moduleStart = function(data) {
	process.send({
		event : "moduleStart",
		data : data
	});
};

sandbox.QUnit.moduleDone = function(data) {
	process.send({
		event : "moduleDone",
		data : data
	});
};

// override the done function to signal back to the parent process that this unit test is done
sandbox.QUnit.done((function() {
	var timeout = null, later = function(data) {
		timeout = null;
		process.send({
			event : "done",
			data : data,
			coverage : sandbox["_$jscoverage"]
		});
	};
	return function(data) {
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			later(data);
		}, 1000);
	};
})());

//load source and tests into the sandbox
function load(src, root) {
	var files = [];
	// build up the source file
	src.forEach(function(file) {
		try {
			files.push(fs.readFileSync(root + file, "utf-8"));
		} catch (e) {
			console.log(e.message + " in " + file);
			process.exit(1);
		}
	});

	// run the source in the sandbox
	try {
		vm.runInNewContext(files.join("\n"), sandbox, qunitPath);
	} catch (e) {
		console.log(e.message);
		process.exit(1);
	}
}

// load dependencies
load(options.external || [], vendordir + "/");

// load up the source files
load(options.src, coveragedir + "/");

// load up the test files
load(options.tests, testdir + "/");