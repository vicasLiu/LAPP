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
				url : "form.json",
				service : "XEAM_INT_PKG"
				};
		var op = {
				DataCP : {
	    			show : true,
	    			id : "listDataCp",
	    			subId : ["addShopForm"],
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
									{locationListPage:{top: 51,height: $(window).height()-101, show : true}},
									{buttomRender:{top:$(window).height()-51,height:'auto',show:true, animation : "slide"}}

								]
				},
				Toolbar: {
					show: true,
					render: "LAPP-header",
					id : "toolbar",
					ele:[
					
						{type:'title', text: 'form',show: true},
						{type: 'back', text: '返回',show: true}
						 
					],
					events : {
			      		evt :{
			      			"click .back" : "backClick",
			      			"click .submit" : "editClik"
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
					render : "locationListPage",
					id : "iScroll",
					subId : "addShopForm"
				},
				Form: {
					show: true,
					render: 'locationListPage',
					id : "addShopForm",
					isHideTitle: [false,false,false],
					edit : 'partEditors',// 可以编辑全部(allEditors) 部分能编辑(partEditors) 全部不能编辑(notEdit)
					subId : ["listDataCp", "iScroll"],
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
			        data : [ {
			            title : {key:'栏目1',value:'栏目1'},
			            isTogglepanel : false,  // 是否可以切换
			            data : [
			                {id:"tel",label:'电话',labelCls:'',field:'tel',type:'select',orderId:"orderId",groupId:"groupId",value: 'xixiix',edit:false,fn:function(data){
			                    return "3333";
			                }},
			                {id:"add",label:'地址',labelCls:'',field:'add',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: 'xixiix1',edit:true,fn:function(data){
			                    // data.label = 132132;
			                    return '联想大厦'
			                }},
			                {id:"switchBtn",label:'开关',labelCls:'ga1',field:'btnVal',type:'switchBtn',orderId:"address",groupId:"address",edit:true,arr: ['开','关'],fn:function(){}},//,valDefault:true
			                {id:"password",label:'密码',labelCls:'ga',field:'password',type:'password',orderId:"orderId",groupId:"groupId",value: 'gaga',edit:true,placeholder: '请输入密码'},
			                {id:"addressSelect23",label:'email',labelCls:'ga',field:'email',type:'inputText',orderId:"orderId",groupId:"groupId",value: '111@qq.com',edit:true,placeholder: '请输入内容'},
			                {id:"addressSelect1",label:'进度',labelCls:'ga',field:'process',disable : false, type:'dragBar',orderId:"address",groupId:"address",value: '10',edit:true,defaultsValue:10,arr:[0,100]},
			            ]
			        }]
				}
		};
		page.setData(data);
		page.setOptions(op, "LIST", "Form", "list"); 
	}); 
});
