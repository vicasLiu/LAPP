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
						{type: 'back', text: '返回',show: true},
						{type: 'submit',text: '编辑',show: true}
					],
					events : {
			      		evt :{
			      			"click .back" : "backClick",
			      			"click .submit" : "editClik"
			      		},
			      		handle : {
			      			backClick : function(){
			      				page.back();
			      			},
			      			editClik : function(){
			      				op.Form.edit = "allEditors";
			      				$('.slider-container').remove();
			      				page.refresh("addShopForm",{
			      					edit : "allEditors"
			      				});
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
				buttonLayer: {
					show: true,
					id: 'btnLayer',
					render: "buttomRender",
					ele: [	 {
					            type: 'textIconUpLeft',  // text textIconUp(上) textIconRight(右) textIconBottom(下) textIconUpLeft(左)
					            id: 'textOnly0',
					            background : "#fff",
					            color : "#000",
					            fontSize : "14px",
					            iconSize : "16px",
					            iconColor : "#1AD15F",
					            icon : '2665',    // 字体图标
					            text: '同意'
					        },
					        {
					            type: 'textIconUpLeft',  // text textIconUp(上) textIconRight(右) textIconBottom(下) textIconUpLeft(左)
					            id: 'textOnly1',
					            background : "#fff",
					            color : "#000",
					            fontSize : "14px",
					            iconSize : "16px",
					            iconColor : "#478CD7",
					            icon : '2666',    // 字体图标
					            text: '回复'
					        },
					        {
					            type: 'textIconUpLeft',  // text textIconUp(上) textIconRight(右) textIconBottom(下) textIconUpLeft(左)
					            id: 'textOnly2',
					            background : "#fff",
					            color : "#000",
					            fontSize : "14px",
					            iconSize : "16px",
					            iconColor : "#F29823",
					            icon : '2667',    // 字体图标
					            text: '沟通'
					        },
					        {
					            type: 'textIconUpLeft',  // text textIconUp(上) textIconRight(右) textIconBottom(下) textIconUpLeft(左)
					            id: 'textOnly3',
					            background : "#fff",
					            color : "#000",
					            fontSize : "14px",
					            iconSize : "16px",
					            iconColor : "#5F5D5D",
					            icon : '2668',    // 字体图标
					        }
						],
						events : {
							evt : {
								"click #textOnly0" : "redClick",
								"click #textOnly1" : "greenClick"
							},
							handle : {
								redClick : function() {
									loading_div("正在提交...");
				                    // var dc = new DataCenter();
									 
				                    // dc.ajax({
				                    //      url :  url,
				                    //      data:{
				                    //       type : type,
				                    //       contentType : "application/x-www-form-urlencoded",
				                    //       param : param
				                    //     },
				                    //     callback : function(data){
				                    //         $("#ui-loader-verbose").remove();
				                    //         $(".ui-overlay-a").remove();
				                    //         if(typeof(callback) =="function"){
				                    //             callback(data);
				                    //         }
				                    //     }
				                    // });
								},
								greenClick : function() {
									alert("点击绿色按钮");
								}
							}
						}
				},
				Form: {
					show: true,
					render: 'locationListPage',
					id : "addShopForm",
					isHideTitle: [false,false,false],
					edit : 'notEdit',// 可以编辑全部(allEditors) 部分能编辑(partEditors) 全部不能编辑(notEdit)
					subId : ["listDataCp"],
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
			                // {id:"tel",label:'电话',labelCls:'',field:'fdsafdsa',type:'select',orderId:"orderId",groupId:"groupId",value: 'xixiix',edit:false,fn:function(data){
			                //     return "13333333333";
			                // }},
			                // {id:"add",label:'地址',labelCls:'',field:'field1',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: 'xixiix1',edit:true,fn:function(data){
			                //     // data.label = 132132;
			                //     return '联想大厦'
			                // }},
			                // {id:"switchBtn",label:'switchBtn',labelCls:'ga1',field:'address',type:'switchBtn',orderId:"address",groupId:"address",value: '牛',edit:true,arr: ['牛','X']},
			                // {id:"password",label:'password',labelCls:'ga',field:'address',type:'password',orderId:"orderId",groupId:"groupId",value: 'gaga',edit:true,placeholder: '请输入密码'},
			                {id:"addressSelect23",label:'姓名',labelCls:'ga',field:'name',type:'inputText',orderId:"orderId",groupId:"groupId",value: '张三',edit:true,placeholder: '请输入内容'},
			                {id:"addressSelect1",label:'进度',labelCls:'ga',field:'number',disable : false, type:'dragBar',orderId:"address",groupId:"address",value: 5,edit:true,defaultsValue:5,arr:[0,100],fn:function(){  
                            }},
			            ]
			        }]
				}
		};
		page.setData(data);
		page.setOptions(op, "LIST", "Form", "list"); 
	}); 
});
