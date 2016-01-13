if(!LAPP){
	var LAPP = {};
};
(function(){
	var subEvent = function( inst ) {
		LAPP.Publisher.unsubscribe("publishParam", inst);
		LAPP.Publisher.unsubscribe("setSubmitData", inst);
		LAPP.Publisher.unsubscribe("setAttachData", inst);
		LAPP.Publisher.unsubscribe("refresh", inst);
		LAPP.Publisher.unsubscribe("onScrollEnd", inst);
		LAPP.Publisher.unsubscribe("getHistoryData", inst);

		LAPP.Publisher.subscribe("publishParam", function( arg ) {
			dataLogic.reciveParam( inst, arg );
		}, inst);
		LAPP.Publisher.subscribe("publishCParam", function( arg ) {
			dataLogic.reciveCParam( inst, arg );
		}, inst);
		LAPP.Publisher.subscribe("refresh", function( arg ) {
			dataLogic.refresh( inst, arg );
		}, inst);
		LAPP.Publisher.subscribe("pullDown", function( arg ) {
			dataLogic.refresh( inst, arg );
		}, inst);
		LAPP.Publisher.subscribe("getHistoryData", function( arg ) {
			dataLogic.getHistoryData( inst, arg );
		}, inst);
		LAPP.Publisher.subscribe("setSubmitData", function( arg ) {
			dataLogic.submitData( inst, arg );
		}, inst);
		LAPP.Publisher.subscribe("setAttachData", function( arg ) {
			dataLogic.setAttachData( inst, arg );
		}, inst);
	};
	var getData = function( arg, cb, inst ) {
		var dc = new DataCenter();
		dc.ajax({
			common : arg['common'],
			data : arg['dataParam'],
			callback : function( data ) {
				if( LAPP.Util.isObject(data) ) {
					loading.init("success");
					if( data.status == true || data.status == 'success' ) {
						LAPP.Publisher.publish("receiveDataStatus", "success", inst);
						if( $.isFunction(cb) ) {
							cb(data);
						}
					}else if( data.status == false ){
						loading.init("error");
						LAPP.Publisher.publish("receiveDataStatus", "error", inst);
					}else if( data.status == "timeout") {
						loading.init("timeout");
						LAPP.Publisher.publish("receiveDataStatus", "timeout", inst);
					}
				}else{
					loading.init("error");
					LAPP.Publisher.publish("receiveDataStatus", "error", inst);
				}
			}
		});
	};
	var upLoadAttach = function( multimedia, id, arg ) {
		if( !LAPP.Util.isArray(multimedia) ) {
			return;
		}
    	var tempM, path = '', len = multimedia.length, index = 0;
    	for(var i = 0; i < multimedia.length; i++){
    		path = multimedia[i].filePath;
    		tempM = {
    			"dataFun" : "",
    			"bill_id" : id,
				"file_name":"EAM_TEST",
    			"file_type": multimedia[i].type
    		};
    		tempM = $.extend(true, {}, tempM, arg );
    		dc.ajax({
    			dtype : "file",
    			ftype : "upLoad",
    			data : tempM,
    			path : path,
    			callback : function( data ) {
    				index++;
    			}
    		});
    	}
	};
	var dataLogic = {
		reciveParam : function( inst, arg ) {
			inst.DYPARAM = arg;
			var op = inst.options, dy = op.dynamicParam
				,dp = op.dataParam
				;
			if( dp == undefined ) {
				return;
			}
			if( dy != undefined ) {
				for( var i in dy ) {
					var value = dy[i];
					if (typeof arg[value] != "undefined") {
						dp[i] = arg[value];
					}
				}
			};
			getData(op, function( data ){
				if( $.isFunction(op.adpter) ){
					data = op.adpter( data );
				}
				LAPP.Publisher.publish("dataFinish", data, inst);
			},inst);
		},
		refresh : function( inst ) {
			var op = inst.options;
			getData(op, function( data ) {
				LAPP.Publisher.publish("dataFinish", data, inst);
			},inst);
		},
		getHistoryData : function( inst ) {
			var op = inst.options, page = op.paging, dp = op.dataParam;
			if( page == undefined ) {
				dp["P_PAGE"]++;
			}else{
				var pageIndex = page["index"];
				dp[pageIndex]++;
			}
			getData(op, function( data ){
				if( $.isFunction(op.adpter) ){
					data = op.adpter( data );
				}
				LAPP.Publisher.publish("loadHistoryData", data, inst);
			},inst);
		},
		submitData : function( inst, arg ) {
			var op = inst.options, submit = op.submit, dyParam = inst.DYPARAM;
			if( !LAPP.Util.isObject(submit) ) {
				return;
			};
			var df = submit['dataFun'], cb = submit['cb'];
			if( df == undefined ) {
				cb( arg );
			}else{
				if( $.isFunction(submit.parse) ) {
					arg = submit.parse(arg);
				};
				var dy = submit.dynamicParam;
				var dp = arg;
				dp["dataFun"] = df;
				if (dy != undefined) {
					for (var i in dy) {
						var value = dy[i];
						if (typeof dyParam[value] != "undefined") {
							dp[i] = dyParam[value];
						}
					}
				};
				var obj = {};
				obj["dataParam"] = dp;
				var self = this;
				var aParam = op.attachSubmit;
				getData(obj, function( data ) {
					if( aParam ) {
						var attachId = submit["attachId"];
						if( attachId == undefined ) {
							attachId = data["id"];
						}else{
							attachId = data[attachId];
						}
						self.submitAttachData(attachId, aParam);
					}
					cb( data );
					LAPP.Publisher.publish("submitDataFinish", data, inst);
				},self);
			}
		},
		submitAttachData : function( id, arg ) {
			var multimedia = this.attachData;
			upLoadAttach( multimedia, id, arg );
		},
		setAttachData : function( inst, data ) {
			this.attachData = data;
		}
	};
	var dataComponent = function( pointer ) {
		this.$pointer = pointer;
	};
	dataComponent.prototype = {
		constructor : dataComponent,
		init : function( options ) {
			this.options = options;
			subEvent(this);
			LAPP.Publisher.publish("businessWidgetLoaded", this);
			console.info("dataCpInit");
		},
		getSubId : function() {
			return this.$pointer;
		},
		setActive : function( active ) {
			this.$active = active+"";
		},
		getActive : function() {
			return this.$active;
		},
		refresh : function( arg ) {
			if( arg != undefined ){
				this.options = $.extend(true, {}, this.options, arg);
			}
			dataLogic.refresh(this);
		}
	};
	LAPP.DataCP = dataComponent;
}());
