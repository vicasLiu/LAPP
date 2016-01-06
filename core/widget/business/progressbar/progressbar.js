/**
 * @File 工具栏组件
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
	var subEvent = function( inst ) {
        var evts = new Map(), control = inst.control;
        evts.put("dataFinish", function( data ){
            control.receiveData( data );
        }, inst);
        return evts;
    };

	var View = function(inst){
		/*var __createHtml: function(renderTarget,ele ,inst) {	
			var ProgressBar = ''; 
			var op = this.options;
			var liHeight = op.liHeight ||75;
			var liWeight = op.liWeight ||60;
			var ul = '';
			var current_day = inst.getCurrentDay();
			$.each(ele,function(key,value){
				var li = '';
				
				for(var i in value) {
					var temp = '<p>'+value[i]+'</p>';
					li += temp; 
				}
				var data_day = value.date + "-" + value.day;
				//当天
				if (data_day==current_day)
				{
					li = '<li style="height:'+liHeight+'px;width:'+liWeight+'px" state="today" click="click" day="'+data_day+'">'+li+'</li>'
				}
				//将来
				else if (data_day>current_day)
				{
					li = '<li style="height:'+liHeight+'px;width:'+liWeight+'px" state="future" day="'+data_day+'">'+li+'</li>'
				}
				//以前
				else{
					li = '<li style="height:'+liHeight+'px;width:'+liWeight+'px" state="before" day="'+data_day+'">'+li+'</li>'
				}
				
				ul +=li;
			});
			ul = '<div id="'+op.id+'Div" style="width:480px"><ul id="'+op.id+'">'+ul+'</ul></div>';
		};*/
		this.init = function( data ) {
			/*var self = this, op = self.options, renderTarget = op.render;
            var html = __createHtml( renderTarget , data ,self);
            inst.render(html);*/
            var op = inst.options,
				data = data;
			seajs.use("core/widget/component/progressbar/progressbar.js",function(){
                LAPP.Component.Progressbar({op:op,componentData:data,callback:function(html){inst.render(html);}});
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
            inst.view.init( data );
        };
    };
	var ProgressBar= Klass.define(LAPP.BasicPlug, {
		constructor : function( pointer ) {
            this.$pointer = pointer;
            this.view = new View( this );
            this.control = new Control( this );
            this.model = new Model( this );
        },
		setOptions: function( options ) {
			var self = this;
			var evts = subEvent(self);
            self.registerEvent(evts);
			var defaultOp = {
				events : {
					id : options.id,
					el : "#"+options.render,
					events : {
						evt : {
							"click li" : "liClick"
						},
						handle : {
							"liClick:before" : function( p ) {
							},
							"liClick" : function() {
							}
						}
					}
				}
			};
			self.options = $.extend(true, {}, defaultOp, options);
			var renderTarget = options.render || 'header',//渲染节点
				ele = options.ele;
			if( ele != undefined ) {
				self.setData(ele);
			}
			LAPP.Publisher.publish("businessWidgetLoaded", self);
		},
		setData : function( data ) {
			this.data = data;
			this.control.receiveData(data);
		},
		render : function(html) {
			var  op = this.options, renderTarget = op.render,ele = op.ele;
			$('#'+renderTarget).append($(html));
			setTimeout(function(){
				var liItemWidth = $("div#" +op.id+"Div ul#" + op.id + " li").width();
				var $width = liItemWidth*ele.length
				$("div#" +op.id+"Div").css("width",$width)
				$("div#progressbar").css("right","100px");
			},200);
			this.loadScroll(renderTarget); 
			EventCollector.initEvents(op.events);
			var tempP = $('#progressBar li').filter(function(state) {  return $(this).attr("state") == "today";
			}).index()*-61+120;
		},
		loadScroll: function(renderTarget){
			var myScroll = new iScroll(renderTarget,{
				hScrollbar:false,  
				hScroll: true, 
				vScrollbar:false,  
				vScroll: false,    
				checkDOMChanges: true,  
				onBeforeScrollStart:function (e) {
                    var target = e.target;
                    var type = LAPP.Util.getDevice();
                    while (target.nodeType != 1) {
                        target = target.parentNode;
                    }
                    if (target.tagName == "INPUT"||target.tagName == "TEXTAREA") {
                    	$(target).focus();
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
                }
			});
			//myScroll.scrollToElement("ul#progressBar li[state=today]",100);
			//console.log(myScroll);
		},
		getCurrentDay:function(){
			var date = new Date();
			var year = date.getFullYear();
			var month = (date.getMonth()+1)<10?"0"+(date.getMonth()+1):(date.getMonth()+1);
			var day = date.getDate()<10?"0"+date.getDate():date.getDate();
			return year + "-" + month + "-" + day;
		}
	});
	LAPP.ProgressBar = ProgressBar;
}());