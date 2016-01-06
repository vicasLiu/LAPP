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
   			url : "process.json",
   			service : "XEAM_INT_PKG"
        };
		var op={
			list : {
				DataCP : {
	    			show : true,
	    			id : "listDataCp",
	    			subId : ["process"],
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
				Layout: {
	                 show: true,
	                 render: "body",
	                 id : "layout1",
	                 ele:[ 
	                     {"LAPP-header":{top: 0,height:50, show : true}},
	                     {"process-render":{top: 51,height:'auto', show : true, animation : "slide"}}
	                     ]
                },
                Toolbar: {
	               	 show: true,
	                 render: "LAPP-header",
	                 id : "toolbar",
	                 ele:[{type: 'back', text: '返回',show: true},
	                      {type:'title',text: '休假管理',show: true}]
                },
                iScroll : {
					show : true,
					render : "process-render",
					id : "iScroll",
					subId: ['process']
				},
                Process: {
                	show: true,
                	title: '审批流程',
                    render: "process-render",
                    id : "process",
                    dbData : "data",
                    subId: ['listDataCp']
            //         data: [
            //             {status : true,index:4,comment : '部门长审批部门长审批部门长审批部门长审批部门长审批部门长审批部门长审批部门长审批部门长审批部门长审批部门长审批部门长审批部门长审批部门长审批部门长审批部门长审批部门长审批部门长审批部门长审批部门长审批部门长审批部门长审批部门长审批'},
				        // {status : false,index:3,comment : '部门长审批'},
				        // {status : false,index:2,comment : '部门长审批'},
				        // {status : false,index:1,comment : '部门长审批'}
            //        ]
               }
			}
		}
		page.setData(data);
		page.setOptions(op.list, "Process", "ProcessDemo");
	});
});