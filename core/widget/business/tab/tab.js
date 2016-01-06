/**
 * @File 切换选项组件
 * @Import
 * @CreatedBy LAPP Mobile Components Development Group
 * @GroupMember LiuSiWei ZhangHang
 * @Email suchiva@126.com
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
		evts.put('triggleTable', function (arg) { me.triggleTab(arg); }, me);
		return evts;
	};

	/*
		View
	*/
	var View = function (inst) {
		/*var __createHtml = function ( ele ) {
			var tempDiv = '',
			len = ele.length;
			$.each(ele,function(key,value){
				var show = value['showItems'];
				var className = '';
				if(show){
					className = 'LAPP-tab-click';
				}
				var tempA ='<a href="javascript:void(0);" class="'+className+'" style="width:'+(1/len*96)+'%;" data-status="'+value['text']+'">'+value['text']+'</a>';
				tempDiv +=tempA;
			});
			tempDiv = '<div class="LAPP-tab-group"><div class="LAPP-tab-inner">'+tempDiv+'</div></div>';
            return tempDiv;

		};*/
		this.init = function () {
           /* var op = inst.options;
            var ele = op.ele;
			var html = __createHtml(ele);
			inst.render(html);*/
			var op = inst.options,
				data = op.ele;
			seajs.use("core/widget/component/tab/tab.js",function(){
				op.data = data;
                LAPP.Component.Tab({op:op,componentData:[],callback:function(html){inst.render(html);}});
            });
		};
	};

	/*
		Tab
	*/
	var Tab = Klass.define(LAPP.BasicPlug, {
		constructor: function ( pointer) {
			this.$pointer = pointer;
			this.view = new View(this);
		},
		setOptions: function (options) {
			var self = this
				, op = options
				, evts = subEvent(self)
				, defaultOptions = {
                    events : {
                        id : op.id,
                        el : "#"+op.render,
                        evt : {
                            "click a" : "tabClick"
                        },
                        handle : {
                            "tabClick:before" : function( p ) {
                                var $this = p.current;
                                if( $this.hasClass("LAPP-tab-click") ) {
                                    return;
                                }
                                // $('.LAPP-component-tab a').removeClass('LAPP-tab-click');
                                // $this.addClass('LAPP-tab-click');
                                var status = $this.attr('data-status');
                                LAPP.Publisher.publish("pComponentParam", {
                                    "switchStatus" : status
                                }, self);
                                // LAPP.Publisher.publish("setPageStatus", status, self);
                                if($.isFunction(op.clickFn)){
                                    op.clickFn(status);
                                }
                            },
                            "tabClick" : function(p){
                            	var $this = p.current;
                            	$this.addClass("active").siblings().removeClass("active");
                            }
                        }
                    }
                };
			self.registerEvent(evts);
			this.options = $.extend(true, {}, defaultOptions, op);
			if(this.options.ele!=undefined){
				self.view.init(self);
			}
		},
		render: function (htm) {
            var op = this.options
                , renderTarget = op.render
                ;
            $("#"+renderTarget).html(htm);
            EventCollector.initEvents(op.events);
			LAPP.Publisher.publish("businessWidgetLoaded", this);
		},
		triggleTab : function( arg ) {
			var op = this.options, render = op.render;
			if( LAPP.Util.isObject(arg) ) {
				var status = arg['status'];
				$("#"+render).find("a").removeClass("LAPP-tab-click");
				var dom = $("#"+render).find("a");
				for( var i = 0; i < dom.length; i++ ) {
					if( $(dom[i]).attr("data-status") == status ){
						$(dom[i]).addClass("LAPP-tab-click");
					}
				}
			}
		}
	});
	LAPP.Tab = Tab;
}());
