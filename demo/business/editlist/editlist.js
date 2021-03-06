"use strict";

$(function(){
	var page = new LAPP.Page();
	page.config({
		jsbase : '../../../',
		cssbase : '../../../'
	});
	page.Ready(function( loginInfo ){
		var data = {
   			type : "rest",
   			to : "EBS",
   			url : "editlist.json",
   			service : "XEAM_INT_PKG"
        };
		var op = {
			DataCP : {
    			show : true,
    			id : "listDataCp",
    			subId : ["list2","listLoading"],
    			paging : {
    				"index" : "P_PAGE",
    				"count" : "P_PAGE_CNT"
    			},
    			dataParam : {
	  				"dataFun" : "P_TRANSFER_LIST",
						"P_USER_NAME" : page.getLoginName(),
						"P_PAGE" : "1",
						"P_PAGE_CNT" : "30"
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
    		Toolbar: {
			      	show: true,
			        render: "LAPP-header",
			        id : "toolbar",
			        ele:[
			        	  {type:'title',text: 'List',show: true},
					 {type: 'back', text: '返回',show: true}
			      	]
	        },
			ListLoading: {
				show: true,
				id: 'listLoading',
				render : "listPage",
				containerId: 'containDiv',
				subId: ["listDataCp", "list2"]
			},
    		List: {
					show: true,
					id: 'list2',
					liHeight: 75,
       				isLink: true,
       				isEdit: true,
					subId : ["listLoading","listDataCp"],
					dbData:"data",
					render: "containDiv",
					// data: [
					// 	{USER_NAME: '西撒传奇2'},
					// 	{USER_NAME: '西撒传奇2'},
					// 	{USER_NAME: '西撒传奇2'},
					// 	{USER_NAME: '西撒传奇2'},
					// 	{USER_NAME: '西撒传奇2'}
					// ],
					divPosition:[
						{left: "10px", top: "-3px", dataFile : "USER_NAME"}
					]
			}
		};

		page.setData(data);
    	page.setOptions(op, "LIST", "List", "list");
	});
});
