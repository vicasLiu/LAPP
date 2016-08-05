/**
 * @File 地图组件
 * @Import
 * @CreatedBy LAPP Common Components Development Group
 * @Module LAPP
 * @Date 2014-01-20
 */
"use strict";
if(!LAPP){
	var LAPP = {};
};
(function(){
	var mapObj,toolBar,locationInfo,marker, locationEndInfo, infoCallback;
	var subEvent = function(inst) {
		var me = inst;
		LAPP.Publisher.subscribe("setOptions", function( options ){
			me.setOptions(options);
		}, me);
		LAPP.Publisher.subscribe("toolbarClick", function( arg ){
			me.handlToolbar( arg );
		}, me);
	};
	var createHtml = function( options) {
		var renderTarget = options.render,
			id = options.id,
			mapHtml = '<div id="'+id+'"></div>';
		return mapHtml;

	};
	var geocoder = function( mapObj, lnglat, geocoder_CallBack ) {
		var lnglatXY = new AMap.LngLat(lnglat.lng, lnglat.lat);
	    var MGeocoder;
	    //加载地理编码插件
	    mapObj.plugin(["AMap.Geocoder"], function() {
	        MGeocoder = new AMap.Geocoder({
	            radius: 1000,
	            extensions: "all"
	        });
	        //返回地理编码结果
	        AMap.event.addListener(MGeocoder, "complete", geocoder_CallBack);
	        //逆地理编码
	        MGeocoder.getAddress(lnglatXY);
	    });
	    //加点
	    var marker = new AMap.Marker({
	        map:mapObj,
	        icon: new AMap.Icon({
	            image: "http://api.amap.com/Public/images/js/mark.png",
	            size:new AMap.Size(58,30),
	            imageOffset: new AMap.Pixel(-32, -0)
	        }),
	        position: lnglatXY,
	        offset: new AMap.Pixel(-5,-30)
	    });
	    mapObj.setFitView();
	};

	//构建自定义信息窗体
	var createInfoWindow = function ( title, content, obj ){
	    var info = document.createElement("div");
	    info.className = "info";
	    info.id = "test";
	    // 定义顶部标题
	    var top = document.createElement("div");
	    top.className = "info-top";
	    var titleD = document.createElement("div");
	    titleD.innerHTML = title;
	    var closeX = document.createElement("img");
	    closeX.src = "http://webapi.amap.com/images/close2.gif";
	    closeX.onclick = closeInfoWindow;

	    top.appendChild(titleD);
	    top.appendChild(closeX);
	    info.appendChild(top);
	    // 定义中部内容
	    var middle = document.createElement("div");
	    middle.className = "info-middle";
	    middle.innerHTML = content;
	    info.appendChild(middle);
	    info.setAttribute("lng", obj.longitude);
	    info.setAttribute("lat", obj.latitude);

	    // 定义底部内容
	    var bottom = document.createElement("div");
	    bottom.className = "info-bottom";
	    var sharp = document.createElement("img");
	    sharp.src = "http://webapi.amap.com/images/sharp.png";
	    bottom.appendChild(sharp);
	    info.appendChild(bottom);
	    return info;
	}
	//关闭信息窗体
	var closeInfoWindow = function(){
	    mapObj.clearInfoWindow();
	};
	var LAPPMap = function( pointer ) {
		this.$pointer = pointer;
	};
	LAPPMap.prototype = {
		constructor : LAPPMap,
		init : function(options, id) {
			if( id != undefined ) {
				this.$pointer = id;
			};
			subEvent(this);
			this.markerArr = [];
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
		setZoomAndCenter : function( zoom, lnglat ) {
			mapObj.setZoomAndCenter(zoom, new AMap.LngLat(lnglat.lng,lnglat.lat));
		},
		setOptions: function( options ) {
			this.options = options;
			var renderTarget = options.render || 'wrapper',//渲染节点
             	style = options.style || '../../css/LAPPMap/LAPPMap.css',//样式
				id= options.id,
				ele = options.ele;

			var relocation = '<div id="relocation"></div>';  //relocation按钮
			var zoom = '<div id="zoom"><a hrer="###" id="zoomOn">On</a><a hrer="###" id="zoomIn">In</a></div>'
			var self = this;
			var htm = createHtml( options );
			$('#'+renderTarget).append($(htm));
//			$('#'+renderTarget).append($(relocation));
			$('#'+renderTarget).append($(zoom));
			/*地图*/
			var self = this;
			var op = self.options;
			function mapInit(){
			    if( LAPP.Util.isObject( op.center ) ) {
			    	mapObj = new AMap.Map(id,{
			    		center:new AMap.LngLat(op.center.lng, op.center.lat), //地图中心点
					    level:16  //地图显示的比例尺级别
					});
			    	if( $.isFunction(op.cb) ) {
		            	op.cb(self, mapObj);
		            }
			    }else if( LAPP.Util.isObject( op.defaultCenter ) ){
			    	mapObj = new AMap.Map(id,{
			    		center:new AMap.LngLat(op.defaultCenter.lng, op.defaultCenter.lat)
					});
			    	if( $.isFunction(op.cb) ) {
		            	op.cb(self, mapObj);
		            }
			    }else if( op.autoLocation ){
				    mapObj = new AMap.Map(id);
			    	//地图中添加地图操作ToolBar插件
				    mapObj.plugin(["AMap.ToolBar"],function(){
				        toolBar = new AMap.ToolBar(); //设置地位标记为自定义标记
				        mapObj.addControl(toolBar);
				        AMap.event.addListener(toolBar,'location',function callback(e){
				            locationInfo = e.lnglat;
				            if( $.isFunction(op.cb) ) {
				            	op.cb(self, locationInfo);
				            }
				            locationEndInfo = {
							    	lng : 113.855357,
							    	lat : 22.59915
						    };
				        });
				        mapObj.addControl(toolBar);
				        toolBar.doLocation();//默认加载当前位置
				        toolBar.hide();//隐藏工具条
				    });
			    }else{
			    	mapObj = new AMap.Map(id);
			    	if( $.isFunction(op.cb) ) {
		            	op.cb(self, mapObj);
		            }
			    }

			}
			//地图初始化
			mapInit();
			//渲染样式
			self.renderStyle(style);
			//加载iscroll
			//self.loadScroll(renderTarget);
			self.fn();

			//重新加载定位当前地理信息
			$('#relocation').click(function(){
				toolBar.doLocation();//默认加载当前位置
				console.log('重新定位OK!');

			});
			//Zoom操作
			$('#zoomOn').click(function(){
				mapObj.zoomIn();
			});
			$('#zoomIn').click(function(){
				mapObj.zoomOut();
			});
			LAPP.Publisher.publish("businessWidgetLoaded", self);
		},
		addMarker : function( ele, htm ) {
			this.markerArr = [];
			if(!LAPP.Util.isArray(ele)) {
				ele = [ele];
			}
			for( var i = 0; i < ele.length; i++ ) {
				var obj = ele[i];
				//自定义点标记内容
			    var markerContent = document.createElement("div");
			    markerContent.className = "markerContentStyle";

			    //点标记中的图标
			    var markerImg= document.createElement("img");
			    markerImg.className="markerlnglat";
			    markerImg.src= obj.img ? obj.img : "http://test.kingnode.com/portal/eshop/public/css/LAPPMap/ic_map_greenpin.png";
			    markerContent.appendChild(markerImg);

			     //点标记中的文本
			    var marker = new AMap.Marker({
			        map:mapObj,
			        position:new AMap.LngLat(obj.lng,obj.lat), //基点位置
			        offset:new AMap.Pixel(-10,-30), //相对于基点的偏移位置
			        draggable:false,  //是否可拖动
			        content:markerContent   //自定义点标记覆盖物内容
			    });
			    marker.setMap(mapObj);  //在地图上添加点
			    marker.setTop(true);
			    this.markerArr.push(marker);
			};
		},
		setAnimation : function( index ) {
			var marker = this.markerArr[index];
			for( var i = 0; i < this.markerArr.length; i++ ) {
				this.markerArr[i].setAnimation("AMAP_ANIMATION_NONE");
				this.markerArr[i].stopMove();
			}
			marker.setAnimation('AMAP_ANIMATION_DROP');
		},
		redraw : function(arr) {
			var me = this;
			var render = this.options.render;
			for( var i = 0; i < markerArr.length; i++ ) {
				markerArr[i].setMap(null);
			}
			me.addMarker(arr);
		},
		handlToolbar : function( arg ) {

		},
		drawLine : function( arr ) {
			var pathArr = [];
			for( var i = 0; i < arr.length; i++ ) {
				pathArr.push(new AMap.LngLat(arr[i].lng,arr[i].lat));
			}
			var polyline = new AMap.Polyline({
                map:mapObj,
                path:pathArr,
                strokeColor:"#de4737",//线颜色
                strokeOpacity:1,//线透明度
                strokeWeight:3,//线宽
                strokeStyle:"solid"//线样式
            });
		},
		addCircle : function( arr ) {
			for( var i = 0; i < arr.length; i++ ) {
				//在地图上绘制圆形覆盖物
				var circle = new AMap.Circle({
				   center:new AMap.LngLat(arr[i].lng,arr[i].lat),// 圆心位置
				   radius:50, //半径
				   strokeColor: "#F33", //线颜色
				   strokeOpacity: 1, //线透明度
				   strokeWeight: 3, //线粗细度
				   fillColor: "#ee2200", //填充颜色
				   fillOpacity: 0.35//填充透明度
				});
				circle.setMap(mapObj);
			}
		},
		fn: function(){
			var op = this.options;
			if($.isFunction(op.clickFn)){
				op.clickFn();
			}
		},
		renderStyle: function(style){
			if($('#LAPPMapStyle').size()==0){
				//生成节点
				var tempStyle = $('<link type="text/css"  rel="stylesheet" id="LAPPMapStyle" href=""/>');
				$('head').append(tempStyle);
				//渲染style
				$('#LAPPMapStyle').attr("href",style);
			}else{
				return;
			}
		},
		loadScroll: function(renderTarget){
			var render = renderTarget;
			new iScroll(render,{checkDOMChanges:true, hScrollbar:false, vScrollbar:true,vScroll: true});
//			$('#'+render).css({"overflow": "auto"});
			$('#'+render+' ul').css({"transform": "translate3d(0px, 0px, 0px) scale(1)"});
		},
		refresh : function( arg ) {
			if( arg != undefined ) {
				this.options = LAPP.Util.extend(this.options, arg);
			}
			this.setOptions(this.options);
		},
		clearLine : function() {
			var op = this.options;
			var id = op.render;
			var c = $("#"+id).find('.amap-graph .amap-zoom-animated').children();
			//$("#"+id).find('.amap-marker').remove();
			for( var i = 1; i < c.length; i++ ) {
				$(c).remove();
			}
		},
		drawDrive : function( arg ) {
			if( this.myDrive == undefined ){
				this.myDrive = new Driving( mapObj );
			};
			var start = arg.start, end = arg.end, cb = arg.cb;
			if( start == undefined ){
				start = locationInfo;
			};
			if( end == undefined ){
				end = locationEndInfo;
			};
			this.clearLine();
			var cb = arg.cb;
			this.myDrive.setEndPointer(start, end, cb);
		},
		drawWalking : function( arg ) {

			if( this.myWalking == undefined ){
				this.myWalking = new Walking( mapObj );
			};
			this.clearLine();
			var start = arg.start, end = arg.end, cb = arg.cb;
			if( start == undefined ){
				start = locationInfo;
			};
			if( end == undefined ){

				end = locationEndInfo;
			};
			this.myWalking.setEndPointer(start, end, cb);
		},
		drawBus : function( arg ) {

			if( this.myBus == undefined ){
				this.myBus = new Bus( mapObj );
			};
			this.clearLine();
			var start = arg.start, end = arg.end, cb = arg.cb;
			if( start == undefined ){
				start = locationInfo;
			};
			if( end == undefined ){

				end = locationEndInfo;
			};
			this.myBus.setEndPointer(start, end, cb);
		}
	};
	LAPP.LAPPMap = LAPPMap;
}());
