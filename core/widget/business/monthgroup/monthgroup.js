/**
* @File 日期时间组件
* @Import
* @CreatedBy LAPP Mobile Components Development Group
* @Module LAPP
* @Date 2015-3-2
*/
"use strict";
if(!LAPP){
	var LAPP = {};
};
(function(win){

	/*
		subEvent
	*/
	var subEvent = function(inst) {
		var evts = new Map()
			, control = inst.control
			, me = inst;
		// evts.put('publishParam', function (arg) {
		// 	me.setDParam( arg );
		// }, me);
		evts.put('dataFinish', function (data) {
			me.control.receiveData(data);
		}, me);
		evts.put('getParam', function (data) {
			me.control.getParam(data);
		}, me);
		return evts;
	};

	/*
		View
	*/
	var View = function (inst) {

		this.init = function (inst,data) {
			seajs.use("core/widget/component/monthgroup/monthgroup.js",function(){
                LAPP.Component.Monthgroup({op:inst.options,componentData:data,callback:function(html){inst.render(html);}});
            });
		};
	};

	var Control = function( inst ) {
        this.receiveData = function( data ) {
            var op = inst.options,
            	dbData = op['dbData'];
            if(dbData){
            	data = data[dbData];
            }
            if( $.isFunction( op.adpter ) ) {
                data = op.adpter(data);
            }
            inst.model.init(data);
        };
        this.getParam = function() {
        	inst.getWidgetValue();
        };
    };

    var Model = function( inst ) {
        var ModelData = {};
        this.init = function( data ) {
            ModelData.initData = data;
            inst.view.init( inst, data );
        };
    };


	/*
		monthGroup
	*/
	var MonthGroup = Klass.define(LAPP.BasicPlug, {
		constructor: function (pointer) {
			this.$pointer = pointer;
			this.view = new View( this );
			this.control = new Control( this );
            this.model = new Model( this );
		},
		setOptions: function( options ) {
			var self = this
				, op = options
				,	evts = subEvent(self)
			 	, defaultOp = {
				events : {
					id : op.id,
					el : "#"+options.render,
					events : {
						evt : {
							"click a" : "aClick"
						},
						handle : {
							"aClick" : function() {
							}
						}
					}
				}
			};
			self.registerEvent(evts);

			self.options = $.extend(true, {}, defaultOp, op);
			var formData = self.options.formData;
			if(formData){
				this.setData(formData);
			}
			LAPP.Publisher.publish("businessWidgetLoaded", self);
		},
		setData : function( data ) {
			this.data = data;
			this.control.receiveData(data);
		},
		setDParam : function( arg ) {
			this.dyParam = arg;
		},
		render : function(html) {
			var self = this
				, op = self.options
				, arg = self.dyParam
				, renderTarget = op.render || 'wrapper';
			if( renderTarget != "body" ){
				renderTarget = "#"+renderTarget;
			}
			$(renderTarget).append(html);
			EventCollector.initEvents(op.events);
		},
		getWidgetValue : function() {
			var op = this.options
				, render = op.render
				, yearValue = $("#"+render).find("h3").text()
				, selectDoms = $("#"+render).find(".active")
				, arr = []
				, id = op.id
				;
			arr.push(yearValue);
			for( var i = 0; i < selectDoms.length; i++ ) {
				var text = $(selectDoms[i]).attr("data-value");
				arr.push(text);
			}
			var paramObj = {};
	        paramObj[id] = arr;
	        LAPP.Publisher.publish("setParam", {id : id, data : paramObj}, this);
	        LAPP.Publisher.publish("pComponentParam", arr, this);
		}
	});

	LAPP.MonthGroup = MonthGroup;
}(window));
