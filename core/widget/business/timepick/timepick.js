/**
 * @File timepick
 * @Import
 * @CreatedBy LAPP Mobile Components Development Group
 * @Module LAPP
 * @Date 2014-06-20
 */
"use strict";
if(!LAPP){
	var LAPP = {};
};
(function(){
	/*
	 * @ function 数据订阅
	 * @ param 对象实类
	 * @ return 无
	 */
	/*var subEvent = function(inst) {
		LAPP.Publisher.unsubscribe("getParam", inst);
		LAPP.Publisher.unsubscribe("dataFinished", inst);
		LAPP.Publisher.subscribe("dataFinished", function( data ){
			inst.renderClass(data);
		}, inst);
		LAPP.Publisher.subscribe("getParam", function(){
			inst.getChooseTime();
		}, inst);
	};*/
	var subEvent = function( inst ) {
		console.info(inst);
        var evts = new Map(), control = inst.control;
        evts.put("dataFinish", function( data ){
            control.receiveData( data );
        }, inst);
        evts.put("getParam", function(){
            control.getChooseTime();
        }, inst);
        return evts;
    };
	/*
	 * @ function 创建模板
	 * @ param string renderTarget: 所要存放的dom节点
	 * @ param array ele : 已经选中的事件数组
	 * @ return 无
	 */
	var View = function( inst ) {
		/*var __createHtml = function(renderTarget,id) {
	        var Timepick = '<div class="LAPP-timepick" id="'+id+'"><ul class="LAPP-timepick-ul">';
	        for(var i=0;i<24;i++){
	        	var Class_active = '';
		        Timepick += '<li value="'+i+'" class="">'+i+':00</li>';
	        }
	        Timepick += '</ul></div>';
	        return Timepick;
		};*/
		this.init = function(data) {
			/*var self = inst;
			var op = self.options;
			var id = 'LAPP-'+ op.id;
			var renderTarget = op.render;
            var html = __createHtml( renderTarget , id );
            inst.render(html);*/
			seajs.use("core/widget/component/timepick/timepick.js",function(){
                var html = LAPP.Component.Timepick({op:inst.options,componentData:data,callback:function(html){
                	inst.render(html);
                }});
            });
        };
	};
	var Control = function( inst ) {
        this.receiveData = function( data ) {
            var op = inst.options;
            if( $.isFunction( op.adpter ) ) {
                data = op.adpter(data);
            }
            inst.setData(data);
            inst.renderClass(data);
        };
        this.getChooseTime = function(){
        	inst.getChooseTime();
        };
    };

	var Timepick = Klass.define(LAPP.BasicPlug, {
		constructor : function( pointer ) {
            this.$pointer = pointer;
            this.view = new View( this );
            this.control = new Control( this );
        },
		setOptions: function( options ) {
			var self = this;
            var evts = subEvent(self);
            self.registerEvent(evts);
			var defaultOp = {
				events : {
					el : "#"+options.render,
					evt: {
						'click li': "clickFn"
					},
					handle: {
						"clickFn": function (p) {

							//self.timeClick(p.current);
						}
					}
				}
			};
			this.options = $.extend(true, {}, defaultOp, options);
  			if (options.ele != undefined) {//是否有本地数据
                this.setData(options.ele);
            }
            LAPP.Publisher.publish("businessWidgetLoaded", self);
		},
		setData : function( data ) {
           var self = this;
           self.view.init(data);
        },
		// loadScroll: function(renderTarget){
		// 	var myScroll = new iScroll(renderTarget,{
		// 		hScrollbar:false,
		// 		hScroll: true,
		// 		vScrollbar:false,
		// 		vScroll: false,
		// 	});
		// },
		render : function(html) {
			var self = this;
			var op = self.options;
			var id = 'LAPP-'+ op.id;
			var renderTarget = op.render;
			$('#'+renderTarget).html(html);
			//createHtml(renderTarget,id);
			var timepick_ul = $("#"+id).find('ul');
	        var timepick_ul_li = $(timepick_ul).find('li');
	        var li_width = $(timepick_ul_li).width();
	        var len = $(timepick_ul_li).length;
	        $(timepick_ul).width(li_width*len);
			var date = new Date();
			var hour = date.getHours();
			var tempP = hour*($(timepick_ul_li).width());
			//self.loadScroll(id);
			//$(timepick_ul).css({"-webkit-transform":'translate3d(-'+tempP+'px, 0px, 0px)'});
			LAPP.Publisher.publish("componentLoadedFinished", "", self);
			if( op.ele != undefined ){
				self.renderClass(op.ele);
			}
			//EventCollector.initEvents(this.options.events);
		},
		/*
		 * @function 绑定事件
		 * @param object obj : dom 对象
		 * @return 无
		 */
		// timeClick : function(obj) {
		// 	var __totalnum = function(obj) {
		// 		var green_arr = [];

		// 		for(var num=0;num<$(obj).length;num++){
		//     		if($(obj).eq(num).hasClass('bg-green')){
		//     			var gvalue = $(obj).eq(num).val();
		//     			green_arr.push(gvalue);
		//     		}
		//     	}
		//     	console.log(green_arr);
		// 	};
		// 	var _parent = $(obj).parent().parent();
		// 	var timepick_ul = $(_parent).find("ul");
	 //        var timepick_ul_li = $(timepick_ul).find("li");
	 //    	if($(obj).hasClass('bg-gray')){
	 //    		alert('时间已失效！');
	 //    	}else if($(obj).hasClass('bg-red')){
	 //        	alert('时间已选中！');
	 //        }else{
	 //        	var index = $(obj).index(),
	 //        		index1 = 0;
		// 		// 查找到第一个li包含的bg-green
		// 		while(!$(timepick_ul_li).eq(index1).hasClass('bg-green')){
		// 			index1++;
		// 			if(index1==timepick_ul_li.length) break;
		// 		}
	 //        	// 给区间添加bg-green
	 //        	if(index>index1){
		//         	for(var m=index1;m<index;m++){
		//         		var red = $(timepick_ul_li).eq(m).hasClass('bg-red');
		//         		// 如果区间中已经有选中，则直接跳出循环
		//         		if(red){
		//         			// 删除区间后面bg-green类
		// 		        	for(var t=m;t<index;t++){
		// 		        		$(timepick_ul_li).eq(t+1).removeClass('bg-green');
		// 		        	}
		//         			alert('选择的区间有已经选中！');
		//         			__totalnum(timepick_ul_li);
		//         			return false;
		//         		}else{
		//         			$(timepick_ul_li).eq(m).addClass('bg-green');
		//         		}
		//         	}
		//         }
	 //        	var len = $(timepick_ul).find("li.bg-green").length;
	 //        	if(len==1){
	 //        		$(obj).toggleClass('bg-green');
	 //        	}
	 //        	if(len != 1){
	 //        		$(obj).addClass('bg-green');
	 //        	}
	 //        	// 删除区间后面bg-green类
	 //        	for(var n=index;n<$(timepick_ul_li).length;n++){
	 //        		$(timepick_ul_li).eq(n+1).removeClass('bg-green');
	 //        	}
	 //        }
	 //    	__totalnum(timepick_ul_li);
		// },
		renderClass : function( data ) {
			var op = this.options
				, render = op.render
				, lis = $("#"+render).find("li")
				, i = 0
				, id = 'LAPP-' + op.id
				;

			var date = new Date(),
				_year = date.getFullYear(),
				_month = date.getMonth()+1,
				_date = date.getDate(),
				hour = date.getHours();
			var user_Newdate = "";
			if( op.ele != undefined ) {
				user_Newdate = op.ele.date;
			}else{
				user_Newdate = data.date;
			}
			var user_year = user_Newdate.split('-')[0],
				user_month = user_Newdate.split('-')[1],
				user_date = user_Newdate.split('-')[2],
				timepick_ul = $('#'+id).find('ul'),
				timepick_ul_li = $(timepick_ul).find('li'),
				li_len = $(timepick_ul_li).length;
				for( var n=0;n<li_len;n++ ){
					if( user_year>_year || ( user_year==_year&& (user_month>_month) ) || ( user_month == _month && (user_date>_date) ) ){
		        		//
					}else if( user_year<_year || ( user_year==_year&& (user_month<_month) ) || ( user_month == _month && (user_date<_date) ) ){
						$(timepick_ul_li).eq(n).addClass('bg-gray');
					}else if(hour>=n){
			        	$(timepick_ul_li).eq(n).addClass('bg-gray');
			        }
				}
			if( $.isFunction(op.adpter) ){
				data = op.adpter(data);
			}
			for( ; i < lis.length; i++ ) {
				if( $.inArray(i, data.time) != -1 ) {
					$(lis[i]).attr("class", "bg-red");
				}
			}
		},
		getChooseTime : function() {
			var op = this.options
				, render = op.render
				, lis = $("#"+render).find("li")
				, i = 0
				, data = []
				, obj = {}
				;
			for( ; i < lis.length; i++ ) {
				if( $(lis[i]).hasClass("bg-green") ) {
					data.push(Number($(lis[i]).attr("value")));
				}
			}
			obj[op.id] = data;
			LAPP.Publisher.publish("setParam", {id : op.id, data : obj}, this);
		}
	});
	LAPP.Timepick = Timepick;
}());
