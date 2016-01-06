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
   			url : "Jersey_WebClient/restRequest.jsp",
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
		        	{type:'title',text: 'singlelist',show: true},
					{type: 'back', text: '返回', show: true} 
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
					widgetType : "singlelist",
					liHeight: 55,
					isLink: true,
					isEdit: false,
					isSelected: false,
					isMultiple: false,
					render: "containDiv",
					data: [
						{text: '总经理办公司1',isSelected:false}, // isSelected是否默认选中
						{text: '总经理办公司2',isSelected:false},
						{text: '总经理办公司1',isSelected:false}, 
						{text: '总经理办公司2',isSelected:true} 
					],
					divPosition:[{left: "40px",dataFile :"text"}]
			}
		};
		page.setData(data);
    	page.setOptions(op, "LIST", "List", "list");
	});
});
