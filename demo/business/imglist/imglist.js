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
			        	{type: 'title',text: 'List',show: true},

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
					widgetType : "imglist",
					subId : ["listLoading","listDataCp"],
					render: "containDiv",
					data: [
						{USER_NAME: 'imglist1',ImgSrc:"http://c.hiphotos.baidu.com/zhidao/wh%3D600%2C800/sign=3e518598d31b0ef46cbd9058edf47de2/ae51f3deb48f8c540e7d08993b292df5e1fe7fde.jpg"},
						{USER_NAME: 'imglist3',ImgSrc:"http://c.hiphotos.baidu.com/zhidao/wh%3D600%2C800/sign=3e518598d31b0ef46cbd9058edf47de2/ae51f3deb48f8c540e7d08993b292df5e1fe7fde.jpg" },
						{USER_NAME: 'imglist2',ImgSrc:"http://c.hiphotos.baidu.com/zhidao/wh%3D600%2C800/sign=3e518598d31b0ef46cbd9058edf47de2/ae51f3deb48f8c540e7d08993b292df5e1fe7fde.jpg"},
						{USER_NAME: 'imglist3',ImgSrc:"http://c.hiphotos.baidu.com/zhidao/wh%3D600%2C800/sign=3e518598d31b0ef46cbd9058edf47de2/ae51f3deb48f8c540e7d08993b292df5e1fe7fde.jpg"},
						{USER_NAME: 'imglist4',ImgSrc:"http://c.hiphotos.baidu.com/zhidao/wh%3D600%2C800/sign=3e518598d31b0ef46cbd9058edf47de2/ae51f3deb48f8c540e7d08993b292df5e1fe7fde.jpg"}
					],
					divPosition:[
						{left: "0", top: "10px", dataFile : "ImgSrc",type:"image"},
						{left: "0", top: "25px",cls:'liText', dataFile : "USER_NAME"}
					]
			}
		};

		page.setData(data);
    	page.setOptions(op, "LIST", "List", "list");
	});
});
