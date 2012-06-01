
	};

	if (typeof Classify === "undefined" && typeof module !== "undefined" && module.exports) {
		module.exports = bootstrap;
		return;
	}
	bootstrap(Classify);
// Establish the root object, "window" in the browser, or "global" on the server.
})(this);
