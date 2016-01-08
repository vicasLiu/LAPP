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
   			url : "card.json",
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
    		Card: {
					show: true,
					id: 'list2',
					subId : ["listLoading","listDataCp"],
					render: "containDiv",
					dbData : "formData",
				 	data : {
			            head : [
			                { label : '合计' , field : 'field' }
			            ],
			            title : { label : '费用统计' , field : 'sss1' },
			            list : [
			                { label : '出发地' , field : 'address1',fn:function(data){
			                    return '<label>发货单号:军方基地</label><span>确认订单</span>';
			                } },
			                { label : '目的地' , field : 'address2' },
			                { label : '开始日期' ,cls:'1321' },
			                { label : '金额' , field : 'address4' }
			            ],
			            footer : [
			                { label : '金额' , field : 'address5' }
			            ]
			        }//,
			     //    formData : {
				    //      head : [
				    //         { field : '100000000.00' }
				    //     ],
				    //     title : [{ sss : '费用统计1' }],
				    //     list : [
				    //         { address1 : '深圳111',address2 : '北极',address3 : '2015-5-1',address4 : '1000000000' },
				    //         { address1 : '深圳',address2 : '南极',address3 : '2015-10-1',address4 : '1000000' }
				    //     ],
				    //     footer : [
				    //         { address5 : '100000000.00' }
				    //     ]
				    // }

			}
		};

		page.setData(data);
    	page.setOptions(op, "LIST", "Card", "list");
	});
});
