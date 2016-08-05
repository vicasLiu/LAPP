/**
 * @File 滚动条组件
 * @Import
 * @CreatedBy LAPP Mobile Components Development Group
 * @Module LAPP
 * @Date 2014-01-20
 */
"use strict";
if(!LAPP){
	var LAPP = {};
};
(function(){
	var subEvent = function( inst ) {
		LAPP.Publisher.unsubscribe("componentLoadedFinished", inst);
		LAPP.Publisher.subscribe("componentLoadedFinished", function(){
			inst.render();
		}, inst);
	};
	var LAPPIscroll = function( pointer ) {
		this.$pointer = pointer;
	};
	var tempScrollY, _startTime;
	LAPPIscroll.prototype = {
		constructor : LAPPIscroll,
		init : function( options ) {
			this.myScroll = null;
			subEvent(this);
			this.setOptions( options );
			LAPP.Publisher.publish("businessWidgetLoaded", this);
		},
		getSubId : function() {
			return this.$pointer;
		},
		setActive : function( active ) {
			this.$active = active;
		},
		getActive : function() {
			return this.$active;
		},
		startScrollTime: function () {
			_startTime =  new Date().getTime();
		},
		getScrollTime: function () {
			return _startTime;
		},
		setOptions : function( options ) {
			var self = this;
			var render = options.render;
			var defaultOp = {
				checkDOMChanges:true,
				hScrollbar:false,
				vScrollbar:true,
				vScroll: true,
				x: 0,
				y: 0, //初次加载默认位置
				useTransition : true,
				onScrollMove: function () {
					LAPP.Publisher.publish("onScrollMove", self.myScroll, self);
					tempScrollY = self.myScroll.y;
		        },
		        onScrollStart:function (e) {
		        	LAPP.Publisher.publish("onScrollStart", self);
	                var target = e.target;
	                var targetType = $(target).attr("el-type");
	                var type = LAPP.Util.getDevice();
	                while (target.nodeType != 1) {
	                    target = target.parentNode;
	                }
	                if (target.tagName == "INPUT"||target.tagName == "TEXTAREA") {
	                    if( targetType == "date" ) {
	                        var tagID = $(target).attr("id");
//	                        LAPP.NativeAPI.setLAPPTime("yyyy-mm-dd","",tagID, "", "");
	                    }else{
	                        $(target).focus();
	                    }
	                    if(type == "ANDROID"){
	                        var h = Number(document.documentElement.clientHeight);
	                        var bottom = h - LAPP.Util.findPosition(target)[3];
	                        LAPPfunc.setWindowsHeight(bottom);
	                    }
	                };
	                if(type == "ANDROID"){
	                    if (target.tagName != "SELECT" && target.tagName != "INPUT" && target.tagName != "TEXTAREA") {
	                        e.preventDefault();
	                    }
	                }
                    e.preventDefault();
	            },
	            onBeforeScrollEnd: function() {
        			LAPP.Publisher.publish("onBeforeScrollEnd", self);
	            },
	            onScrollEnd: function (myScroll) {
//	            	console.info(1);
					if (tempScrollY > 10) {
						LAPP.Publisher.publish("onScrollEnd", self);
						LAPP.Publisher.publish("pullDown", self);
					} else {
						LAPP.Publisher.publish("onScrollCollapse", self);
					}
					tempScrollY = 0;
					self.startScrollTime();
	            }
			};
			this.options = $.extend(true, {}, defaultOp, options);
		},
		render : function() {
			var self = this;
			seajs.use("core/widget/component/iscroll/iscroll.js",function(){
                var op = self.options, renderTarget = op.render;
				if(self.myScroll){
					self.myScroll.refresh();
				}else{
					self.myScroll = new iScroll(renderTarget, op);
					//$('#'+renderTarget).css({"transform": "translate3d(0px, -56px, 0px) scale(1)"});
					//$('#'+renderTarget+' ul').css({"transform": "translate3d(0px, 0px, 0px) scale(1)"});
				}
				LAPP.Publisher.publish("iSrollLoadedFinished", self.myScroll, self);
				// LAPP.Publisher.publish("businessWidgetLoaded", self);
            });
		},
		refresh : function() {
			this.myScroll.refresh();
		}
	};
	LAPP.iScroll = LAPPIscroll;
}());
