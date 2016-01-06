if (!LAPP) {
	var LAPP = {};
};
LAPP.Util = {
	getDevice: function() {
		var ua = navigator.userAgent;
		var platform = {};
		platform.android = ua.indexOf("Android") > -1,
			platform.iPhone = ua.indexOf("iPhone") > -1,
			platform.iPad = ua.indexOf("iPad") > -1,
			platform.iPod = ua.indexOf("iPod") > -1,
			platform.winPhone = ua.indexOf("IE") > -1,
			platform.IOS = platform.iPad || platform.iPhone || platform.iPod,
			platform.touchDevice = "ontouchstart" in window;

		var type = "PC";
		LAPP.PlatForm = "IPHONE";
		window.iosapp&&window.localStorage.setItem('iosapp','true');
        window.iosapp = window.iosapp || window.localStorage.getItem('iosapp');
		if (platform.android) {
			LAPP.PlatForm = "ANDROID";
			if (window.LAPPfunc) {
				type = "ANDROID";
			} else {
				type = "PC";
			};
		} else if (platform.IOS) {
			LAPP.PlatForm = "IPHONE";
			if (window.iosapp == undefined) {
				type = "PC";
			} else {
				type = "IOS";
			}
			/*if( platform.iPhone ) {
				LAPP.PlatForm = "IPHONE";
			}
			if( platform.iPad ) {
				LAPP.PlatForm = "IPAD";
			}
			if( platform.iPod ) {
				LAPP.PlatForm = "IPOD";
			}*/
		} else if (platform.winPhone) {
			type = "WP";
			LAPP.PlatForm = "WP";
		};
		return type;
	},
	getPlatform: function() {},
	createId: function() {
		var jschars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
			'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
		];
		var res = "";
		for (var i = 0; i < 10; i++) {
			var id = Math.ceil(Math.random() * 35);
			res += jschars[id];
		}
		return res;
	},
	isArray: function(o) {
		var ots = Object.prototype.toString;
		return o && (o.constructor === Array || ots.call(o) === "[object Array]");
	},
	isObject: function(o) {
		var ots = Object.prototype.toString;
		return o && (o.constructor === Object || ots.call(o) === "[object Object]");
	},
	isBoolean: function(o) {
		return (o === false || o) && (o.constructor === Boolean);
	},
	isNumber: function(o) {
		return (o === 0 || o) && o.constructor === Number;
	},
	isUndefined: function(o) {
		return typeof(o) === "undefined";
	},
	isNull: function(o) {
		return o === null;
	},
	isFunction: function(o) {
		return o && (o.constructor === Function);
	},
	isString: function(o) {
		return (o === "" || o) && (o.constructor === String);
	},
	isEmptyObject: function(obj) {
		for (var n in obj) {
			return false;
		}
		return true;
	},
	keys: function(obj) {
		var keys = [];
		if (this.isObject(obj)) {
			for (var key in obj) {
				keys.push(key);
			}
		}
		return keys;
	},
	findPosition: function(oElement) {
		var x2 = 0;
		var y2 = 0;
		var width = oElement.offsetWidth;
		var height = oElement.offsetHeight;
		if (typeof(oElement.offsetParent) != 'undefined') {
			for (var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent) {
				posX += oElement.offsetLeft;
				posY += oElement.offsetTop;
			}
			x2 = posX + width;
			y2 = posY + height;
			return [posX, posY, x2, y2];

		} else {
			x2 = oElement.x + width;
			y2 = oElement.y + height;
			return [oElement.x, oElement.y, x2, y2];
		}
	},
	scrollTo: function(top) {
		var _top = 0;
		var flg = 5;
		setTimeout(function() {
			_top = _top - flg;
			if (_top > top) {
				$('.list-scroll').css({
					'-webkit-transform': 'translate3d(0px, ' + _top + 'px, 0px) scale(1);'
				});
				setTimeout(arguments.callee, 10);
			}
		}, 1);
		return 'suchiva';
	},
	equal: function(objA, objB) {
		if (typeof arguments[0] != typeof arguments[1])
			return false;
		//数组
		if (arguments[0] instanceof Array) {
			if (arguments[0].length != arguments[1].length)
				return false;

			var allElementsEqual = true;
			for (var i = 0; i < arguments[0].length; ++i) {
				if (typeof arguments[0][i] != typeof arguments[1][i])
					return false;

				if (typeof arguments[0][i] == 'number' && typeof arguments[1][i] == 'number')
					allElementsEqual = (arguments[0][i] == arguments[1][i]);
				else
					allElementsEqual = arguments.callee(arguments[0][i], arguments[1][i]); //递归判断对象是否相等
			}
			return allElementsEqual;
		}

		//对象
		if (arguments[0] instanceof Object && arguments[1] instanceof Object) {
			var result = true;
			var attributeLengthA = 0,
				attributeLengthB = 0;
			for (var o in arguments[0]) {
				//判断两个对象的同名属性是否相同（数字或字符串）
				if (typeof arguments[0][o] == 'number' || typeof arguments[0][o] == 'string')
					result = eval("arguments[0]['" + o + "'] == arguments[1]['" + o + "']");
				else {
					//如果对象的属性也是对象，则递归判断两个对象的同名属性
					//if (!arguments.callee(arguments[0][o], arguments[1][o]))
					if (!arguments.callee(eval("arguments[0]['" + o + "']"), eval("arguments[1]['" + o + "']"))) {
						result = false;
						return result;
					}
				}
				++attributeLengthA;
			}

			for (var o in arguments[1]) {
				++attributeLengthB;
			}

			//如果两个对象的属性数目不等，则两个对象也不等
			if (attributeLengthA != attributeLengthB)
				result = false;
			return result;
		}
		return arguments[0] == arguments[1];
	},
	now: function() {
		return (new Date()).getTime();
	},
	rand: function() {
		return Math.random().toString().substr(2);
	},
	adpter: function(data, map) {
		var keys = LAPP.Util.keys(map);
		if (!LAPP.Util.isArray(data)) {
			data = [data];
		}
		var newData = [];
		for (var i = 0; i < data.length; i++) {
			var temp = data[i];
			var obj = {};
			for (var j = 0; j < keys.length; j++) {
				var value = map.get(keys[j]);
				if (typeof temp[value] != "undefined") {
					obj[keys[j]] = temp[value];
				}
			}
			newData.push(obj);
		};
		return newData;
	},
	getCurrentTime: function(format) {
		var dt = new Date();
		if (format == undefined) {
			format = "YYYY-MM-DD hh:mm:ss"
		}
		var o = {
			"M+": dt.getMonth() + 1, //month
			"D+": dt.getDate(), //day
			"h+": dt.getHours(), //hour
			"m+": dt.getMinutes(), //minute
			"s+": dt.getSeconds(), //second
			"w": dt.getDay(),
			"q+": Math.floor((dt.getMonth() + 3) / 3),
			"S": dt.getMilliseconds() //millisecond
		};
		if (/(Y+)/.test(format)) {
			format = format.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		var m = dt.getMonth() + 1;
		var d = dt.getDate();
		var y = dt.getFullYear();
		if (m < 10) {
			m = "0" + m;
		}
		if (d < 10) {
			d = "0" + d;
		}
		return format;
	},
	dateDiff: function(interval, start, end) {
		var date3 = end.getTime() - start.getTime(); //时间差的毫秒数
		//计算出相差天数
		var days = Math.floor(date3 / (24 * 3600 * 1000));
		//计算出小时数
		var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
		var hours = Math.floor(leave1 / (3600 * 1000));
		//计算相差分钟数
		var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
		var minutes = Math.floor(leave2 / (60 * 1000));
		//计算相差秒数
		var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
		var seconds = Math.round(leave3 / 1000);
		var diff = 0;
		switch (interval) {
			case "h":
				diff = d * 24 + h + (m / 60);
				break;
			case "m":
				diff = (d * 24 + h) * 60 + m;
				break;
		};
		return diff;
	},
	debounce: function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this,
				args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	},
	extend: function(destination, source) {
		for (var n in source) {
			if (source.hasOwnProperty(n)) {
				destination[n] = source[n];
			}
		}
		return destination;
	},
	Class: function() {
		var length = arguments.length;
		var option = arguments[length - 1];
		option.init = option.init || function() {};

		if (length === 2) {
			var superClass = arguments[0].extend;

			var tempClass = function() {};
			tempClass.prototype = superClass.prototype;

			var subClass = function() {
				return new subClass.prototype._init(arguments);
			}

			subClass.superClass = superClass.prototype;
			subClass.callSuper = function(context, func) {
				var slice = Array.prototype.slice;
				var a = slice.call(arguments, 2);
				var func = subClass.superClass[func];

				if (func) {
					func.apply(context, a.concat(slice.call(arguments)));
				}
			};
			subClass.prototype = new tempClass();
			subClass.prototype.constructor = subClass;

			this.extend(subClass.prototype, option);

			subClass.prototype._init = function(args) {
				this.init.apply(this, args);
			};
			subClass.prototype._init.prototype = subClass.prototype;
			return subClass;

		} else if (length === 1) {
			var newClass = function() {
				return new newClass.prototype._init(arguments);
			}
			newClass.prototype = option;
			newClass.prototype._init = function(arg) {
				this.init.apply(this, arg);
			};
			newClass.prototype._init.prototype = newClass.prototype;
			return newClass;
		}
	},
	sizeof: function(str, charset) {
		var total = 0,
			charCode,
			i,
			len;
		charset = charset ? charset.toLowerCase() : '';
		if (charset === 'utf-16' || charset === 'utf16') {
			for (i = 0, len = str.length; i < len; i++) {
				charCode = str.charCodeAt(i);
				if (charCode <= 0xffff) {
					total += 2;
				} else {
					total += 4;
				}
			}
		} else {
			for (i = 0, len = str.length; i < len; i++) {
				charCode = str.charCodeAt(i);
				if (charCode <= 0x007f) {
					total += 1;
				} else if (charCode <= 0x07ff) {
					total += 2;
				} else if (charCode <= 0xffff) {
					total += 3;
				} else {
					total += 4;
				}
			}
		}
		return total;
	},
	loadSources: function(data, callback) {
		var data = data,
			n = 0,
			j,
			len = data.length,
			_type_arr = [],
			arr = [];
		for (; n < len; n++) {
			var isTogglepanel = data[n].isTogglepanel,
				formData = isTogglepanel ? data[n].data[0].data : data[n].data,
				_FormData_len = formData.length;
			for (j = 0; j < _FormData_len; j++) {
				var _type = formData[j].type;
				if (_type_arr.indexOf(_type) == -1) {
					_type_arr.push(_type);
					if (_type == 'number' || _type == 'inputText' || _type == 'textarea') {
						arr.push('core/widget/basic/input.js');
					} else if (_type == 'switchBtn') {
						arr.push('core/widget/basic/switch.js');
					} else if (_type == 'dragBar') {
						arr.push('core/widget/basic/jquery.range.js');
						arr.push('core/widget/basic/slider.js');
					} else if (_type == 'btn') {
						arr.push('core/widget/basic/button.js');
					} else if (_type == 'radio') {
						arr.push('core/widget/basic/radio.js');
					} else if (_type == 'checkbox') {
						arr.push('core/widget/basic/checkbox.js');
					}
				}
			}
		}
		callback(arr);
	}
};