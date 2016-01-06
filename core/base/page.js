if (!LAPP) {
	var LAPP = {};
};
(function(window, undefined) {
	var id = LAPP.Util.createId(),
		loderMoudle = [],
		paramObj = null,
		pageParamObj = null,
		activeId = id,
		componentsList = new Map(),
		currentId = [],
		layer = new Map(),
		pageModule = new Map(),
		$cacheDom = new Map(),
		$currentIndex = 0,
		$currentTitle = '',
		$currentStatus = '',
		$currentKey = '',
		hideLayer = ["test1"],
		__newId = "",
		__oldId = "",
		__componentIndex = 0
		__loadIndex = 0;

	window.__LAPPlog = function(json) {
		json["from"] = "HTML5";
		json["level"] = "high";
		json = JSON.stringify(json);
		LAPP.NativeAPI.log(json);
	};
	var getModule = function(key) {
		var keys = $cacheDom.keys(),
			obj = {};
		for (var i = 0; i < keys.length; i++) {
			if ($cacheDom.get(keys[i]).moudleName == key) {
				obj.value = $cacheDom.get(keys[i]);
				obj.key = keys[i];
				break;
			}
		}
		return obj;
	};
	var getComponentSize = function( op ) {
		for( var _key in op ) {
			if( $.isArray(op[_key]) ) {
				__componentIndex += op[_key].length;
			}else{
				__componentIndex++;
			}
		}
	};
	var createComponents = function(op, type) {
		// __componentIndex++;
		if (typeof op.id == "undefined" || componentsList.get(op.id) == undefined) {
			var temp = new LAPP[type](id);
			temp.componentId = op.id ? op.id : id;
			if (op.subId != undefined) {
				temp.subId = op.subId;
			} else {
				temp.subId = id;
			}
			componentsList.put(temp.componentId, temp);
			$("#" + op.render).html('');
			currentId.push(op.render);
			temp.init(op);
		} else {
			var c = componentsList.get(op.id);
			if (op.subId != undefined) {
				c.subId = op.subId;
			} else {
				c.subId = id;
			}
			$("#" + op.render).html('');
			currentId.push(op.render);
			c.init(op);
		}
	};
	var initComponents = function(options, key, title, status, animation) {
		$currentKey = key;
		currentId = [];
		var arrCp = [];
		for (var i in options) {
			if (typeof LAPP[i] != "undefined") {
				if (LAPP.Util.isArray(options[i])) {
					var o = options[i];
					for (var k = 0; k < o.length; k++) {
						createComponents(o[k], i);
						arrCp.push(o[k].id);
						if (o[k].show === false) {
							hideLayer.push(o[k].render);
						}
					}
				} else {
					createComponents(options[i], i);
					arrCp.push(options[i].id);
					if (options[i].show === false) {
						hideLayer.push(options[i].render);
					}
				}
			}
		};
		layer.put(key, "layer");
		$cacheDom.put("index" + $currentIndex, {
			render: currentId,
			title: title,
			status: status,
			moudleName: key,
			animation: animation
		});
		pageModule.put(key, arrCp);
		//rebuildDom(key, currentId);
	};
	var setActive = function(key) {
		var keys = pageModule.keys();
		for (var i = keys.length - 1; i >= 0; i--) {
			var arrcp = pageModule.get(keys[i]);
			if (keys[i] == key) {
				for (var j = 0; j < arrcp.length; j++) {
					var cp = componentsList.get(arrcp[j]);
					cp.setActive(true);
				}
			} else {
				for (var j = 0; j < arrcp.length; j++) {
					var cp = componentsList.get(arrcp[j]);
					cp.setActive(false);
				}
			}
		};
	};
	var deleteCp = function(key) {
		var cps = pageModule.get(key);
		if (cps == undefined) {
			return;
		}
		for (var i = 0; i < cps.length; i++) {
			var cp = componentsList.get(cps[j]);
			cp.setActive(false);
			componentsList.removeByKey(cps[i]);
		}
		pageModule.removeByKey(key);
	};
	var removeDom = function(oldLayer) {
		if (oldLayer != undefined) {
			var oID = oldLayer["moudleName"];
			oldId = $("#" + oID + "_pageModule")[0];
			if (!LAPP.Util.isArray(oldLayer)) {
				oldLayer = [oldLayer];
			}
			for (var j = 0; j < oldLayer.length; j++) {
				var renderArr = oldLayer[j].render;
				for (var i = 0; i < renderArr.length; i++) {
					$("#" + renderArr[i]).empty();
				}
			}
		}
	};
	var partDom = function(layout, currentlayer) {
		var oldId = [];
		var newId = [];
		var type = "";
		for (var i = 0; i < layout.length; i++) {
			var id = $(layout[i]).attr("id");
			var render = currentlayer.render;
			if ($.inArray(id, render) == -1) {
				if (id != "LAPP-header" && id != "LAPP-footer") {
					//$(layout[i]).hide();
					oldId.push($(layout[i])[0]);
				}
			} else if ($.inArray(id, []) == -1) {
				//$(layout[i]).show();
				if (id != "LAPP-header" && id != "LAPP-footer") {
					newId.push($(layout[i])[0]);
				}
			} else {
				//$(layout[i]).hide();
				oldId.push($(layout[i])[0]);
			}
		};
		return {
			o: oldId,
			n: newId
		};
	};
	var displayDom = function(layout, currentlayer, flg) {
		for (var i = 0; i < layout.length; i++) {
			var id = $(layout[i]).attr("id");
			var render = currentlayer.render;
			if ($.inArray(id, hideLayer) == -1) {
				if ($.inArray(id, render) != -1) {
					if( flg === true && $(layout[i]).css("display") == "none") {

					}else{
						$(layout[i]).show();
					}
				} else if (id == "LAPP-header" || id == "LAPP-footer") {
					$(layout[i]).show();
				}
			}else{
				$(layout[i]).hide();
			}
		};
	};
	var initPage = function(currentlayer, oldLayer, flg) {
		var layout = $('body').find(".LAPP-layout");
		var title = currentlayer["title"] ? currentlayer["title"] : "";
		var key = currentlayer["moudleName"];
		var animation = currentlayer["animation"] ? currentlayer["animation"] : "slide";
		$("#LAPP-header").find(".LAPP-toolbar-btnGroup").text(title);
		var o = partDom(layout, currentlayer);
		var temp = null;
		var oldId = ""
		var newId = "";
		var aKey = key + "-module";
		if (flg == undefined) {
			flg = false;
		} else if (oldLayer != undefined) {
			aKey = key + "-module";
			animation = oldLayer["animation"] ? oldLayer["animation"] : "slide";
			//deleteCp(oldLayer.moudleName);
		}
		if( flg ){
			setActive(key);
		}
		temp = LAPP.animation.init(o.n, aKey);
		displayDom(layout, currentlayer, flg);
		LAPP.animation.perform(__oldId, temp.n, flg, animation, function() {
			removeDom(oldLayer);
		});
		__oldId = temp.n;
	};
	//初始化插件方法
	var init = function(value, callback) {
		var moudle = [];
		var moudles = {};
		if (typeof value == "string") {
			if ($.inArray(value, loderMoudle) == -1) {
				loderMoudle.push(value);
				moudle.push(value);
			}
		}
		for (var key in value) {
			if ($.inArray(key, loderMoudle) == -1) {
				loderMoudle.push(key);
				moudle.push(key);
				if (value[key].style != undefined) {
					moudles[key] = {};
					moudles[key]["css"] = value[key].style;
				}
			}
		};
		if (moudle.length == 0) {
			callback();
		} else {
			//设置插件渲染
			LAPP.Loader.setModules(moudles);
			//加载插件文件
			LAPP.Loader.load(loderMoudle, function() {
				callback();
			});
		}
	};
	var hideScroll = function() {
		setTimeout(function() {
			if (!location.hash) {
				var ph = window.innerHeight + 60;
				if (document.documentElement.clientHeight < ph) {
					setStyle(document.body, "minHeight", ph + "px");
				}
				window.scrollTo(0, 1);
			}
		}, 1000);
	};
	var setStyle = function(elem, styleName, styleValue) {
		elem.style[styleName] = styleValue;
	};
	var handleFinished = function( inst ) {
		__loadIndex++;
		if( __componentIndex == __loadIndex ) {
			setActive($currentKey);
			LAPP.Publisher.publish("publishPageStatus", $currentStatus, inst);
			LAPP.Publisher.publish("publishParam", paramObj, inst);
			$("#LAPP-header").find(".LAPP-toolbar-btnGroup").text($currentTitle);
		}
	};
	var Page = function() {
		LAPP.Loader.preload();
		var me = this;
		id = LAPP.Util.createId();
		LAPP.Publisher.unsubscribe("getLoginFinish", me);
		LAPP.Publisher.subscribe("setParam", function(arg) {
			me.setParam(arg);
		}, me);
		LAPP.Publisher.subscribe("setPageStatus", function(arg) {
			me.setPageStatus(arg);
		}, me);
		LAPP.Publisher.subscribe("businessWidgetLoaded", function() {
			handleFinished(me);
		}, me);
	};
	Page.prototype = {
		constructor: Page,
		//返回当前id
		getSubId: function() {
			return id;
		},
		//是否激活
		getActive: function() {
			return true;
		},
		//设置插件路径
		config: function(op) {
			if (op.base) {
				seajs.config({
					base: op.base
				});
			} else {
				seajs.config({
					base: "../../../../LAPP/"
				});
			}
			$.extend(LAPP.Loader, op);
		},
		//用户登陆成功回调
		Ready: function(callback) {
			var self = this;
			document.body.addEventListener('touchmove', function(e) {
				e.stopPropagation();
				e.preventDefault();
			});
			LAPP.Publisher.subscribe("getLoginFinish", function(arg) {
				callback(arg);
			}, this);
			LAPP.Loader.load(['nativeApi'], function() {
				//	loading.init("pageLoading");
				var obj = {
					
				};
				//obj = JSON.stringify(obj);
				LAPP.NativeAPI.getLoginInfo(self, obj);
			});
		},
		//创建组件 参数： 组件类型、配置、key、标题、状态、销毁开关、动画
		createComponent: function(type, options, key, title, status, flg, animation) {
			//var comp = null;
			var me = this;
			__componentIndex = 0;
			__loadIndex = 0;
			$currentStatus = status;
			$currentTitle = title;
			init(type, function() {
				if (flg == undefined || !flg) {
					currentId = [];
				}
				var render = options.render;
				$("#" + render).html('');
				createComponents(options, type);
				if (flg == undefined || !flg) {
					$currentIndex++;
					layer.put(key, "layer");
					$cacheDom.put("index" + $currentIndex, {
						render: currentId,
						title: title,
						status: status,
						moudleName: key,
						animation: animation
					});
					initPage({
						render: currentId,
						title: title,
						status: status,
						moudleName: key,
						animation: animation
					});
					// LAPP.Publisher.publish("publishParam", paramObj, me);
					// LAPP.Publisher.publish("publishPageStatus", status, me);
				} else {
					hideLayer.push(render);
					$("#" + render).show();
				};
				// LAPP.Publisher.publish("render", me);
			});
		},
		//设置配置
		setOptions: function(options, key, title, status, animation) {
			__componentIndex = 0;
			__loadIndex = 0;
			getComponentSize(options);
			$currentStatus = status;
			$currentTitle = title;
			var me = this;
			init(options, function() {
				$currentIndex++;
				LAPP.Publisher.publish("getParam", me);
				initComponents(options, key, title, status, animation);
				initPage({
					render: currentId,
					title: title,
					status: status,
					moudleName: key,
					animation: animation
				});
				//LAPP.Publisher.publish("render", me);
			});
		},
		setData: function(data) {
			var dc = new DataCenter(this);
			dc.setData(data);
		},
		setParam: function(obj) {
			var data = obj.data;
			activeId = obj.id;
			pageParamObj = $.extend(false, {}, pageParamObj, data);
			paramObj = $.extend(true, {}, paramObj, data[activeId]);
		},
		setPageStatus: function(status) {
			var layerId = $cacheDom.get("index" + $currentIndex);
			if (layerId["status"] != undefined) {
				layerId["status"] = status
			}
			LAPP.Publisher.publish("publishPageStatus", status, this);
		},
		setDataControl: function(dataInst) {
			LAPP.NativeAPI.setDataControl(dataInst);
		},
		setNativeCb: function(cbInst) {
			LAPP.NativeAPI.setNativeCb(cbInst);
		},
		setAPIInterFace: function(apiInterfase) {
			LAPP.NativeAPI.setAPIInterFace(apiInterfase);
		},
		setAPI: function(apiInst) {
			LAPP.NativeAPI.setAPI(apiInst);
		},
		getPageParam: function() {
			LAPP.Publisher.publish("getParam", this);
			return pageParamObj;
		},
		getParam: function() {
			LAPP.Publisher.publish("getParam", this);
			return paramObj;
		},
		submitData: function() {
			LAPP.Publisher.publish("submitData", this);
		},
		getLoginName: function() {
			//return window.localStorage.getItem("loginName");
		},
		setUrlParm: function(p) {
			window.localStorage.setItem("urlParam", p);
		},
		getUrlParm: function() {
			var p = window.localStorage.getItem("urlParam");
			if (p == null) {
				p = "";
			}
			return p;
		},
		getPageCurrentStatus: function(key) {
			var keys = $cacheDom.keys(), retValue = null;
			for( var i = 0; i < keys.length; i++ ) {
				var value = $cacheDom.get(keys[i]);
				if( key == value.key ) {
					retValue = value;
					retValue["index"] = keys[i];
					break;
				}
			}
			return retValue;
		},
		nextPage: function(o) {
			var aurl = o.split("?");
			var url = aurl[0];
			if (aurl.length > 0) {
				var p = aurl[1];
				this.setUrlParm(p);
			}
			document.location = "" + url;
		},
		requestParaMap: function() {
			var id = location.search;
			if (id == "" || id == null || typeof id == "undefined") {
				id = this.getUrlParm();
			}
			var arrayObj = id.match(/([^?=&]+)(=([^&]*))?/g);
			var returnMap = new Map();
			if (arrayObj == null) return returnMap;
			for (var i = 0; i < arrayObj.length; i++) {
				var conment = arrayObj[i];
				var key = decodeURIComponent(conment.substring(0, conment.indexOf("=")));
				var value = decodeURIComponent(conment.substring(conment.indexOf("=") + 1, conment.length));
				returnMap.put(key, value);
			};
			paramObj = returnMap;
			return returnMap;
		},
		loadPage: function() {},
		goTo: function(key) {
			var obj = getModule(key);
			if (LAPP.Util.isEmptyObject(obj)) {
				return;
			}
			var indexKey = obj.key;
			var layerId = $cacheDom.get(indexKey);
			var index = Number(indexKey.split("index")[1]);
			if (index < $currentIndex) {
				initPage(layerId, undefined, true);
			} else {
				initPage(layerId);
			}
			$currentIndex = index;
		},
		back: function(arg) {
			var currentIndex = $currentIndex;
			var cacheIndex = currentIndex - 1;
			var status = "";
			if (arg == undefined) {
				if (cacheIndex <= 0) {
					window.localStorage.removeItem("urlParam");
					LAPP.NativeAPI.back();
					LAPP = null;
				} else {
					var layerId = $cacheDom.get("index" + cacheIndex);
					var oldLayer = $cacheDom.get("index" + currentIndex);
					status = layerId["status"];
					initPage(layerId, oldLayer, true);
					LAPP.Publisher.publish("publishPageStatus", status, this);
				}
				$currentIndex--;
			} else if (typeof arg == "string") {
				document.location.href = arg;
			} else if (typeof arg == "number") {
				if (arg <= 0) {
					LAPP.NativeAPI.back();
				} else {
					var oldLayer = [];
					for (var i = arg + 1; i <= currentIndex; i++) {
						oldLayer.push($cacheDom.get("index" + i));
					}
					var layerId = $cacheDom.get("index" + arg);
					status = layerId["status"];
					initPage(layerId, oldLayer, true);
					$currentIndex = arg;
					LAPP.Publisher.publish("publishPageStatus", status, this);
				}
			}
			if($('#ui-loader-verbose').length > 0){
				$('body').find('#ui-loader-verbose').remove();
			}
			if($('.ui-overlay-a').length > 0){
				$('body').find('.ui-overlay-a').remove(); 
			}
			var list_scroll = $(".list-scroll");
			if(list_scroll.attr("translate3d")){
				list_scroll.css("-webkit-transform","translate3d("+ list_scroll.attr("translate3d")+")");
			}
			return $currentIndex;
		},
		refresh: function(componentId, arg) {
			var c = componentsList.get(componentId);
			c.refresh(arg);
		},
		refreshPage: function(arg, title, status) {
			var op = $cacheDom.get("index"+$currentIndex);
			if( title == undefined ) {
				title = op.title;
			}
			if( status == undefined ) {
				status = op.status;
			}
            var animation;
			if(animation == undefined ) {
				animation = op.animation;
			}
			init(arg, function(){
				initComponents(arg, op.moudleName, title, status, animation);
			});
		},
		refreshArea: function(render, op, title, status) {
			var oo = $cacheDom.get("index"+$currentIndex);
			var cp = pageModule.get(oo.moudleName),key;
			for( var i = 0; i < cp.length; i++ ) {
				if( cp[i].render === render || $("#"+render).find("#"+cp[i].render).length > 0 ) {
					cp[i].setActive(false);
				}
			}
			if( title == undefined ) {
				title = oo.title;
			}
			if( status == undefined ) {
				status = oo.status;
			}
			if( animation == undefined ) {
				animation = op.animation;
			}

			if(moudleName == undefined){

				key = oo.moudleName;
			}

			init(op, function(){
				initComponents(op, oo.moudleName, title, status, animation);
				initPage({
					render : currentId,
					title : title,
					status : status,
					moudleName : key,
					oldId : "",
					animation : animation
				});
			});
		},
		openCamera: function(type) {
			var inst = this;
			switch (type) {
				case "photo":
					LAPP.NativeAPI.goPhoto(inst);
					break;
				case "video":
					LAPP.NativeAPI.goVideo(inst);
					break;
				case "record":
					LAPP.NativeAPI.goRecord(inst);
					break;
			};
		},
		getPlug: function(id) {
			return componentsList.get(id);
		},
		triggleEvent: function(eventName, arg, inst) {
			if (inst == undefined) {
				inst = this;
			}
			if (LAPP.Util.isString(inst) && inst != "") {
				inst = componentsList.get(inst);
				inst[eventName](arg);
			} else {
				LAPP.Publisher.publish(eventName, arg, inst);
			}
		},
		setLocalData: function(key, value) {
			value = JSON.stringify(value);
			localStorage.setItem(key, value);
		},
		getLocalData: function(key) {
			var value = localStorage.getItem(key);
			value = JSON.parse(value);
			return value;
		},
		unregisterEvent: function(events, scop) {
			if (!LAPP.Util.isArray(events)) {
				events = [events];
			}
			for (var i = 0; i < events.length; i++) {
				LAPPEMG.unregisterEvent(events[i], scop);
			}
		},
		getPageStatus : function(status) {
            var keys = $cacheDom.values(), retValue = null;
            for( var i = 0; i < keys.length; i++ ) {
                if( status == keys[i].status ) {
                    retValue=$cacheDom.elements[i];
                    break;
                }
            }
            return retValue;
        }
	};
	LAPP.Page = Page;
}(window));