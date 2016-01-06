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
                      {"timeline-page":{top: 51,height: 'auto', show : true, animation : "slide"}}
                      
                ]
    		},
    		Toolbar: {
            	show: true,
                render: "LAPP-header",
                id : "toolbar",
                ele:[
                	 {type:'title',text: 'Timeline',show: true},
                     {type: 'back', text: '返回', show: true} 
                	]   
            },
            iScroll : {
                show : true,
                render : "timeline-page",
                id : "iScroll",
                subId: ['timeline']
            },
    		Timeline: { 
				show: true,
				id: 'timeline',
				render: "timeline-page",     
				subId: ['listDataCp'],  
				/*ele: [{list:  
							[{"USER_NAME" : "张强",
						     "EMPLID" : "10000070",
						     "PS_DATE" : "2014-03-13 08:35",
						     "ADDRESS" : "深圳市南山区科技园联想研发中心",
						     "LONGITUDE" : "113.954275",
						     "LATITUDE" : "22.544527",
						     "SUPERIORS" : "10000053"}],
						     date: '2010'}
					] */
                data :[
                    {time : "今天",description : "2 个消息",list : ["祝您生日快乐，请到人事部领取生日礼物。","祝您生日快乐，请到人事部领取生日礼物。"]},

                    {time : "05-01-05",description : "2 个消息",list : ["祝您生日快乐，请到人事部领取生日礼物。","祝您生日快乐，请到人事部领取生日礼物。"]}
			     ]
            }
		};
	 
		page.setData(data);
	    page.setOptions(op, "LIST", "Timeline", "list");
	});
});