// shortcut reference to the array prototype
var arrayProto = Array.prototype;

var proto = {
	toArray : function() {
		return arrayProto.slice.call(this, 0);
	},
	pop : arrayProto.pop,
	push : arrayProto.push,
	reverse : arrayProto.reverse,
	shift : arrayProto.shift,
	sort : arrayProto.sort,
	join : arrayProto.join,
	splice : function() {
		return this.constructor.applicate(arrayProto.splice.apply(this, arguments));
	},
	unshift : function() {
		arrayProto.unshift.apply(this, arguments);
		return this.length;
	},
	concat : function(value) {
		return this.constructor.applicate(arrayProto.concat.apply(this, arguments));
	},
	slice : function(begin, end) {
		return this.constructor.applicate(arrayProto.slice.apply(this, arguments));
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
		return this.constructor.applicate(arrayProto.slice.call(this, 0));
	},
	fill : function(length, value) {
		this.clear();
		while (length-- > 0) {
			this.push(value);
		}
		return this;
	},
	range : function(start, end, step) {

	},
	indexOf : arrayProto.indexOf || function(value) {
		var i = 0, len = this.length;
		while (i < len) {
			if (this[i] === value) {
				return i;
			}
			i++;
		}
		return -1;
	},
	lastIndexOf : arrayProto.lastIndexOf || function(value) {
		var i = this.length;
		while (i--) {
			if (this[i] === value) {
				return i;
			}
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
	size : function() {
		return this.length;
	},
	rand : function() {
		return this[Math.round(Math.random() * (this.length - 1))];
	},
	diff : function(array) {

	},
	intersect : function(array) {

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
		// process them slowly
		timer = setTimeout(processor, delay || 25);
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
	filter : function(iterator, context) {
		var items, i, len;
		if (arrayProto.filter) {
			items = arrayProto.filter.apply(this, arguments);
		} else {
			items = [];
			i = 0;
			len = this.length;
			while (i < len) {
				if (iterator.call(context || null, this[i], i, this)) {
					items[items.length] = this[i];
				}
				i++;
			}
		}
		var obj = new this.constructor();
		obj.push.apply(obj, items);
		return obj;
	},
	forEach : arrayProto.forEach || function(iterator, context) {
		var i = 0, len = this.length;
		while (i < len) {
			iterator.call(context || null, this[i], i, this);
			i++;
		}
	},
	map : function(iterator, context) {
		var items, i, len;
		if (arrayProto.map) {
			items = arrayProto.map.apply(this, arguments);
		} else {
			items = [];
			i = 0;
			len = this.length;
			while (i < len) {
				items[items.length] = iterator.call(context || null, this[i], i, this);
				i++;
			}
		}
		return this.constructor.applicate(items);
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
	threadEach : function(iterator, callback, context) {
		var array = this, len = this.length, complete = function() {
			if (--len === 0) {
				callback && callback.call(context || null, array);
			}
		};
		return this.asyncEach(function(v, i, array) {
			iterator.call(context || null, v, i, complete, array);
		}, null, context, 1);
	},
	unique : function() {

	}
};

Classify.getGlobalNamespace().create("Array", {
	length : 0,
	init : function() {
		this.push.apply(this, arguments);
	},
	__nowrap_ : proto
});
