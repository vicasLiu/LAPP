"use strict";

$(function(){
	var page = new LAPP.Page();
	page.config({
		base : '../../../../LAPP/',
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
			BtnNumber: {
				render: "listPage",
				id : "btnnumber",
		        value : '100' , 
		        // wid : ($(window).width() * 0.8),     // 获取render容器的宽度 如果为空或者不设置 则为window宽度的80%
		        text : '元' , 
		        addMunber : 1, // 增量
		        placeholder : '按钱充电',
		        isSelect : true   // 是否默认选中
	 
			}
		};

		page.setOptions(op, "LIST", "List", "list");
	});
});
