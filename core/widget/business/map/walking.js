var Walking = function( mapObj ) {
	var route_text, steps, infoCallback;  
	var polyline; 
	//起、终点  
	var start_xy;  
	var end_xy; 
	var init = function() {
		var MWalk;  
	    mapObj.plugin(["AMap.Walking"], function() {          
	        MWalk = new AMap.Walking(); //构造路线导航类   
	        AMap.event.addListener(MWalk, "complete", walk_routeCallBack); //返回导航查询结果  
	        MWalk.search(start_xy, end_xy); //根据起终点坐标规划步行路线  
	    });  
	};
	var setEndPointer = function( start, end, cb ) {
		infoCallback = cb;
		start_xy = new AMap.LngLat(start.lng, start.lat);
		end_xy = new AMap.LngLat(end.lng, end.lat);
		init();
	};
	var walk_routeCallBack = function(data) {
		if( $.isFunction(infoCallback) ){
			infoCallback(data);
		};
		this.data = data;
		var routeS = data.routes;  
        if (routeS.length <= 0) {  
           // document.getElementById("result").innerHTML = "未查找到任何结果!<br />建议：<br />1.请确保所有字词拼写正确。<br />2.尝试不同的关键字。<br />3.尝试更宽泛的关键字。";  
        }   
        else {   
            route_text="";  
            for(var v =0; v< routeS.length;v++){  
                //步行导航路段数  
                steps = routeS[v].steps;  
                var route_count = steps.length;  
                //步行距离（米）  
                var distance = routeS[v].distance;  
                //拼接输出html  
                for(var i=0 ;i< steps.length;i++) {  
                    route_text += "<tr><td align=\"left\" onMouseover=\"walkingDrawSeg('" + i + "')\">" + i +"." +steps[i].instruction  + "</td></tr>";  
                }  
            }  
            //输出步行路线指示  
            route_text = "<table cellspacing=\"5 px\" ><tr><td style=\"background:#e1e1e1;\">路线</td></tr><tr><td><img src=\"http://code.mapabc.com/images/start.gif\" />&nbsp;&nbsp;北京南站</td></tr>" + route_text + "<tr><td><img src=\"http://code.mapabc.com/images/end.gif\" />&nbsp;&nbsp;北京站</td></tr></table>";  
            //document.getElementById("result").innerHTML = route_text;  
            walkingDrawLine();  
        }  
	};
	//绘制步行导航路线  
	var walkingDrawLine = function () {  
	    //起点、终点图标  
	    var sicon = new AMap.Icon({  
	        image: "http://api.amap.com/Public/images/js/poi.png",  
	        size:new AMap.Size(44,44),  
	        imageOffset: new AMap.Pixel(-334, -180)  
	    });  
	   /* var startmarker = new AMap.Marker({  
	        icon : sicon, //复杂图标  
	        visible : true,   
	        position : start_xy,  
	        map:mapObj,  
	        offset : {  
	            x : -16,  
	            y : -40  
	        }  
	    });  */
	    var eicon = new AMap.Icon({  
	        image: "http://api.amap.com/Public/images/js/poi.png",  
	        size:new AMap.Size(44,44),  
	        imageOffset: new AMap.Pixel(-334, -134)  
	    });  
	   /* var endmarker = new AMap.Marker({  
	        icon : eicon, //复杂图标  
	        visible : true,   
	        position : end_xy,  
	        map:mapObj,  
	        offset : {  
	            x : -16,  
	            y : -40  
	        }  
	    });  */ 
	    //起点到路线的起点 路线的终点到终点 绘制无道路部分  
	    var extra_path1 = new Array();  
	    extra_path1.push(start_xy);  
	    extra_path1.push(steps[0].path[0]);  
	    var extra_line1 = new AMap.Polyline({  
	        map: mapObj,  
	        path: extra_path1,  
	        strokeColor: "#9400D3",  
	        strokeOpacity: 0.7,  
	        strokeWeight: 4,  
	        strokeStyle: "dashed",  
	        strokeDasharray: [10, 5]  
	    });  
	  
	    var extra_path2 = new Array();  
	    var path_xy = steps[(steps.length-1)].path;  
	    extra_path2.push(end_xy);  
	    extra_path2.push(path_xy[(path_xy.length-1)]);  
	    var extra_line2 = new AMap.Polyline({  
	        map: mapObj,  
	        path: extra_path2,  
	        strokeColor: "#9400D3",  
	        strokeOpacity: 0.7,  
	        strokeWeight: 4,  
	        strokeStyle: "dashed",  
	        strokeDasharray: [10, 5]  
	    });  
	  
	    for(var s=0; s<steps.length; s++) {  
	        var drawpath = steps[s].path;  
	        var polyline = new AMap.Polyline({  
	            map: mapObj,  
	            path: drawpath,  
	            strokeColor: "#9400D3",  
	            strokeOpacity: 0.7,  
	            strokeWeight: 4  
	        });   
	    }  
	    mapObj.setFitView();  
	}     
	//绘制步行导航路段  
	var walkingDrawSeg = function (n) {  
	    var drawpath_seg = steps[n].path;  
	    if(polyline != null){  
	        polyline.setMap(null);  
	    }  
	    polyline = new AMap.Polyline({  
	            map: mapObj,  
	            path: drawpath_seg,  
	            strokeColor: "#FF3030",  
	            strokeOpacity: 0.9,  
	            strokeWeight: 4,  
	            strokeDasharray: [10, 5]  
	        });  
	};
	this.setEndPointer = setEndPointer;
};