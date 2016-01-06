"use strict";

$(function(){
	var page = new LAPP.Page();
	page.config({
		base : '../../../../APP',
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
		            {"tab-page":{top: 51,height:40, show : true, animation : "slide"}},
		            {"listPage": {top: 100,height: 'auto', show : true, animation : "slide"}},
		            {"formpage":{top: 51,height:'auto', show : true, animation : "slide"}}

	          	]
    		},
    		Toolbar: {
			      	show: true,
			        render: "LAPP-header",
			        id : "toolbar",
			        ele:[
			        	{type:'title',text: 'List',show: true},
					 	{type: 'back', text: '返回',show: true}
			      	],
			      	events : {
			      		evt :{
			      			"click .back" : "backClick"
			      		},
			      		handle : {
			      			backClick : function(){
			      				page.back();
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
			Tab:{
				show: true,
				id: 'tab',
                height : '40px',
				render: 'tab-page',
				ele: [ 
                    {key:"",value:"未处理",status:true},
                    {key:"",value:"已处理",status:false},
                    {key:"",value:"处理中",status:false}
                ],
                clickFn: function (data) {
                	if(data=="未处理"){
                		op.List.isEdit = false;
						op.List.liHeight = 45;
						op.List.widgetType = "singlelist";
                		op.List.data = [
	                		{USER_NAME: 'one'},
							{USER_NAME: 'two'},
							{USER_NAME: 'three'},
							{USER_NAME: 'four'},
							{USER_NAME: 'five'},
							{USER_NAME: 'six'},
							{USER_NAME: 'seven'},
							{USER_NAME: 'eight'},
							{USER_NAME: 'nine'},
							{USER_NAME: 'ten'}
                		];
                	}else if(data=="已处理"){
                		op.List.isEdit = true;
						op.List.liHeight = 45;
						op.List.widgetType = "multiplelist"
                		op.List.data = [
                			{USER_NAME: 'eleven'},
							{USER_NAME: 'twelve'},
							{USER_NAME: 'thirteen'},
							{USER_NAME: 'fourteen'},
							{USER_NAME: 'fifteen'}
                		];

                	}else if(data=="处理中"){
                		op.List.isEdit = false;
						op.List.liHeight = 45;
						op.List.widgetType="list";
						op.List.data = [
							{USER_NAME: 'sixteen'},
							{USER_NAME: 'seventeen'},
							{USER_NAME: 'eighteen'},
							{USER_NAME: 'twenty'},
							{USER_NAME: 'twenty-one'},
							{USER_NAME: 'twenty-two'},
							{USER_NAME: 'twenty-three'},
							{USER_NAME: 'twenty-four'},
							{USER_NAME: 'twenty-five'},
							{USER_NAME: 'twenty-six'}
						];
                	}
                	 page.refresh("list2", op.List);
                }
			},
    		List: {
					show: true,
					id: 'list2',
					liHeight: 45,
					isLink: true,
					isEdit: false,
					isSelected: false,
					isMultiple: false,
					widgetType:"singlelist",
					subId : ["listLoading","listDataCp"],
					render: "containDiv",
					data: [
						{USER_NAME: 'one'},
						{USER_NAME: 'two'},
						{USER_NAME: 'three'},
						{USER_NAME: 'four'},
						{USER_NAME: 'five'},
						{USER_NAME: 'six'},
						{USER_NAME: 'seven'},
						{USER_NAME: 'eight'},
						{USER_NAME: 'nine'},
						{USER_NAME: 'ten'}
					],
					divPosition:[
						{left: "50px", top: "3px", dataFile : "USER_NAME"}
					],
					events:{
						evt:{"click .LAPP-list-li":"liclick"},
						handle : {
								liclick : function(p){
									var _this = $(p.current);
									 page.setOptions(formop,"Formop", "详情", "formop")
								}
						}

					},
					cb:function(data){
						console.log(data);
					},
					clickFn : function(data){
						console.log(data);
					}
			}
		};

		var formop = {
			DataCP : {
    			show : true,
    			id : "formDataCp2",
    			subId : ["addShopForm","iScrol2"],
    			 
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
    		iScroll : {
				show : true,
				render : "formpage",
				id : "iScroll2",
				subId: ['addShopForm']
			},
			Form: {
					show: true,
					render: 'formpage',
					id : "addShopForm",
					isHideTitle: [false,false,false],
					edit : 'allEditors',  // 可以编辑全部(allEditors) 部分能编辑(partEditors) 全部不能编辑(notEdit)
					subId : ["iScroll", "formDataCp"],
					dbData:"detail",
					events : {
						evt : {
							"click #addressSelect" : "addressSelect",
							"click #nameSelect" : "nameSelect"
						},
						handle : {
							addressSelect : function() {
								alert("地址选择！");
							},
							nameSelect : function() {
								alert("店名选择！");
							}
						}
					},
					 data : [
				        {
				            title : {key:'栏目1',value:'栏目1'},
				            isTogglepanel : true,
				            data : [
				                {
				                    show : true,
				                    title : {key:'货物1',value:'货物1'},
				                    data : [
				                        {id:"addressSelect1",label:'姓名',labelCls:'',field:'address1',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '张三',edit:true},
				                        

				                        {id:"addressSelect2",label:'地址',labelCls:'',field:'address2',type:'inputText',orderId:"orderId2",groupId:"groupId2",value: '联想大厦',edit:true},
				                        {id:"addressSelect3",label:'电话',labelCls:'',field:'address3',type:'select',orderId:"orderId3",groupId:"groupId3",value: '13333333333',edit:true},
				                        {id:"addressSelect4",label:'产品',labelCls:'',field:'address4',type:'inputText',orderId:"orderId4",groupId:"groupId4",value: 'gaga',edit:false,fn:function(data){
				                            return '西撒摄影作坊'
				                        }},
				                        {id:"addressSelec6t",label:'邮件',labelCls:'',field:'address6',type:'inputText',orderId:"orderId6",groupId:"groupId6",value: '121212@qq.com',edit:true}
						            ]
				                }
				            ]
				        }
				    ]
				}
		}
		page.setData(data);
    	page.setOptions(op, "LIST", "List", "list");
	});
});
