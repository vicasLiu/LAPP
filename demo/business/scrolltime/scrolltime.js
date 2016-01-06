"use strict";

$(function(){
	var page = new LAPP.Page();
	page.config({
		base : '../../../../APP/',
		jsbase : '../../../',
		cssbase : '../../../'
	});
	page.Ready(function( loginInfo ){
		var _wid = $(window).width(),
    		_wid2 = (_wid/2 - 37)+'px',
    		_wid4 = (_wid/4 - 31)+'px';
		var op = {
			Layout : {
				show : true,
				render: "body",
				id : "layout1",
				ele:[
					{"LAPP-header":{top: 0,height:50, show : true, animation : "slide"}},
					{"listPage": {top: 51,height: 'auto', show : true, animation : "slide"}}

				]
			},
			Toolbar: {
				show: true,
				render: "LAPP-header",
				id : "toolbar",
				ele:[
					{type:'title',text: 'BtnNumber',show: true},
					{type:'back',text: '返回',show: true}
				]
			},
			ScrollTime: {
				render: "listPage",
				id : "Scrolltime",
		        // value : [2,30] , // 小时 分钟 
		        text : ['小时','分钟'] , 
		        isClick : true,   // 是否默认可以点击滚动
		        isScroll : true   // 是否默认可以滚动
	 
			}
		};

		page.setOptions(op, "LIST", "List", "list");
	});
});
