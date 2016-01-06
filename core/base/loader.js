if(!LAPP){
	var LAPP = {};
}
(function( window, undefined ){ 
	/**
	 * 预加载img, css, js文件
	 * @param files {object array} 预加载文件数组
	 * @example
	 *     preload([
	 *        'yourpath/x.png',
	 *        'yourpath/x.js',
	 *        'yourpath/x.css'
	 *     ]);
	*/
	function preload( files ){
	    if(Object.prototype.toString.call(files) !== "[object Array]"){return;}
	    var obj = null,
	        ie  = '\v'=='v'; //

	    for(var i = 0, l = files.length; i < l; i ++){
	        if (ie) {
	            new Image().src = files[i];
	            continue;
	        }
	        obj = document.createElement('object');
	        obj.data = loader.jsbase+files[i];
	        obj.width  = 0;
	        obj.height = 0;
	        document.body.appendChild(obj);
	    }
	};
	function preloadModule( moduleNames ) {
		var arr = [];
		for( var i = 0; i < moduleNames.length; i++ ) {
			var temp = modules[moduleNames[i]];
			if( temp == undefined ) {
				continue;
			}
			var js = temp.js;
			var css = temp.css;
			if( !$.isArray( js ) && js != undefined ) {
				js = [js];
			};
			if( !$.isArray( css ) && css != undefined ) {
				css = [css];
			};
			if( js != undefined ) {
				arr = arr.concat(js);
			} 
			if( css != undefined ) {
				arr = arr.concat(css);
			}
		}
		preload(arr);
	};
	var nativeDependen = ["loading"]; //["loading","dataCp","zTouch","klass","basic"];
	var nativeType = LAPP.Util.getDevice();
	if( nativeType == "IOS" ) {
		nativeDependen.push("ios");
	}else if( nativeType == "ANDROID" ) {
		nativeDependen.push("android");
	}else if( nativeType == "WEB" ){
		nativeDependen.push("web");
	}else{
		nativeDependen.push('pc');
	}
	var modules = {
		css : {
			css : ['css/loader/loading.css','css/layout/layout.css','css/list/timeline.css','css/calendar/calendar.css','css/form/form.css','css/accordion/vocationlist.css','css/toolbar/toolbar.css']
		},
		nativeApi:{
			js :  "core/interface/nativeAPI.js",
			css : "css/base.css",
			dependencies: nativeDependen
		},
        klass : {
            js : ["core/lib/klass.js"]
        },
        basic : {
            js : ["core/lib/juicer.js","core/base/basicPlug.js"]
        },
		DataCP : {
			js : ["core/datacenter/dataCp.js"]
		},
		animation : {
			js : "core/base/animation.js"
		},
		pc : {
			js : "core/native/pc.js"
		},
		ios : {
			js : "core/native/ios.js"
		},
		android : {
			js : "core/native/android.js"
		},
		iScroll : {
			js:"core/widget/business/LAPPIscroll/LAPPIscroll.js"//'core/widget/business/iscroll/iscroll.js', 
		},
		loading : {
			css : 'css/component/loading/loading.css',
			js : 'core/base/loading.js'
		},
		Layout:{
			js:'core/widget/business/layout/layout.js'
			//css:'css/layout/layout.css'
		},
		Calendar:{
			js:'core/widget/business/calendar/calendar.js'
			//css:'css/calendar/calendar.css'
		},
		OrganPanel:{
			js:'core/widget/business/organpanel/organpanel.js'
			//css:'css/calendar/calendar.css'
		},
		Carousel:{
			js:'core/widget/business/carousel/carousel.js'
			//css:'css/carousel/carousel.css'
		},
		Grouping : {
			js:['core/widget/business/grouping/grouping.js']
		},
		List:{
			js:['core/widget/business/list/list.js']
			//dependencies: ["List_Component"]
		},
		Card:{
			js:['core/widget/business/card/card.js']
			//dependencies: ["List_Component"]
		},
		/*List_Component : {
			js:['core/widget/component/list/list.js']
		},*/

		zTouch : {
			js : "core/lib/zTouch.js"
		},
		Tab : {
			js:'core/widget/business/tab/tab.js'
			// css:'css/tab/tab.css'
		},
		Form : {
			js:'core/widget/business/form/form.js'
			//css:'css/form/form.css'
		},
		Flowchart : {
			js:'js/core/widget/business/flowchart/flowchart.js',
			css:'css/flowchart/flowchart.css',
			dependencies: ["iScroll"]
		},
		Popup: {
			js:'js/core/widget/business/popup/popup.js',
			css:'css/popup/popup.css',
		},
		Attach : {
			js:'core/widget/business/attach/attach.js',
			//css:'css/attach/attachview.css',
			dependencies: ["iScroll"]
		},
		buttonLayer : {
			js:'core/widget/business/buttonlayer/buttonlayer.js'
			//css:'css/button/buttonlayer.css'
		},
		Btcolumn : {
			js:'core/widget/business/btcolumn/btcolumn.js'
			//css:'css/button/buttonlayer.css'
		},
		Toast: {
			js:'core/widget/business/toast/toast.js'
			//css:'css/toast/toast.css'
		},
		Clock : {
			js:'core/widget/business/clock/clock.js',
			css:'css/clock/clock.css'
		},
		Dialog : {
			js:'core/widget/business/dialog/dialog.js'
			//css:'css/tooltip/dialog.css'
		},
		LAPPMap : {
			js:'core/widget/business/LAPPMap/LAPPMap.js',
			css:'css/LAPPMap/LAPPMap.css',
			dependencies:['bus', "diving", "walking"]  
		},
		bus : {
			js:'core/widget/business/LAPPMap/bus.js'
		},
		diving : {
			js:'core/widget/business/LAPPMap/diving.js'
		},
		walking : {
			js:'core/widget/business/LAPPMap/walking.js'
		},
		Menu : {
			js:'core/widget/business/menu/menu.js'
			//css:'css/menu/menu.css'
		},
		Panel : {
			js:'core/widget/business/panel/panel.js'
			//css:'css/panel/panel.css'
		},
		Process : {
			js:'core/widget/business/process/process.js'
			//css:'css/progress/process.css'
		},
		PushButton : {
			js:'core/widget/business/pushbutton/pushbutton.js'
			//css:'css/button/pushbutton.css'
		},
		ProgressBar: {
			js:'core/widget/business/progressbar/progressbar.js',
			//css:'css/progress/progressbar.css',
			dependencies: ["iScroll"]
		}, 
		ScrollPack : {
			js:'js/core/widget/business/scrollPack/scrollPack.js',
			css:'css/scrollPack/scrollPack.css'
		},
		Search : {
			js:'core/widget/business/search/search.js'
		},
		Tips : {
			js:'core/widget/business/tooltip/tips.js'
			//css:'css/tooltip/tips.css'
		},
		Table : {
			js:'core/widget/business/table/table.js'
			//css:'css/grid/table.css'
		},
		Toolbar : {
			js:['core/widget/business/toolbar/toolbar.js']
			//css:'css/toolbar/toolbar.css'
		},
		TogglePanel: {
			js:['core/widget/business/togglepanel/togglepanel.js'],
			//css:'css/accordion/togglepanel.css',
			dependencies: ["iScroll"]
		},
		Timepick: {
			js:['core/widget/business/timepick/timepick.js'],
			//css:'css/timepick/timepick.css',
			dependencies: ["iScroll"]
		},
		Note : {
			js:['core/widget/business/note/note.js']
			//css:'css/note/note.css',
		},
		Chart : {
			js: ['core/widget/business/chart/chartRender.js','core/widget/business/chart/chart.js']
		},
		Timeline : {
			js:['core/widget/business/timeline/timeline.js']
			//css:'css/progress/timeline.css' 
		},
		Sidebar: {
			js:['core/widget/business/sidebar/sidebar.js'],
			//css:'css/sidebar/sidebar.css'
		},
		VocationList : {
			js:['js/core/widget/business/accordion/vocationlist.js'],
			css:'css/accordion/vocationlist.css',
			dependencies: ["iScroll"]
		},
	    ListLoading: {
	       js: ['core/widget/business/loader/listLoading.js'],
	       css: 'css/component/loader/listLoading.css'
	     },
	    ListSelect: {
	     	 js: ['core/widget/business/list/listselect.js']
	     	 //css: 'css/list/listselect.css'
	    },
	    MonthGroup : {
	     	js : ['core/widget/business/monthgroup/monthgroup.js']
	    },
	    BtnNumber : {
	     	js : ['core/widget/business/btnnumber/btnnumber.js']
	    },
	    SerialNumber : {
	     	js : ['core/widget/business/serialnumber/serialnumber.js']
	    },
	    ScrollTime : {
	     	js : ['core/widget/business/scrolltime/scrolltime.js']
	    }
	};
	var queues = {};
	var loadJs = function(url, callback){
		if( !$.isArray(url) ){
			url = [url];
		}
		var index = 0;
		function loadS( index ) {
			var done = false;
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.language = 'javascript';
			script.src = loader.jsbase + url[index];
			script.onload = script.onreadystatechange = function(){ 
				if (!done && (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete')){
					done = true;
					script.onload = script.onreadystatechange = null;
					index++;
					if( index == url.length ){
						if (callback){
							callback.call(script);
						}
					}else{
						loadS( index );
					}
					
				}
			};
			document.getElementsByTagName("head")[0].appendChild(script);
		}
		loadS( index );
	};
	var loadCss = function (url, callback){
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.media = 'screen';
		link.href = loader.cssbase + url;
		document.getElementsByTagName('head')[0].appendChild(link);
		if (callback){
			callback.call(link);
		}
	};
	var loadSingle = function (name, callback){
		queues[name] = 'loading';
		var module = loader.modules[name];
		var jsStatus = 'loading';
		var cssStatus = (loader["css"] && module["css"]) ? "loading" : "loaded";
		if (loader.css && module['css']){
			if (/^http/i.test(module['css'])){
				var url = module['css'];
			} else {
				var url = module['css'];
			}
			loadCss(url, function(){
				cssStatus = 'loaded';
				if (jsStatus == 'loaded' && cssStatus == 'loaded'){
					finish();
				};
			});
		}
		if (/^http/i.test(module['js'])){
			var url = module['js'];
		} else {
			var url = module['js'];
		}
		loadJs(url, function(){
			jsStatus = 'loaded';
			if (jsStatus == 'loaded' && cssStatus == 'loaded'){
				finish();
			}
		});
		function finish(){
			queues[name] = 'loaded';
			loader.onProgress(name);
			if (callback){
				callback();
			}
		}
	};
	var loadModule = function (name, callback){
		var mm = [];
		var doLoad = false;
		if (typeof name == 'string'){
			add(name);
		} else {
			for(var i=0; i<name.length; i++){
				add(name[i]);
			}
		};
		function add(name){
			if (!loader.modules[name]) return;
			var d = loader.modules[name]['dependencies'];
			if (d){
				for(var i=0; i<d.length; i++){
					add(d[i]);
				}
			}
			mm.push(name);
		}
		function finish(){
			if (callback){
				callback();
			}
			loader.onLoad(name);
		}
		var time = 0;
		function loadMm(){
			if (mm.length){
				var m = mm[0];	
				if (!queues[m]){
					doLoad = true; 
					loadSingle(m, function(){
						mm.shift();
						loadMm();
					});
				} else if (queues[m] == 'loaded'){
					mm.shift();
					loadMm();
				} else {
					if (time < loader.timeout){
						time += 10;
						setTimeout(arguments.callee, 10); 
					}
				}
			} else {
				finish();
			}
		}
		loadMm();
	};
	var loader = {
		modules : modules,
		jsbase:'../../', 
		cssbase : '../../',
		css:true,  
		timeout:2000,
		preLoadModule : [],
		preload : function() {
			preloadModule(this.preLoadModule);
		},
		load: function(name, callback){
			if (/\.css$/i.test(name)){
				if (/^http/i.test(name)){
					loadCss(name, callback);
				} else {
					loadCss(loader.base + name, callback);
				}
			} 
			else if (/\.js$/i.test(name)){
				if (/^http/i.test(name)){
					loadJs(name, callback);
				} else {
					loadJs(name, callback);
				}
			} else {
				loadModule(name, callback);
			}
		},
		setModules : function( module ) {
			this.modules = $.extend(true, {}, this.modules, module);
		},
		onProgress: function(name){},
		onLoad: function(name){}
	};
	LAPP.Loader = loader;
}( window ));
