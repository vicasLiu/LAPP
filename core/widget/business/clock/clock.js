/**
 * @File 钟表组件
 * @Import
 * @CreatedBy LAPP Mobile Components Development Group
 * @Module LAPP
 * @Date 2014-01-20
 */
"use strict";
if (!LAPP) {
	var LAPP = {};
};
(function() {
	var subEvent = function(inst) {
		var me = inst;
		LAPP.Publisher.subscribe("setOptions", function(options) {
			// me.setOptions(options);
		}, me);
	};
	var createHtml = function(options) {
		var html = '<div id="LAPP-clock-container"><div id="LAPP-clock"><b class="LAPP-clock-core"></b><div id="LAPP-clock-h"><b></b></div><div id="LAPP-clock-m"><b></b></div>'
				 + '<div id="LAPP-clock-s"></div>'
				 + '<div id="LAPP-clock-mark"></div>'
				 + '<div id="LAPP-clock-date"></div>'
				 + '</div></div><div id="LAPP-secondplus">00:00:00</div>';
		return html;
	};
	var Clock = function(pointer) {
		this.$pointer = pointer;
	};
	Clock.prototype = {
		constructor : Clock,
		init : function(options, id) {
			if (id != undefined) {
				this.$pointer = id;
			}
			subEvent(this);
			this.setOptions(options);
		},
		getSubId : function() {
			return this.$pointer;
		},
		getActive : function() {
			return this.$active;
		},
		setActive : function( flg ) {
			this.$active = flg+"";
		},
		setOptions : function(options) {
			this.options = options;
			var renderTarget = options.render || 'body', // 渲染节点
			ele = options.ele, // 获得数据
			id = options.id;

			var self = this;
			if (renderTarget != "body") {
				renderTarget = "#" + renderTarget;
			}
			var htm = createHtml(options);
			$(renderTarget).append($(htm));
			self.fn();
			LAPP.Publisher.publish("businessWidgetLoaded", this);
		},
		fn : function() {
	            var $$$=function(id){return document.getElementById(id)};
	            //写入刻度DOM，以及刻度的定位
	            function mark(){
	                //圆的半径
	                var r=parseFloat($("#LAPP-clock").width())/10;
	                //插入DOM
	                for(var i=1;i<61;i++){
	                	$$$("LAPP-clock-mark").innerHTML+="<b class='c"+i+"'><i style='display: none;'></i></b>";
	                    var ci=document.getElementsByClassName("c"+i)[0];
	                     var cii=ci.getElementsByTagName("i")[0];
	                    //利用正弦定理计算刻度的定位
	                    ci.style.left=r+20+(r+35)*(Math.sin(i*6*2*Math.PI/360))+"px";
	                    /*注意正弦的角度制算法和弧度制算法，Math.sin的参数是弧度制算法，所以先把角度转换成弧度，再计算*/
	                    ci.style.top=r+25-(r+35)*(Math.sin((90-i*6)*2*Math.PI/360))+"px";
	                    //计算转动的角度
	                    /*other*/
	                    ci.style.transform="rotate("+i*6+"deg)";
	                    /*FF*/
	                    ci.style.MozTransform="rotate("+i*6+"deg)";
	                    /*webkit*/
	                    ci.style.WebkitTransform="rotate("+i*6+"deg)";
	                    /*opera*/
	                    ci.style.OTransform="rotate("+i*6+"deg)";
	                    /*ms*/
	                    ci.style.msTransform="rotate("+i*6+"deg)";
	                    //大刻度
	                    if(i%5==0){
	                        ci.className="c"+i+" "+"big-mark";
	                        cii.innerHTML=i/5;
	                    }
	                    //小刻度
	                    else{
	                        ci.className="c"+i+" "+"small-mark";
	                        ci.removeChild(cii);
	                    }
	                    //把数字转正
	                    var iRotate=-i*6;
	                    cii.style.transform="rotate("+iRotate+"deg)";
	                    cii.style.MozTransform="rotate("+iRotate+"deg)";
	                    cii.style.WebkitTransform="rotate("+iRotate+"deg)";
	                    cii.style.OTransform="rotate("+iRotate+"deg)";
	                    cii.style.msTransform="rotate("+iRotate+"deg)";
	                }
	            }
	            //指针的转动
	            function turnR(){
	                var d=new Date();
	                var h=d.getHours();
	                var m=d.getMinutes();
	                var s=d.getSeconds();
	                var sRadius=360/60*s;
	                var mRadius=360/60*m;
	                //如果需要分针匀速移动，就赋值var mRadius=360/60*m+360/60/60*s
	                var hRadius=360/12*h+30/60*m;
	                var ch=$$$("LAPP-clock-h");
	                var cm=$$$("LAPP-clock-m");
	                var cs=$$$("LAPP-clock-s");
	                /*other*/
	                ch.style.transform="rotate("+hRadius+"deg)";
	                cm.style.transform="rotate("+mRadius+"deg)";
	                cs.style.transform="rotate("+sRadius+"deg)";
	                /*FF*/
	                ch.style.MozTransform="rotate("+hRadius+"deg)";
	                cm.style.MozTransform="rotate("+mRadius+"deg)";
	                cs.style.MozTransform="rotate("+sRadius+"deg)";
	                /*webkit*/
	                ch.style.WebkitTransform="rotate("+hRadius+"deg)";
	                cm.style.WebkitTransform="rotate("+mRadius+"deg)";
	                cs.style.WebkitTransform="rotate("+sRadius+"deg)";
	                /*opera*/
	                ch.style.OTransform="rotate("+hRadius+"deg)";
	                cm.style.OTransform="rotate("+mRadius+"deg)";
	                cs.style.OTransform="rotate("+sRadius+"deg)";
	                /*ms*/
	                ch.style.msTransform="rotate("+hRadius+"deg)";
	                cm.style.msTransform="rotate("+mRadius+"deg)";
	                cs.style.msTransform="rotate("+sRadius+"deg)";
	                setTimeout(turnR,1000);
	            }
	            /*显示日期*/
	            function clockDate(){
	                var d=new Date();
	                var week=["日","一","二","三","四","五","六"];
	                $$$("LAPP-clock-date").innerHTML=d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日"+" 星期"+week[d.getDay()];
	            }
	            //调用函数
	            mark();
	            turnR();
	            clockDate();
		},
		renderStyle : function(style) {

			if ($('#ClockStyle').size() == 0) {
				// 生成节点
				var tempStyle = $('<link type="text/css"  rel="stylesheet" id="ClockStyle" href=""/>');
				$('head').append(tempStyle);
				// 渲染style
				$('#ClockStyle').attr("href", style);
			} else {
				return;
			}
		}
	};
	LAPP.Clock = Clock;
}());
