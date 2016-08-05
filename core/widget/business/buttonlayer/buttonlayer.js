/**
* @File 按钮层组件
* @Import
* @CreatedBy LAPP Mobile Components Development Group
* @Module LAPP
* @Date 2014-10-14
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

		evts.put('triggleButtonLayer', function (arg) {
			me.handleEvent( arg );
		}, me);
		evts.put('publishParam', function (arg) {
			me.setDParam( arg );
		}, me);

		return evts;
	};

	/*
		View
	*/
	var View = function (inst) {
		/*var __createTpl = function (inst) {
			var op = inst.options
				, cls = op.cls || ''
				, html = '<div class="LAPP-buttonLayer '+cls+'">'
				, btnDiv = ''
				, ele = op.ele;
			$.each(ele,function(key,value){
				var disable = value['disable']?'disableBtn':'';
				btnDiv+='<div style="width: '+ 1/ele.length*100+'%;" class="LAPP-buttonLayer-btn '+value['cls']+' '+ disable +'"><a href="javascript:void(0);">'+value['text']+'</a></div>'
			});
			html +=btnDiv;
			html +='</div>';
			return html;
		};
		var __createHtml = function(inst) {
			var html = __createTpl(inst);
			return html;
		};*/
		this.init = function (inst) {
			/*var tpl = __createHtml(inst)
				, html = '';
			html = tpl;
			inst.render(html)*/

			seajs.use("core/widget/component/buttonlayer/buttonlayer.js",function(){
                LAPP.Component.Buttonlayer({op:inst.options,componentData:inst.options.ele,callback:function(html){inst.render(html);}});
            });
		};
	};

	/*
		buttonLayer
	*/
	var buttonLayer = Klass.define(LAPP.BasicPlug, {
		constructor: function (pointer) {
			this.$pointer = pointer;
			this.view = new View(this);
		},
		setOptions: function( options ) {
			var self = this
				, op = options
				,	evts = subEvent(self)
			 	, defaultOp = {
				events : {
					id : op.id,
					el : $("#"+op.render)
				}
			};
			self.registerEvent(evts);

			self.options = $.extend(true, {}, defaultOp, op);
			this.view.init(self);
		},
		setDParam : function( arg ) {
			this.dyParam = arg;
		},
		render : function(html) {
			var self = this
				, op = self.options
				, arg = self.dyParam
				, renderTarget = op.render || 'wrapper'
				, dShow = op.defaultShow;

			if( renderTarget != "body" ){
				renderTarget = "#"+renderTarget;
			}
			if( $.isFunction(op.show) ){
				var show = op.show(arg);
				if(show){
					$(renderTarget).append(html);
					$(renderTarget).show();
				}else{
					$(renderTarget).hide();
				}
			}else{
				$(renderTarget).append(html);
			}
			if( LAPP.Util.isObject(op.css) ) {
				$(renderTarget).css(css);
			}
			if(dShow != undefined && !dShow ) {
				$(renderTarget).hide();
			}else{
				$(renderTarget).show();
			}
			EventCollector.initEvents(op.events);
			LAPP.Publisher.publish("businessWidgetLoaded", self);
		},
		handleEvent : function( arg ) {
			var options = this.options;
			var renderTarget = options.render;
			if( renderTarget != "body" ){
				renderTarget = "#"+renderTarget;
			}
			if( arg == "show" ){
				$(renderTarget).find('.LAPP-buttonLayer').show();
				$(renderTarget).find('.LAPP-buttonLayer div').show();
				$(renderTarget).show();
			}else{
				$(renderTarget).hide();
				$(renderTarget).find('.LAPP-buttonLayer').hide();
			}
		}
	});

	LAPP.buttonLayer = buttonLayer;
}(window));
