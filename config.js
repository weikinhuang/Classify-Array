module.exports = function(build) {
	// set basic info about the repo
	build.setNameVersion("classify-array", "0.1.0");

	// set the url of this repo
	build.setRepoName("https://github.com/weikinhuang/Classify-Array");

	// adds a list of files that will be parsed
	build.addSourceFile("Array.js");

	// adds a list of unit tests files that will be run
	build.addUnitTestFile("Array.js");

	// adds a list of benchmark tests that will be run
	build.addBenchmarkFile();

	// adds any dependencies that are required
	build.addExternalFile("classify.js");

	// adds any copy, headers, footers to the js file
	build.addCopyright("copyright.js");
	build.addSourceWrap("wrap.js");

	// sets the list of environments that this code can run against
	build.enableEnvironment("node", "web");

	// set the default set of tasks that should be run by default when called with no build args
	build.setDefaultTasks("lint", "unit", "size", "clean", "concat", "min");

	// set linting options
	build.addTaskOptions("lint", {
		// run the linter on a per file basis
		perFile : false,
		// the options to run the linter with
		options : {
			latedef : true,
			noempty : true,
			undef : true,
			strict : true,
			node : true,
			browser : true,
			predef : [ "Classify" ]
		}
	});

	// set uglify minification options
	build.addTaskOptions("min", {
		strict_semicolons : false,
		unsafe : true,
		lift_vars : false,
		consolidate : false,
		mangle : {
			toplevel : false,
			defines : {},
			except : [],
			no_functions : false
		},
		squeeze : {
			make_seqs : true,
			dead_code : true
		},
		generate : {
			ascii_only : false,
			beautify : false,
			indent_level : 4,
			indent_start : 0,
			quote_keys : false,
			space_colon : false,
			inline_script : false
		},
		// function to run to modify any code before the minification process
		preparse : function(src) {
			return src;
		}
	});

	// set the options for running unit tests against browserstack
	build.addTaskOptions("browserstack", {
		browsers : [
		            // win - ie
		            { browser : "ie", version : "7.0", os : "win" },
		            { browser : "ie", version : "8.0", os : "win" },
		            { browser : "ie", version : "9.0", os : "win" },
		            { browser : "ie", version : "10.0", os : "win" },
		            // win - chrome
		            { browser : "chrome", version : "19.0", os : "win" },
		            // win - firefox
		            { browser : "firefox", version : "10.0", os : "win"	},
		            { browser : "firefox", version : "10.0", os : "win"	},
		            { browser : "firefox", version : "10.0", os : "win"	}
		            ]
	});
};
