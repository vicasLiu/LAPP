if(!LAPP){
	var LAPP = {};
};
var DataCenter;
(function(){
	var i = 0, t1;
	var inst = null;
	var isOnline = function() {
		return navigator.onLine;
	};
	var createStorageKey = function( arg ) {
		
	};
	var Cache = function() {
		var defaultOptions = {
			maxCount : 20
		};
		var requestData = function( arg ) {
			if( isOnline ) {
				LAPP.NativeAPI.handleData(arg);
			}else{
				getCachData( arg );
			}
		};
		var getCachData = function( arg ) {
			if( !judgeData(arg) ) {
				
			}else {
				return data;
			}
		};
		var cacheData = function() {
			
		};
		var updateCacheData = function() {
			
		};
		var judgeData = function( arg ) {
			
		};
		this.requestData = requestData;
	};
	/*
	 * @brief: 定义队列类
	 * @remark:实现队列基本功能
	 */
	var Queue = function (){
		var self = this;
	    var arr = new Array();
        var cache = new Cache();
	    var status = "stop";
	    self.queue = function( arg ) {
	    	loading.proceeding("dataLoading");
	    	arr.push(arg);
	    	if(arr.length == 1 && status == "stop"){
	    		this.excute( arr.pop() );
	    	}
	    };
	    self.dequeue = function() {
	    	if(arr.length == 0){
	    		status = "stop";
	    		loading.destroy();
	    		return;
	    	};
	    	var a = arr.shift();
	    	status = "stop";
	    	self.excute(a);
	    };
	    self.excute = function( arg ) {
	    	status = "running";
	    	var callback = arg["callback"];
	    	var _inst = arg['inst'];
        	if( _inst != undefined ) {
        		LAPP.NativeAPI.getLoginInfo(inst);
        	}else {
        		arg["cb"] = function( data ) {
            		self.dequeue();
            		callback( data );
            	};
            	cache.requestData(arg);
        	}
	    };
	};
	/*
	* @brief: 定义数据中心类
	* @remark: 单列模式实现
	*/
    var instance;
    DataCenter = function DataCenter( pointer ){
        if( instance ){
            return instance;
        };
        instance = this;
        inst = pointer;
        var queue = new Queue();
        var dataObj = {};
        this.ajax = function( arg ) {
        	if( arg["common"] ) {
        		var newDataOBJ = $.extend(true, {}, dataObj, arg["common"]);
        		var _paramObj = $.extend(true, {}, newDataOBJ, arg);
        	}else{
        		var _paramObj = $.extend(true, {}, dataObj, arg);
        	}
        	queue.queue(_paramObj);
        };
        this.setData = function( data ) {
        	dataObj = data;
        };
        this.dequeue = function(){
        	queue.dequeue();
        };
    };
}());
