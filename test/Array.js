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
	QUnit.expect(4);
	var cArray = Classify("/Array");
	var cInstance = cArray(5, 4, 3, 2, 1);
	cInstance.sort();

	QUnit.equal(cInstance[0], 1, "Sort array sorts elements in ascending order");
	QUnit.equal(cInstance[4], 5, "Sort array sorts elements in ascending order");

	var cInstancefn = cArray(1, 2, 3, 4, 5);
	cInstancefn.sort(function(l, r) {
		if(l === r) {
			return 0;
		}
		return l > r ? -1 : 1;
	});
	QUnit.equal(cInstancefn[0], 5, "Sorted with sort callback array sorts elements in proper order");
	QUnit.equal(cInstancefn[4], 1, "Sorted with sort callback array sorts elements in proper order");
});

QUnit.test("concat", function() {
	QUnit.expect(5);
	var cArray = Classify("/Array");
	var cInstance = cArray(1);

	var cConcat = cInstance.concat(2);
	QUnit.equal(cConcat.length, 2, "concat method merges array + args and returns a new array with proper length");
	QUnit.equal(cConcat[1], 2, "concat method merges array values");

	var cConcatm = cInstance.concat(2, 3);
	QUnit.equal(cConcatm.length, 3, "concat method turns array + multiple args into new array");
	QUnit.equal(cConcatm[1], 2, "concat method merges array values arg1");
	QUnit.equal(cConcatm[2], 3, "concat method merges array values arg2");
});

QUnit.test("join", function() {
	QUnit.expect(2);
	var cArray = Classify("/Array");

	QUnit.equal(cArray(1, 2, 3, 4, 5, 6).join(), "1,2,3,4,5,6", "join method turns array into a string with a comma");
	QUnit.equal(cArray(1, 2, 3, 4, 5, 6).join("-"), "1-2-3-4-5-6", "join method implodes array with separator");
});

QUnit.test("slice", function() {
	QUnit.expect(7);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);

	// splice operator
	var sliced = cInstance.slice(1, 1);
	QUnit.ok(sliced instanceof cArray, "Slice method returns an instance of array");
	QUnit.equal(sliced[0], undefined, "No Sliced value returned when slicing 0 elements");

	sliced = cInstance.slice(1, 2);
	QUnit.equal(sliced[0], 2, "Sliced value returned when slicing 1 element");
	QUnit.equal(cInstance[1], 2, "Sliced value removed from original array");
	QUnit.equal(sliced.length, 1, "Sliced length is the number of items sliced");
	QUnit.equal(cInstance.length, 6, "Original array length reduced with slice");

	slicedA = cInstance.slice(1, 2);
	QUnit.equal(slicedA.length, 1, "Sliced length is the number of items spliced");
});

QUnit.test("shuffle", function() {
	QUnit.expect(1);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4);

	cInstance.shuffle();
	QUnit.ok(cInstance[0] !== 1 || cInstance[1] !== 2 || cInstance[2] !== 3 || cInstance[3] !== 4, "Shuffle method changes order of array");
});

QUnit.test("copy", function() {
	QUnit.expect(3);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);
	var cCopy = cInstance.copy();

	QUnit.notEqual(cCopy, cInstance, "copy creates another instance");
	QUnit.equal(cCopy.length, cInstance.length, "copied array has same length");
	QUnit.equal(cCopy[0], cInstance[0], "copied elements");
});

QUnit.test("fill", function() {
	QUnit.expect(3);
	var cArray = Classify("/Array");
	var cInstance = cArray().fill(5, 1);

	QUnit.equal(cInstance.length, 5, "fill adds proper number of items");
	QUnit.equal(cInstance[0], 1, "fill adds proper value to beginning of array");
	QUnit.equal(cInstance[4], 1, "fill adds proper value to end of array");

});

QUnit.test("range", function() {
	QUnit.expect(8);
	var cArray = Classify("/Array");

	QUnit.equal(cArray().range(0).join(""), "", "range with 0 as a first argument generates an empty array");
	QUnit.equal(cArray().range(4).join(" "), "0 1 2 3", "range with a single positive argument generates an array of elements 0,1,2,...,n-1");
	QUnit.equal(cArray().range(5, 8).join(" "), "5 6 7", "range with two arguments a & b, a < b generates an array of elements a,a+1,a+2,...,b-2,b-1");
	QUnit.equal(cArray().range(8, 5).join(""), "", "range with two arguments a & b, b > a generates an empty array");
	QUnit.equal(cArray().range(3, 10, 3).join(" "), "3 6 9", "range with three arguments a & b & c, c < b-a, a < b generates an array of elements a,a+c,a+2c,...,b - (multiplier of a) < c");
	QUnit.equal(cArray().range(3, 10, 15).join(""), "3", "range with three arguments a & b & c, c > b-a, a < b generates an array with a single element, equal to a");
	QUnit.equal(cArray().range(12, 7, -2).join(" "), "12 10 8", "range with three arguments a & b & c, a > b, c < 0 generates an array of elements a,a-c,a-2c and ends with the number not less than b");
	QUnit.equal(cArray().range(0, -10, -1).join(" "), "0 -1 -2 -3 -4 -5 -6 -7 -8 -9", "final example in the Python docs");
});

QUnit.test("indexOf", function() {
	QUnit.expect(6);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 3, 2, 1);

	QUnit.equal(cInstance.indexOf(2), 1, "retrieve the first index of searched value");
	QUnit.equal(cInstance.indexOf(4), -1, "4 is not in the list");
	QUnit.equal(cInstance.indexOf(2, 3), 4, "retrieve index with a start position");
	QUnit.equal(cInstance.indexOf(2, NaN), 1, "retrieve index with a NaN start position");
	QUnit.equal(cInstance.indexOf(2, 50), -1, "retrieve index with a index larger then the length");
	QUnit.equal(cArray().indexOf(4), -1, "empty arrays don't do a search");
});

QUnit.test("lastIndexOf", function() {
	QUnit.expect(5);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 3, 2, 1);

	QUnit.equal(cInstance.lastIndexOf(2), 4, "retrieve the last index of searched value");
	QUnit.equal(cInstance.lastIndexOf(4), -1, "4 is not in the list");
	QUnit.equal(cInstance.lastIndexOf(2, 3), 1, "retrieve index with a start position");
	QUnit.equal(cInstance.lastIndexOf(2, NaN), -1, "retrieve index with a NaN start position");
	QUnit.equal(cArray().lastIndexOf(4), -1, "empty arrays don't do a search");
});

QUnit.test("include", function() {
	QUnit.expect(2);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 3, 2, 1);

	QUnit.equal(cInstance.include(2), true, "true if item is in array");
	QUnit.equal(cInstance.include(4), false, "false if item is not in array");
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
	QUnit.expect(1);
	var cArray = Classify("/Array");
	var cInstance = cArray(1, 2, 3, 4, 5, 6);

	function isInArray(array, value) {
		var i = 0, len = array.length;
		while (i < len) {
			if (array[i] === value) {
				return true;
			}
			i++;
		}
		return false;
	}

	QUnit.ok(isInArray([ 1, 2, 3, 4, 5, 6 ], cInstance.rand()), "Randomly selected an element in the array");
});

QUnit.test("diff", function() {
	QUnit.expect(4);
	var cArray = Classify("/Array");

	var cInstance = cArray(1, 2, 3, 4, 5, 6);

	QUnit.equal(cInstance.diff([ 1, 2 ]).join(), "3,4,5,6", "can take the set diff of two arrays");

	QUnit.equal(cInstance.diff(cArray(1, 2)).join(), "3,4,5,6", "can take the set diff of two classify arrays");

	QUnit.equal(cInstance.diff(cArray(1, 2), [ 3 ]).join(), "4,5,6", "can take the set diff of multiple arrays");

	QUnit.equal(cInstance.diff(cArray(1, 2), [ 3 ], 4).join(), "5,6", "can take the set diff of multiple arrays and mixed args");
});

QUnit.test("intersect", function() {
	QUnit.expect(4);
	var cArray = Classify("/Array");

	var cInstance = cArray(1, 2, 3, 4, 5, 6);

	QUnit.equal(cInstance.intersect([ 1, 2, 3 ]).join(), "1,2,3", "can take the set intersection of two arrays");

	QUnit.equal(cInstance.intersect(cArray(1, 2, 3)).join(), "1,2,3", "can take the set intersection of two classify arrays");

	QUnit.equal(cInstance.intersect(cArray(1, 2, 3), [ 4 ]).join(), "1,2,3,4", "can take the set intersection of multiple arrays");

	QUnit.equal(cInstance.intersect(cArray(1, 2, 3), [ 4 ], 5).join(), "1,2,3,4,5", "can take the set intersection of multiple arrays and mixed args");
});

QUnit.test("asyncEach", function() {
	QUnit.expect(12);
	var cArray = Classify("/Array");

	// basic iteration
	QUnit.stop();
	var index = 0;
	cArray(1, 2, 3, 4, 5, 6).asyncEach(function(v, i, array) {
		QUnit.start();
		QUnit.equal(v, i + 1, "asyncEach iterator provide value and index");
		index++;
		QUnit.stop();
	}, function(array) {
		QUnit.start();
		QUnit.equal(index, 6, "asyncEach calls completion callback when all items are processed");
	});

	// context passing
	QUnit.stop();
	cArray(1).asyncEach(function(v, i, array) {
		QUnit.start();
		QUnit.equal(this.multiplier, 2, "context passed to asyncEach iterator");
		QUnit.stop();
	}, function(array) {
		QUnit.start();
		QUnit.equal(this.multiplier, 2, "context passed to asyncEach complete callback");
	}, {
		multiplier : 2
	});

	// stoping iteration
	var stop_i = 0;
	QUnit.stop();
	cArray(1, 2, 3, 4, 5, 6).asyncEach(function(v, i, array) {
		stop_i++;
		return false;
	}, function() {
		QUnit.start();
		QUnit.equal(stop_i, 1, "returning false stops iteration steps in asyncEach");
	});

	// long running iterations doesn't lock up process
	var long_i = 0;
	QUnit.stop();
	cArray(1, 2, 3, 4, 5, 6).asyncEach(function(v, i, array) {
		var start = +new Date(), a = 0;
		while (+new Date() - start < 51) {
			a++;
		}
		long_i++;
	}, function() {
		QUnit.start();
		QUnit.equal(long_i, 6, "long running operations doesn't stop process in asyncEach");
	});

	// handle empty arrays
	var empty_i = 0;
	QUnit.stop();
	cArray().asyncEach(function(v, i, array) {
		empty_i++;
	}, function(array) {
		QUnit.start();
		QUnit.equal(empty_i, 0, "Empty array not iterated over in asyncEach");
	});
});

QUnit.test("every", function() {
	QUnit.expect(10);
	var cArray = Classify("/Array");

	var isEvery = cArray(1, 2, 3, 4, 5, 6).every(function(v, i, array) {
		QUnit.equal(v, i + 1, "every iterator provide value and index");
		return true;
	});
	QUnit.equal(isEvery, true, "every item in array is valid");

	var index = 1;
	isEvery = cArray(1, 2, 3, 4, 5, 6).every(function(v, i, array) {
		index++;
		return v < 2;
	});
	QUnit.equal(isEvery, false, "every item did not satisfy condition");
	QUnit.equal(index, 3, "every iterator stopped after condition is false");

	isEvery = cArray(1, 2, 3, 4, 5, 6).every(function(v, i, array) {
		return v < this.limit;
	}, {
		limit : 2
	});
	QUnit.equal(isEvery, false, "context object property accessed");
});

QUnit.test("filter", function() {
	QUnit.expect(2);
	var cArray = Classify("/Array");

	var evens = cArray(1, 2, 3, 4, 5, 6).filter(function(v) {
		return v % 2 == 0;
	});
	QUnit.equal(evens.join(), "2,4,6", "filtered each even number");

	evens = cArray(1, 2, 3, 4, 5, 6).filter(function(v) {
		return v % this.mod == 0;
	}, {
		mod : 2
	});
	QUnit.equal(evens.join(), "2,4,6", "context object property accessed");
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
	QUnit.expect(10);
	var cArray = Classify("/Array");

	var isSome = cArray(1, 2, 3, 4, 5, 6).some(function(v, i, array) {
		QUnit.equal(v, i + 1, "some iterator provide value and index");
		return false;
	});
	QUnit.equal(isSome, false, "some item(s) in array is valid");

	var index = 1;
	isSome = cArray(1, 2, 3, 4, 5, 6).some(function(v, i, array) {
		index++;
		return v > 2;
	});
	QUnit.equal(isSome, true, "some item(s) satisfied condition");
	QUnit.equal(index, 4, "some iterator stopped after condition is true");

	isSome = cArray(1, 2, 3, 4, 5, 6).some(function(v, i, array) {
		return v > this.limit;
	}, {
		limit : 2
	});
	QUnit.equal(isSome, true, "context object property accessed");
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

QUnit.test("serialEach", function() {
	QUnit.expect(10);
	var cArray = Classify("/Array");

	// basic iteration
	var index = 0;
	cArray(1, 2, 3, 4, 5, 6).serialEach(function(next, v, i, array) {
		QUnit.equal(v, i + 1, "serialEach iterator provide value and index");
		index++;
		next();
	}, function(array) {
		QUnit.equal(index, 6, "serialEach calls completion callback when all items are processed");
	});

	// context passing
	cArray(1).serialEach(function(next, v, i, array) {
		QUnit.equal(this.multiplier, 2, "context passed to serialEach iterator");
		next();
	}, function(array) {
		QUnit.equal(this.multiplier, 2, "context passed to serialEach complete callback");
	}, {
		multiplier : 2
	});

	// handle empty arrays
	var empty_i = 0;
	cArray().serialEach(function(next, v, i, array) {
		empty_i++;
		next();
	}, function(array) {
		QUnit.equal(empty_i, 0, "Empty array not iterated over in serialEach");
	});
});

QUnit.test("threadEach", function() {
	QUnit.expect(12);
	var cArray = Classify("/Array");

	// basic iteration
	QUnit.stop();
	var index = 0;
	cArray(1, 2, 3, 4, 5, 6).threadEach(function(next, v, i, array) {
		QUnit.start();
		QUnit.equal(v, i + 1, "threadEach iterator provide value and index");
		index++;
		QUnit.stop();
		next();
	}, function(array) {
		QUnit.start();
		QUnit.equal(index, 6, "threadEach calls completion callback when all items are processed");
	});

	// context passing
	QUnit.stop();
	cArray(1).threadEach(function(next, v, i, array) {
		QUnit.start();
		QUnit.equal(this.multiplier, 2, "context passed to threadEach iterator");
		QUnit.stop();
		next();
	}, function(array) {
		QUnit.start();
		QUnit.equal(this.multiplier, 2, "context passed to threadEach complete callback");
	}, {
		multiplier : 2
	});

	// stoping iteration
	var stop_i = 0;
	QUnit.stop();
	cArray(1, 2, 3, 4, 5, 6).threadEach(function(next, v, i, array) {
		stop_i++;
		return false;
	}, function() {
		QUnit.start();
		QUnit.equal(stop_i, 1, "returning false stops iteration steps in threadEach");
	});

	// long running iterations doesn't lock up process
	var long_i = 0;
	QUnit.stop();
	cArray(1, 2, 3, 4, 5, 6).threadEach(function(next, v, i, array) {
		var start = +new Date(), a = 0;
		while (+new Date() - start < 51) {
			a++;
		}
		long_i++;
		next();
	}, function() {
		QUnit.start();
		QUnit.equal(long_i, 6, "long running operations doesn't stop process in threadEach");
	});

	// handle empty arrays
	var empty_i = 0;
	QUnit.stop();
	cArray().threadEach(function(next, v, i, array) {
		empty_i++;
	}, function(array) {
		QUnit.start();
		QUnit.equal(empty_i, 0, "Empty array not iterated over in threadEach");
	});
});

QUnit.test("unique", function() {
	QUnit.expect(4);
	var cArray = Classify("/Array");

	QUnit.equal(cArray(1, 2, 1, 3, 1, 4).unique().join(), "1,2,3,4", "can find the unique values of an unsorted array");

	QUnit.equal(cArray(1, 1, 1, 2, 2, 3).unique(true).join(), "1,2,3", "can find the unique values of a sorted array faster");

	var list = cArray({
		name : "bob"
	}, {
		name : "mike"
	}, {
		name : "joe"
	}, {
		name : "mike"
	});
	var iterator = function(value) {
		return value.name;
	};
	QUnit.equal(list.unique(false, iterator).map(iterator).join(), "bob,mike,joe", "can find the unique values of an array using a custom iterator");

	var iterator = function(value) {
		return value + 1;
	};
	QUnit.equal(cArray(1, 2, 2, 3, 4, 4).unique(true, iterator).join(), "1,2,3,4", "iterator works with sorted array");
});
