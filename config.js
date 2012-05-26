module.exports = {
	name : "",
	pkg : "package.json",
	version : "0.0.0",
	wrap : {
		copy : [ "copyright.js" ],
		intro : [ "intro.js" ],
		outro : [ "outro.js" ]
	},
	src : [ "Array.js" ],
	unit : [ "Array.js" ],
	external : [ "classify.js" ],
	env : {
		node : true,
		web : true
	},
	lint : {
		expr : true,
		node : true,
		browser : true,
		predef : [ "Classify" ]
	},
	min : {
		strict_semicolons : false,
		unsafe : true,
		lift_vars : false,
		consolidate : false,
		preparse : function(src) {
			return src;
		},
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
		}
	},
	build : "clean concat lint unit min size"
};