// shortcut reference to the array prototype
var arrayProto = Array.prototype, map, filter, indexOf, flatten, ArrayObject;

indexOf = arrayProto.indexOf ? function(array, value) {
	return arrayProto.indexOf.call(array, value);
} : function(array, value) {
	var i = 0, len = array.length;
	while (i < len) {
		if (array[i] === value) {
			return i;
		}
		i++;
	}
	return -1;
};

flatten = function(args) {
	var i = 0, len = args.length, result = [];
	while (i < len) {
		if (args && args[i].length) {
			arrayProto.push.apply(result, arrayProto.slice.call(args[i], 0));
		} else {
			result.push(args[i]);
		}
		i++;
	}
	return result;
};

if (arrayProto.map) {
	map = function(iterator, context) {
		return this.getNewObject(arrayProto.map.apply(this, arguments));
	};
} else {
	map = function(iterator, context) {
		var items = [], i = 0, len = this.length;
		while (i < len) {
			items[items.length] = iterator.call(context || null, this[i], i, this);
			i++;
		}
		return this.getNewObject(items);
	};
}

if (arrayProto.filter) {
	filter = function(iterator, context) {
		return this.getNewObject(arrayProto.filter.apply(this, arguments));
	};
} else {
	filter = function(iterator, context) {
		var items = [], i = 0, len = this.length;
		while (i < len) {
			if (iterator.call(context || null, this[i], i, this)) {
				items[items.length] = this[i];
			}
			i++;
		}
		return this.getNewObject(items);
	};
}

ArrayObject = Classify.getGlobalNamespace().create("Array", {
	length : 0,
	init : function() {
		this.push.apply(this, arguments);
	}
});

ArrayObject.addUnwrappedProperty({
	toArray : function() {
		return arrayProto.slice.call(this, 0);
	},
	getNewObject : function(items) {
		var array = new ArrayObject();
		array.push.apply(array, items);
		return array;
	},
	pop : arrayProto.pop,
	push : arrayProto.push,
	reverse : arrayProto.reverse,
	shift : arrayProto.shift,
	sort : arrayProto.sort,
	join : arrayProto.join,
	filter : filter,
	map : map,
	splice : function() {
		return this.getNewObject(arrayProto.splice.apply(this, arguments));
	},
	unshift : function() {
		arrayProto.unshift.apply(this, arguments);
		return this.length;
	},
	concat : function(value) {
		return this.getNewObject(arrayProto.concat.apply(this.toArray(), arguments));
	},
	slice : function(begin, end) {
		return this.getNewObject(arrayProto.slice.apply(this, arguments));
	},
	shuffle : function() {
		var len = this.length, idx = len, ridx, temp;
		while (idx--) {
			ridx = parseInt(Math.random() * len, 10);
			temp = this[idx];
			this[idx] = this[ridx];
			this[ridx] = temp;
		}
		return this;
	},
	copy : function() {
		return this.getNewObject(arrayProto.slice.call(this, 0));
	},
	fill : function(length, value) {
		this.clear();
		while (length-- > 0) {
			this.push(value);
		}
		return this;
	},
	range : function(start, stop, step) {
		if (arguments.length <= 1) {
			stop = start || 0;
			start = 0;
		}
		step = step || 1;
		var len = Math.max(Math.ceil((stop - start) / step), 0), idx = 0;
		// empty this array first
		this.clear();
		while (idx++ < len) {
			this.push(start);
			start += step;
		}
		return this;
	},
	indexOf : arrayProto.indexOf || function(value, from) {
		var i = 0, len = this.length >>> 0;
		if (len === 0) {
			return -1;
		}
		if (arguments.length > 1) {
			i = Number(from);
			if (i !== i) {
				i = 0;
			} else if (i !== 0 && i !== Infinity && i !== -Infinity) {
				i = (i > 0 || -1) * Math.floor(Math.abs(i));
			}
		}
		if (i >= len) {
			return -1;
		}
		for (; i < len; i++) {
			if (this[i] === value) {
				return i;
			}
		}
		return -1;
	},
	lastIndexOf : arrayProto.lastIndexOf || function(value, from) {
		var len = this.length >>> 0, n = len, k;
		if (len === 0) {
			return -1;
		}
		if (arguments.length > 1) {
			n = Number(from);
			if (n !== n) {
				n = 0;
			} else if (n !== 0 && n !== Infinity && n !== -Infinity) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}
		k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);
		for (; k >= 0; k--) {
			if (this[k] === value)
				return k;
		}
		return -1;
	},
	include : function(value) {
		return this.indexOf(value) != -1;
	},
	clear : function() {
		this.length = 0;
		return this;
	},
	first : function() {
		return this[0];
	},
	last : function() {
		return this[this.length - 1];
	},
	get : function(index) {
		return this[index < 0 ? this.length + index : index];
	},
	rand : function() {
		return this[Math.round(Math.random() * (this.length - 1))];
	},
	size : function() {
		return this.length;
	},
	diff : function(array) {
		var items = flatten(arguments);
		return this.unique().filter(function(v) {
			return indexOf(items, v) === -1;
		});
	},
	intersect : function(array) {
		var items = flatten(arguments);
		return this.unique().filter(function(v) {
			return indexOf(items, v) > -1;
		});
	},
	asyncEach : function(iterator, callback, context, delay) {
		// clone this array
		var start, timer, stop = false, temp = this.toArray(), array = this, i = 0, processor = function() {
			start = +new Date();
			// iterate through each item
			do {
				// we can quit at any time
				if (iterator.call(context || null, temp.shift(), i++, array) === false) {
					stop = true;
					break;
				}
			} while (!stop && temp.length > 0 && (+new Date() - start < 50));
			// we're not finished yet, let's wait a little
			if (!stop && temp.length > 0) {
				timer = setTimeout(processor, delay || 25);
			} else {
				// we're done, run the callback
				callback && callback.call(context || null, array);
			}
		};
		// no items to process, run the callback
		if (array.length === 0) {
			callback && callback.call(context || null, array);
		} else {
			// process them slowly
			timer = setTimeout(processor, delay || 25);
		}
		return this;
	},
	every : arrayProto.every || function(iterator, context) {
		var i = 0, len = this.length;
		while (i < len) {
			if (!iterator.call(context || null, this[i], i, this)) {
				return false;
			}
			i++;
		}
		return true;
	},
	forEach : arrayProto.forEach || function(iterator, context) {
		var i = 0, len = this.length;
		while (i < len) {
			iterator.call(context || null, this[i], i, this);
			i++;
		}
	},
	some : arrayProto.some || function(iterator, context) {
		var i = 0, len = this.length;
		while (i < len) {
			if (iterator.call(context || null, this[i], i, this)) {
				return true;
			}
			i++;
		}
		return false;
	},
	reduce : arrayProto.reduce || function(iterator, accumulator) {
		var i = 0, len = this.length;
		if (arguments.length < 2) {
			if (len === 0) {
				throw new TypeError("Array length is 0 and no second argument");
			}
			accumulator = this[0];
			i = 1; // start accumulating at the second element
		}
		while (i < len) {
			accumulator = iterator.call(null, accumulator, this[i], i, this);
			++i;
		}
		return accumulator;
	},
	reduceRight : arrayProto.reduceRight || function(iterator, accumulator) {
		var len = this.length;
		// no value to return if no initial value, empty array
		if (len === 0 && arguments.length === 1) {
			throw new TypeError("Array length is 0 and no second argument");
		}

		var i = len - 1;
		if (arguments.length < 2) {
			accumulator = this[i--];
		}

		while (i >= 0) {
			accumulator = iterator.call(null, accumulator, this[i], i, this);
			i--;
		}

		return accumulator;
	},
	serialEach : function(iterator, callback, context) {
		var array = this, temp = this.toArray(), i = 0, next = function() {
			if (temp.length === 0) {
				// we're done, run the callback
				callback && callback.call(context || null, array);
				return;
			}
			iterator.call(context || null, next, temp.shift(), i++, array);
		};
		// start the first iteration
		next();
		return this;
	},
	threadEach : function(iterator, callback, context) {
		var array = this, len = this.length, completeCalled = false, complete = function() {
			if (--len === 0 && !completeCalled) {
				completeCalled = true;
				callback && callback.call(context || null, array);
			}
		};
		// if there are no items to process then just call the callback
		if (array.length === 0) {
			callback && callback.call(context || null, array);
			return this;
		}
		return this.asyncEach(function(v, i, array) {
			if (iterator.call(context || null, complete, v, i, array) === false) {
				// if we bail out early, then
				completeCalled = true;
				callback && callback.call(context || null, array);
				return false;
			}
		}, null, context, 1);
	},
	unique : function(isSorted, iterator) {
		var array = this, temp = iterator ? array.map(iterator) : array, result = [];
		temp.reduce(function(accumulator, v, i) {
			if (isSorted ? (accumulator[accumulator.length - 1] !== v || !accumulator.length) : indexOf(accumulator, v) === -1) {
				accumulator.push(v);
				result.push(array[i]);
			}
			return accumulator;
		}, []);
		return this.getNewObject(result);
	}
});
