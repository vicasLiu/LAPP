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
   			url : "grouping.json",
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
		            {"listPage": {top: 51,height: $(window).height()-50, show : true, animation : "slide"}}
	          	]
    		},
    		Toolbar: {
			      	show: true,
			        render: "LAPP-header",
			        id : "toolbar",
			        ele:[
						{type:'title',text: 'Grouping',show: true},
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
    		Grouping: {
				show: true,
				id: 'list2',
				liHeight: 45,
				subId : ["listLoading","listDataCp"],
				render: "containDiv",
				dbData : "formData",
				data : {
		            title : {key:'title1',value:'标题1'},
		            data : [
		                {field : 'textlabel',cls:"icon1"},     // 第一个是设置label
		                {field : 'textRight',fn:function(data){
		                	return 'fn'
		                }}
		            ]
		        }//,
			    // formData :  [
			    //     {
			    //         title1:'数据标题1',
			    //         data : [
			    //             {textRight:"2014-12-26 16:06:19",textlabel:'企业1',isLink:true},
			    //             {textRight:"2014-12-26 16:06:19",textlabel:'企业2'},
			    //             {textRight:"2014-12-26 16:06:19",textlabel:'企业3'}
			    //         ]
			    //     },
			    //     {
			    //         title1:'数据标题2',
			    //         data : [
			    //             {textRight:"2014-12-26 16:06:19",textlabel:'企业1'}
			    //         ]
			    //     }
			    // ]
			}
		};

		page.setData(data);
    	page.setOptions(op, "LIST", "Grouping", "list");
	});
});
