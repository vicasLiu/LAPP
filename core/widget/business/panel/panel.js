/**
 * @File 列表组件
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
	/*
		subEvent
	*/
	var subEvent = function(inst) {
		var me = inst
			, evts = new Map;
		evts.put("daFinish", function (data) {
			inst.setData(data);
		}, me)
		return evts;
	};
	/*
		View
	*/
	var View = function (inst) {
		var __createHtml =  function (options) {
			var renderTarget = options.render,
				id = options.id,
				ele = options.ele,
				mapHtml = '<div id="'+id+'" class="LAPP-panel">'+ele+'</div>';
			return mapHtml;
		};
		this.init = function(inst){

			var html = __createHtml(inst.options);
			inst.render(html);
		}
	};

	/*
		Panel
	*/
	var Panel = Klass.define(LAPP.BasicPlug, {
		constructor: function (pointer) {
			this.$pointer = pointer;
			this.view = new View(this);
		},
		setOptions: function (options) {
			var self = this
				, op = options
				, evts = subEvent(self)
				, defaultOptions = {
					render : "body",
					events : {
						id : self.componentId,
						el : "#"+options.render
					}
				};
			self.registerEvent(evts);
			self.options = $.extend(true, {}, defaultOptions, op);
			self.setData();
			LAPP.Publisher.publish("businessWidgetLoaded", self);
		},
		setData : function( data ) {
			var self = this;
			if(data){
				self.data = data;
			}
			self.view.init(self);
		},
		fn: function(op){
			if($.isFunction(op.clickFn)){
				setTimeout(function(){op.clickFn();},100);
			};
		},
		render : function(htm) {
			var options = this.options
				, data = this.data
				, renderTarget = options.render
				, isScroll = options.isScroll
				;

			if($('#'+renderTarget).length == 0) {
				return;
			}
			$('#'+renderTarget).html(htm);
			if(options.isScroll) {
				this.loadScroll(renderTarget);
			}
			if( $.isFunction( options.cb ) ) {
				options.cb(data);
			}
			EventCollector.initEvents(this.options.events);
			LAPP.Publisher.publish("componentLoadedFinished", this);
		},
		refresh : function() {
			this.setOptions(this.options);
		}
	});

	LAPP.Panel = Panel;
}());
