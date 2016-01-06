"use strict";

$(function(){
	var page = new LAPP.Page();
	page.config({
		base : '../../../../APP/',
		jsbase : '../../../',
		cssbase : '../../../'
	});
	page.Ready(function( loginInfo ){
		var data = {
			type : "rest",
			to : "EBS",
			url : "demo.json",
			service : "XEAM_INT_PKG"
		};
		var op = {
			DataCP : {
				show : true,
				id : "listDataCp",
				subId : "list2",
				dataParam : {
					
				}
			},
			Layout : {
				show : true,
				render: "body",
				id : "layout1",
				ele:[
					{"LAPP-header":{top: 0,height:50, show : true, animation : "slide"}},
					{"listPage": {top: 51,height: 'auto', show : true, animation : "slide"}}

				]
			},
			Calendar: {		 
				show:  true,
		        render: 'listPage',
		        id: 'calendar',
		        subId : "listDataCp",
		        dbData : "data",
		        cls : 'LAPP-calendar-orange', // LAPP-calendar-orange(橙色) LAPP-calendar-purple(紫色)   没有填写则用默认蓝色 
				// data : ["2015-01-01", "2015-01-28", "2015-01-10", "2015-01-17"],
			}
		};
		page.setData(data);
		page.setOptions(op, "LIST", "List", "list");
	});
});
  
