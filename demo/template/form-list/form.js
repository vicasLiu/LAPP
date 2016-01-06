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
				subId : ["list1", "dyList","list2"],
				dbData:"detail",
				events : {
					evt : {
						"click #addressSelectdir" : "addressSelect",
						"click #nameSelect" : "nameSelect"
					},
					handle : {
						addressSelect : function() {
							  page.setOptions(formop,"Formop", "List", "formop")
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
		                {id:"addressSelect",label:'姓名',labelCls:'',field:'fdsafdsa',type:'select',orderId:"USER_NAME",groupId:"groupId",value: 'xixiix',edit:false,fn:function(data){
		                    return "马走日";
		                }},
		                {id:"addressSelect1",label:'地址',labelCls:'',field:'field1',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: 'xixiix1',edit:true,fn:function(data){
		                    // data.label = 132132;
		                    return '西撒摄影作坊'
		                }},
		            ]
		        }]
			}
		};

		var formop = {
			DataCP : {
    			show : true,
    			id : "formDataCp2",
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
			ListLoading: {
				show: true,
				id: 'listLoading',
				render : "detailpage",
				containerId: 'containDiv',
				subId: ["formDataCp2", "list2"]
			},
			List : {
					show: true,
					id: 'list2',
					liHeight: 45,
					//isLink: true,
					isEdit: true,
					subId : ["listLoading","formDataCp2"],
					render: "containDiv",
					data: [
						{USER_NAME: '马走日1'},
						{USER_NAME: '马走日2'},
						{USER_NAME: '马走日3'},
						{USER_NAME: '马走日4'},
						{USER_NAME: '马走日5'}
					],
					divPosition:[
						{left: "10px", top: "-3px", dataFile : "USER_NAME"}
					],
					events:{
						evt:{"click li":"clickLi"},
						handle : {
								clickLi : function(p){
									page.back();
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
		}
		page.setData(data);
    	page.setOptions(op, "LIST", "List", "list");
	});
});
