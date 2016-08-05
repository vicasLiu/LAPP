/**
 * @File 工具栏组件
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
			, evts = new Map();
		evts.put('publishPageStatus', function (status) { me.handleButton(status); }, me);
		return evts;
	};
	/*
		View
	*/
	// var View = function (list) {
	// 	var toolbar = LAPP.Component(list.op);
	// 	return toolbar.html();
	// };
	var View = function (inst) {
		/*var __createTpl = function () {
			var op = inst.options
				, id = op.id
				, btnNum = op.ele.length
				, renderTarget = op.render
				//中间标题
				, btnGroup = '<div class="LAPP-toolbar-btnGroup">' +
                     '{@each btnData as item}' +
                            '{@if item.type =="title"}' +
                                '${item.text}' +
                            '{@/if}' +
                     '{@/each}'+
                     '</div>'
			//左右两端跳转
			, html = '{@each btnData as item, index}' +
                '{@if item.type !== "title"}' +
                    '{@if item.fn = undefined}' +
                        '<a href="javascript:void(0);"  style="display:'+
                            '{@if item.show}' +
                                'block' +
                            '{@else}' +
                                'none' +
                            '{@/if}' +
                        '" class="${item.type}">${item.text}</a>' +
                        '{@else}' +
                        '<a href="javascript:void(0);" onclick="${item.fn}" style="display:' +
                            '{@if item.show}' +
                                'block' +
                            '{@else}' +
                              'none' +
                            '{@/if}' +
                            '" class="${item.type}">${item.text}</a>' +
                        '{@/if}' +
                '{@/if}' +
            '{@/each}';
			html ='<div id="'+ id + '" class="LAPP-toolbar">' + html + btnGroup +'</div>';
			$('.LAPP-toolbar-btnGroup').width(130);
			if( LAPP.Util.isObject(op.css) ) {
				$('#'+renderTarget).css(op.css);
			}
			return html;
		};
		var __createHtml = function () {
			var html = __createTpl();
			return html;
		};*/
		this.init = function ( inst ) {
			/*var tpl = __createHtml()
			 	, html = ''
				, data = inst.options.ele
				, btn = {btnData: data};
			html = juicer(tpl, btn);
			inst.render(html);*/
			var op = inst.options,
				data = op.ele;
			seajs.use("core/widget/component/toolbar/toolbar.js",function(){
                LAPP.Component.Toolbar({op:op,componentData:data,callback:function(html){inst.render(html);}});
            });
		}
	};

	/*
		Toolbar
	*/
	var Toolbar = Klass.define(LAPP.BasicPlug, {
		constructor: function (pointer) {
			this.$pointer = pointer;
			this.view = new View(this);
		},
		setOptions: function (options) {
			var self = this
				, op = options
				, evts = subEvent(self)
				, defaultOptions = {
					events : {
						el : "#"+options.render
					}
				};
			self.registerEvent(evts);
			self.options = $.extend(true, {}, defaultOptions, op);
			self.view.init(self);
		},
		setActive : function() {
			this.$active = "true";
		},
		render: function (html) {
			var self = this
				, op = self.options
				, renderTarget = op.render;
			$('#' + renderTarget).html(html);
			EventCollector.initEvents(op.events);
			LAPP.Publisher.publish("businessWidgetLoaded", self);
		},
		handleButton : function( status ) {
			var op = this.options;
			var ele = op.ele;
			for( var i = 0; i < ele.length; i++ ) {
				var dom = ele[i].type;
				var temp = ele[i].status;
				if( temp != undefined ){
					if( $.inArray( status, temp ) != -1 ) {
						$("."+dom).show();
					}else{
						$('.'+dom).hide();
					}
				}
			}
		}
	});
	LAPP.Toolbar = Toolbar;
}());
