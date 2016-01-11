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
			        	{type:'title',text: 'List',show: true},
					 	{type: 'back', text: '返回',show: true},
					 	{type: 'submit', text: '全选',show: true}
			      	],
			      	events :{
			      		evt : {"click .submit":"AllSelectedFun"},
			      		handle : {
			      			AllSelectedFun : function(){
			      				$(".multiplelist-ul").find("li").addClass("allSelected");
			      				$("#LAPP-toast").show();
			      			}

			      		}

			      	}

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
					liHeight: 45,
					isSelected: false,
					widgetType : "multiplelist",
					subId : ["listLoading","listDataCp"],
					render: "containDiv",
					data: [
						{text: '总经理办公司1',isSelected:true}, // isSelected是否默认选中
						{text: '总经理办公司2',isSelected:true},
						{text: '总经理办公司1',isSelected:true}, 
						{text: '总经理办公司2',isSelected:true} 
					],
					divPosition:[
						{left:'40px',dataFile :"text",cls:"dd"}
					],
					cb : function(){
						 
					},
					 events : {
				          evt : {
				            "click li" : "liClick"
				          },
				          handle : {
				          		liClick : function(){
				          			alert(1);
				          			console.log('liClick');
				          		}
				          }
					}
			},
			Dialog: {
				show: false,
				id: 'LAPP-toast',
				render: 'body',
				widgetType : "confirm",
				title: '这里是title',
		        text: '这里是弹出框的内容',
		        button: ['确定','取消'],
		        events : {
		        	evt : {
		        		"click .cancel-btn" : "cancelbtn"
		        	},
		        	handle : {
		        		cancelbtn : function(){
		        			$(".multiplelist-ul").find("li").removeClass("allSelected");
		        		}
		        	}
		        }
			}
		};
		page.setData(data);
    	page.setOptions(op, "LIST", "List", "list");
	});
});
