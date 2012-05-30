QUnit.module("Array");

QUnit.test("basic creation and access", function() {
	QUnit.expect(13);
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

	// to array method
	var aArray = cInstance.toArray();
	QUnit.equal(Object.prototype.toString.call(aArray), "[object Array]", "toArray method returns an instance of actual array");
	QUnit.equal(aArray.length, cInstance.length, "toArray method returns array of equal length");
	QUnit.equal(aArray[2], cInstance[2], "toArray method returns array with proper values");
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

QUnit.test("push, pop, shift, unshift", function() {
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

QUnit.test("splice", function() {
	QUnit.expect(8);
	var undefined;
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);

	// splice operator
	var spliced = cInstance.splice(1, 0);
	QUnit.ok(spliced instanceof cArray, "Splice method returns an instance of array");
	QUnit.equal(spliced[0], undefined, "No Spliced value returned when splicing 0 elements");
	spliced = cInstance.splice(1, 1);
	QUnit.equal(spliced[0], 2, "Spliced value returned when splicing 1 element");
	QUnit.equal(cInstance[1], 3, "Spliced value removed from original array");
	QUnit.equal(spliced.length, 1, "Spliced length is the number of items spliced");
	QUnit.equal(cInstance.length, 5, "Original array length reduced with splice");

	splicedA = cInstance.splice(1, 1, "a");
	QUnit.equal(splicedA.length, 1, "Spliced length is the number of items spliced");
	QUnit.equal(cInstance[1], "a", "Original array spliced in with new element");
});

QUnit.test("reverse", function() {
	QUnit.expect(6);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);

	// reverse operator
	cInstance.reverse();
	QUnit.equal(cInstance[0], 6, "Array index 0 accessor of reversed array");
	QUnit.equal(cInstance[1], 5, "Array index 1 accessor of reversed array");
	QUnit.equal(cInstance[2], 4, "Array index 2 accessor of reversed array");
	QUnit.equal(cInstance[3], 3, "Array index 3 accessor of reversed array");
	QUnit.equal(cInstance[4], 2, "Array index 4 accessor of reversed array");
	QUnit.equal(cInstance[5], 1, "Array index 5 accessor of reversed array");
});

QUnit.test("sort", function() {
	QUnit.expect(0);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);
});

QUnit.test("concat", function() {
	QUnit.expect(0);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);
});

QUnit.test("join", function() {
	QUnit.expect(2);
	var cArray = Classify("/Array");

	QUnit.equal(cArray(1, 2, 3, 4, 5, 6).join(), "1,2,3,4,5,6", "join method turns array into a string with a comma");
	QUnit.equal(cArray(1, 2, 3, 4, 5, 6).join("-"), "1-2-3-4-5-6", "join method implodes array with separator");
});

QUnit.test("slice", function() {
	QUnit.expect(0);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);
});

QUnit.test("shuffle", function() {
	QUnit.expect(0);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);
});

QUnit.test("copy", function() {
	QUnit.expect(0);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);
});

QUnit.test("fill", function() {
	QUnit.expect(0);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);
});

QUnit.test("range", function() {
	QUnit.expect(0);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);
});

QUnit.test("indexOf", function() {
	QUnit.expect(2);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 3, 2, 1);

	QUnit.equal(cInstance.indexOf(2), 1, 'retrieve the first index of searched value');
	QUnit.equal(cInstance.indexOf(4), -1, "4 is not in the list");
});

QUnit.test("lastIndexOf", function() {
	QUnit.expect(2);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 3, 2, 1);

	QUnit.equal(cInstance.lastIndexOf(2), 4, 'retrieve the last index of searched value');
	QUnit.equal(cInstance.lastIndexOf(4), -1, "4 is not in the list");
});

QUnit.test("include", function() {
	QUnit.expect(0);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);
});

QUnit.test("clear", function() {
	QUnit.expect(1);
	var cArray = Classify("/Array");

	QUnit.equal(cArray(1, 2, 3, 4, 5, 6).clear().length, 0, "clear method zeros out array length");
});

QUnit.test("first", function() {
	QUnit.expect(2);
	var cArray = Classify("/Array");

	QUnit.equal(cArray(1, 2, 3, 4, 5, 6).first(), 1, "first method returns first value in array");
	QUnit.equal(cArray().first(), undefined, "first method returns undefined in empty array");
});

QUnit.test("last", function() {
	QUnit.expect(2);
	var cArray = Classify("/Array");

	QUnit.equal(cArray(1, 2, 3, 4, 5, 6).last(), 6, "last method returns last value in array");
	QUnit.equal(cArray().last(), undefined, "last method returns undefined in empty array");
});

QUnit.test("size", function() {
	QUnit.expect(1);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);

	QUnit.equal(cInstance.size(), 6, "size method is a alias for length");
});

QUnit.test("rand", function() {
	QUnit.expect(0);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);
});

QUnit.test("diff", function() {
	QUnit.expect(0);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);
});

QUnit.test("intersect", function() {
	QUnit.expect(0);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);
});

QUnit.test("asyncEach", function() {
	QUnit.expect(0);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);
});

QUnit.test("every", function() {
	QUnit.expect(0);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);
});

QUnit.test("filter", function() {
	QUnit.expect(0);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);
});

QUnit.test("forEach", function() {
	QUnit.expect(7);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);

	cInstance.forEach(function(v, i) {
		QUnit.equal(v, i + 1, "forEach iterator provide value and index");
	});

	var answers = [];
	cInstance.forEach(function(v, i) {
		answers.push(v * this.multiplier);
	}, {
		multiplier : 5
	});
	QUnit.equal(answers.join(", "), "5, 10, 15, 20, 25, 30", "context object property accessed");
});

QUnit.test("map", function() {
	QUnit.expect(3);
	var cArray = Classify("/Array");

	var doubled = cArray(1, 2, 3).map(function(num) {
		return num * 2;
	});
	QUnit.ok(doubled instanceof cArray, "map returns instance of Classify Array");
	QUnit.equal(doubled.join(", "), "2, 4, 6", "doubled numbers");

	var tripled = cArray(1, 2, 3).map(function(num) {
		return num * this.multiplier;
	}, {
		multiplier : 3
	});
	QUnit.equal(tripled.join(", "), "3, 6, 9", "tripled numbers with context");
});

QUnit.test("some", function() {
	QUnit.expect(0);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);
});

QUnit.test("reduce", function() {
	QUnit.expect(3);
	var cArray = Classify("/Array");

	var sum = cArray(1, 2, 3).reduce(function(sum, num) {
		return sum + num;
	}, 0);
	QUnit.equal(sum, 6, "can sum up an array");

	sum = cArray(1, 2, 3).reduce(function(sum, num) {
		return sum + num;
	});
	QUnit.equal(sum, 6, "default initial value");

	try {
		cArray().reduce(function() {
		});
	} catch (e) {
		QUnit.ok(true, "throws an error for empty arrays with no initial value");
	}
});

QUnit.test("reduceRight", function() {
	QUnit.expect(3);
	var cArray = Classify("/Array");

	var list = cArray("1", "2", "3").reduceRight(function(memo, str) {
		return memo + str;
	}, "");
	QUnit.equal(list, "321", "can perform right folds");

	var list = cArray("1", "2", "3").reduceRight(function(memo, str) {
		return memo + str;
	});
	QUnit.equal(list, "321", "default initial value");

	try {
		cArray().reduceRight(function() {
		});
	} catch (e) {
		QUnit.ok(true, "throws an error for empty arrays with no initial value");
	}
});

QUnit.test("threadEach", function() {
	QUnit.expect(0);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);
});

QUnit.test("unique", function() {
	QUnit.expect(0);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);
});
