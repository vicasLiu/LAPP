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
    			subId : "list1",
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
                      {"tab-page":{top: 51,height:40, show : true, animation : "slide"}}
                ]
    		},
    		Toolbar: {
            	show: true,
                render: "LAPP-header",
                id : "toolbar",
                ele:[
                	 {type:'title',text: 'Tab',show: true} 
                	]   
            },
        	Tab: {
				show: true,
				id: 'tab',
                height : '40px',
				render: 'tab-page',
				ele: [ 
                    {key:"",value:"未处理",status:true},
                    {key:"",value:"已处理",status:false},
                    {key:"",value:"处理中",status:false}
                ]
			}
		};
	 
		page.setData(data);
	    page.setOptions(op, "LIST", "Tab", "list");
	});
});