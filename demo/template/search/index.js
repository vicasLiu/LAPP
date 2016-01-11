$(function(){
	var page = new LAPP.Page();
	page.config({
		jsbase : '../../../',
		cssbase : '../../../' 
	});
	page.Ready(function( loginInfo ){
		var createList = function() {
			var listOp = {
				DataCP : {
					show : true,
	    			id : "listDataCp",
	    			dataParam : {
	    			},
	    			common : {
	    				url : "data.json"
	    			}
				},
				iScroll : {
					show : true,
					render : "listPage",
					id : "iScroll",
					subId : "list"
				},
				List : {
					show : true,
					render : "listPage",
					id: 'list',
					liHeight: 45,
					widgetType : "singlelist",
					subId : ["listDataCp"],
					dbData : "data",
					divPosition:[
						{left: "50px", top: "-3px", dataFile : "address"}
					],
					events : {
				        evt : {
				            "click li" : "clickLi"
				        },
				        handle : {
			          		clickLi : function(){
			          			page.back();
			          		}
				        }
					}
				}
			};
			page.setOptions(listOp,"list","省份选择","list");
		};
		var createDetailList = function() {
			var listOp = {
				DataCP : {
					show : true,
	    			id : "lDataCp",
	    			dataParam : {
	    			},
	    			common : {
	    				url : "list.json"
	    			}
				},
				iScroll : {
					show : true,
					render : "liPage",
					id : "iScrolllist",
					subId : "listId"
				},
				List : {
					show : true,
					render : "liPage",
					id: 'listId',
					liHeight: 45,
					subId : ["lDataCp"],
					dbData : "data",
					divPosition:[
						{left: "50px", top: "-3px", dataFile : "address"}
					],
					events : {
				        evt : {
				            "click li" : "clickLi"
				        },
				        handle : {
			          		clickLi : function(){
			          			createDetail();
			          		}
				        }
					}
				}
			};
			page.setOptions(listOp,"listii","列表","listii");
		};
		var createDetail = function() {
			var formOp = {
				DataCP : {
					show : true,
	    			id : "formDataCP",
	    			dataParam : {
	    			},
	    			common : {
	    				url : "list.json"
	    			}
				},
				iScroll : {
					show : true,
					render : "formPage",
					id : "formiScroll",
					subId : ["formWidget"]
				},
				Form : {
					show : true,
					render : "formPage",
					id: 'formWidget',
					liHeight: 45,
					subId : ["formDataCP"],
					dbData : "data",
					data : [
				        {
			                title : {key:'title',value:'栏目1',show:true},
			                isTogglepanel : false,  // 是否可以切换
			                data : [
			                    {id:"addressSelect1",label:'地址',labelCls:'ga',field:'id',type:'select',orderId:"address",groupId:"address",value: '科技园联想大厦',edit:true},
			                    {id:"addressSelect2",label:'姓名',labelCls:'ga',field:'name',type:'inputText',orderId:"name",groupId:"groupId",value: '张三',edit:true,placeholder: '请输入名字'},
			                    {id:"addressSelect3",label:'电话',labelCls:'ga',field:'tel',type:'number',orderId:"tel",groupId:"groupId",value: '13333333333',edit:true,placeholder: '请输入电话'},
			                    {id:"addressSelect4",label:'email',labelCls:'ga',field:'email',type:'inputText',orderId:"email",groupId:"groupId",value: '1234567@qq.com',edit:true,placeholder: '请输入email'},
			                ]
			            }
				    ]
				}
			};
			page.setOptions(formOp,"detail","详情","detail");
		};
		var op = {
			Layout : {
				show : true, 
				render: "body",
				id : "layout1",
				ele:[
					{"LAPP-header":{top: 0,height:50, show : true, animation : "slide"}},
					{"panelPage":{top: 51,height: $(window).height()-101, show : true}},
					{"listPage":{top: 51,height: $(window).height()-101, show : true}},
					{"liPage":{top: 51,height: $(window).height()-101, show : true}},
					{"formPage":{top: 51,height: $(window).height()-101, show : true}}
				]
			},
			Toolbar: {
				show: true,
				render: "LAPP-header",
				id : "toolbar",
				ele:[
					{type:'title', text: '',show: true},
					{type: 'back', text: '返回',show: true},
					{type: 'submit',text: '确定',show: true}
				],
				events : {
					evt : {
						"click .submit" : "confirmBtn",
						"click .back" : "back"
					},
					handle : {
						"back" : function() {
							page.back();
						},
						"confirmBtn" : function() {
							var obj = page.getPageParam();
							createDetailList();
						}
					}
				}
			},
			iScroll : {
				show : true,
				render : "panelPage",
				id : "iScroll",
				subId : "addShopForm"
			},
			Form : {
				show: true,
				render: 'panelPage',
				id : "addShopForm",
				isHideTitle: [false,false,false],
				edit : 'allEditors',// 可以编辑全部(allEditors) 部分能编辑(partEditors) 全部不能编辑(notEdit)
				subId : ["list"],
				events : {
					evt : {
						"click #pro" : "proSelect",
						"click #city" : "addSelect",
						"click #sta" : "staSelect"
					},
					handle : {
						proSelect : function() {
							createList();
						},
						addSelect : function() {
							createList();
						},
						staSelect : function() {
							createList();
						}
					}
				},
		        data : [ {
		            title : {key:'栏目1',value:'栏目1'},
		            isTogglepanel : false,  // 是否可以切换
		            data : [
		                {id:"pro",label:'省份',field:'pro',type:'select',orderId:"address",groupId:"address"},
		                {id:"city",label:'城市',field:'add',type:'select',orderId:"address",groupId:"city"},
		                {id:"sta",label:'状态',field:'sta',type:'select',orderId:"address",groupId:"sta"},
		            ]
		        }]
			}
		};
		page.setOptions(op, "search", "搜索界面", "search"); 
	}); 
});
