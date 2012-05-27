QUnit.module("Array");

QUnit.test("basic creation and access", function() {
	QUnit.expect(10);
	var undefined;
	var cArray = Classify("/Array");

	QUnit.ok(new cArray() instanceof cArray, "Instantiated array instance of array");

	QUnit.ok(cArray() instanceof cArray, "Instantiated array through invoke instance of array");

	var cInstance = cArray(1, 2, 3, 4, 5, 6);

	QUnit.equal(cInstance[0], 1, "Array index 0 accessor and multi argument in creation");
	QUnit.equal(cInstance[1], 2, "Array index 1 accessor and multi argument in creation");
	QUnit.equal(cInstance[2], 3, "Array index 2 accessor and multi argument in creation");
	QUnit.equal(cInstance[3], 4, "Array index 3 accessor and multi argument in creation");
	QUnit.equal(cInstance[4], 5, "Array index 4 accessor and multi argument in creation");
	QUnit.equal(cInstance[5], 6, "Array index 5 accessor and multi argument in creation");
	QUnit.equal(cInstance[6], undefined, "Out of bounds index returns undefined");

	// length property
	QUnit.equal(cInstance.length, 6, "Length property properly set");
});

QUnit.test("Using the get accessor method", function() {
	QUnit.expect(14);
	var undefined;
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);

	// positive get accessor
	QUnit.equal(cInstance.get(0), cInstance[0], "Array index 0 accessor with get");
	QUnit.equal(cInstance.get(1), cInstance[1], "Array index 1 accessor with get");
	QUnit.equal(cInstance.get(2), cInstance[2], "Array index 2 accessor with get");
	QUnit.equal(cInstance.get(3), cInstance[3], "Array index 3 accessor with get");
	QUnit.equal(cInstance.get(4), cInstance[4], "Array index 4 accessor with get");
	QUnit.equal(cInstance.get(5), cInstance[5], "Array index 5 accessor with get");
	QUnit.equal(cInstance.get(6), undefined, "Out of bounds positive index returns undefined");

	// negative get accessor
	QUnit.equal(cInstance.get(-1), cInstance[5], "Array index -1 accessor with get");
	QUnit.equal(cInstance.get(-2), cInstance[4], "Array index -2 accessor with get");
	QUnit.equal(cInstance.get(-3), cInstance[3], "Array index -3 accessor with get");
	QUnit.equal(cInstance.get(-4), cInstance[2], "Array index -4 accessor with get");
	QUnit.equal(cInstance.get(-5), cInstance[1], "Array index -5 accessor with get");
	QUnit.equal(cInstance.get(-6), cInstance[0], "Array index -6 accessor with get");
	QUnit.equal(cInstance.get(-7), undefined, "Out of bounds negative index returns undefined");
});

QUnit.test("Modifying with push, pop, shift, unshift", function() {
	QUnit.expect(16);
	var undefined;
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);

	// push operator
	QUnit.equal(cInstance.push(7), 7, "Push method returns new array length");
	QUnit.equal(cInstance[6], 7, "Pushed value set to end of array");
	QUnit.equal(cInstance.push(8, 9), 9, "Push method with multiple arguments returns new array length");
	QUnit.equal(cInstance[7], 8, "Pushed multi value set 1");
	QUnit.equal(cInstance[8], 9, "Pushed multi value set 2");

	// unshift operator
	QUnit.equal(cInstance.unshift(10), 10, "Unshifted method returns new array length");
	QUnit.equal(cInstance[0], 10, "Unshifted value set to end of array");
	QUnit.equal(cInstance.unshift(11, 12), 12, "Unshifted method with multiple arguments returns new array length");
	QUnit.equal(cInstance[0], 11, "Unshifted multi value set 1");
	QUnit.equal(cInstance[1], 12, "Unshifted multi value set 2");

	var dInstance = cArray(1, 2, 3, 4, 5, 6);

	// pop operator
	QUnit.equal(dInstance.pop(), 6, "Pop method returns the last value");
	QUnit.equal(dInstance.length, 5, "Pop method modifies the length property");
	QUnit.equal(dInstance[5], undefined, "Poped value removed from array");

	// shift operator
	QUnit.equal(dInstance.shift(), 1, "Pop method returns the last value");
	QUnit.equal(dInstance.length, 4, "Pop method modifies the length property");
	QUnit.equal(dInstance[0], 2, "Poped value removed from array");
});