"use strict";

$(function(){
	var page = new LAPP.Page();
	page.config({
		jsbase : '../../../',
		cssbase : '../../../'
	});
	page.Ready(function( loginInfo ){
		 
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
					{type:'title',text: 'SerialNumber',show: true},
					{type:'back',text: '返回',show: true}
				]
			},
			SerialNumber: {
				render: "listPage",
				id : "Scrolltime",
		        value : '100' , // 值
		        number : 5 , // 编号几位数 （addnumber为空 不够则补0） 如果为空 则直接取value  number的长度如果小于value的长度 则取value的长度和addnumber之和 反之则补0
		        addnumber : 'x'  // 补空(英文全部自动转换成大写)
		        // styleDiv : { margin : [ 10,10,16,10 ] , padding : [ 8,10,8,10 ] },// 分别代表上右下左   可以不设置 默认为margin:10px;padding:8px 10px;
	 
			}
		};

		page.setOptions(op, "LIST", "List", "list");
	});
});
