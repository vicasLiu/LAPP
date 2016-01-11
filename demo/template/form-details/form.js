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
    			subId : ["list2","iScroll"],
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
		            {"formpage": {top: 51,height: 'auto', show : true, animation : "slide"}},
		            {"detailpage":{top: 51,height:'auto', show : true, animation : "slide"}}

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
			iScroll : {
				show : true,
				render : "formpage",
				id : "iScroll",
				subId: ['addShopForm']
			},
    		Form: {
				show: true,
				render: 'formpage',
				id : "addShopForm",
				isHideTitle: [false,false,false],
				edit : 'allEditors',// 可以编辑全部(allEditors) 部分能编辑(partEditors) 全部不能编辑(notEdit)
				subId : ["list1", "dyList"],
				dbData:"detail",
				events : {
					evt : {
						"click #addressSelectdir" : "addressSelect",
						"click #nameSelect" : "nameSelect"
					},
					handle : {
						addressSelect : function() {
							  page.setOptions(formop,"Formop", "详情", "formop")
						},
						nameSelect : function() {
							alert("店名选择！");
						}
					}
				},
		        data : [ {
		            title : {key:'栏目1',value:'栏目1'},
		            isTogglepanel : false,  // 是否可以切换
		            data : [
		                {id:"addressSelect",label:'姓名',labelCls:'',field:'fdsafdsa',type:'select',orderId:"orderId",groupId:"groupId",value: 'xixiix',edit:false,fn:function(data){
		                    return "马走日";
		                }},
		                {id:"addressSelect1",label:'地址',labelCls:'',field:'field1',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: 'xixiix1',edit:true,fn:function(data){
		                    return '联想大厦'
		                }},
		            ]
		        }]
		       
			}
		};

		var formop = {
			DataCP : {
    			show : true,
    			id : "formDataCp2",
    			subId : ["addShopForm2","iScrol2"],
    			 
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
				render : "detailpage",
				id : "iScroll2",
				subId: ['addShopForm2']
			},
			Form: {
					show: true,
					render: 'detailpage',
					id : "addShopForm2",
					isHideTitle: [false,false,false],
					edit : 'allEditors',  // 可以编辑全部(allEditors) 部分能编辑(partEditors) 全部不能编辑(notEdit)
					subId : ["iScroll2", "formDataCp2"],
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
				            title : {key:'sada',value:'栏目1'},
				            isTogglepanel : false,
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
		}
		page.setData(data);
    	page.setOptions(op, "LIST", "List", "list");
	});
});
