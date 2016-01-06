/**
* @File BtnNumber组件
* @Import
* @CreatedBy LAPP Mobile Components Development Group
* @GroupMember zengnanyun
* @Email suchiva@126.com
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
		evts.put('publishParam', function (arg) {
			//me.setDParam( arg );
		}, me);
		// evts.put('dataFinish', function (data) {
		// 	me.control.receiveData(me,data);
		// }, me);
		return evts;
	};

	/*
		View
	*/
	var View = function (inst) {
	
		this.init = function (inst,data) {
			seajs.use("core/widget/component/btnnumber/btnnumber.js",function(){
                LAPP.Component.Btnnumber({op:inst.options,componentData:data,callback:function(html){inst.render(html);}});
            });
		};
	};

	var Control = function( inst ) {
        this.receiveData = function( data ) {
            var op = inst.options;
            if( $.isFunction( op.adpter ) ) {
                data = op.adpter(data);
            }
            inst.model.init(data);
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
	var BtnNumber = Klass.define(LAPP.BasicPlug, {
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
			 
		    self.setData({});
		},
		setData : function( data ) {
			this.data = data;
			this.control.receiveData(data);
		},
		// setDParam : function( arg ) {
		// 	this.dyParam = arg;
		// 	//预留扩展
		// },
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
			LAPP.Publisher.publish("businessWidgetLoaded", self); 
		}
	});

	LAPP.BtnNumber = BtnNumber;
}(window));