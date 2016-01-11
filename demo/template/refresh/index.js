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
			url : "data.json"
		};
		var op = {
			DataCP : {
    			show : true,
    			id : "listDataCp",
    			subId : ["addShopForm"],
    			dataParam : {
	  				
    			}
    		},
			Layout : {
				show : true, 
				render: "body",
				id : "layout1",
				ele:[
					{"LAPP-header":{top: 0,height:50, show : true, animation : "slide"}},
					{"basicFormPage":{top: 51,height:100, show : true, animation : "slide"}},
					{"tab-page":{top: 200,height:40, show : true, animation : "slide"}},
					{"panelPage":{top: 301,height: $(window).height()-101, show : true}},
					{"buttonLayerPage": {bottom: 0,height: 50, show : true, animation : "slide"}}
				]
			},
			Toolbar: {
				show: true,
				render: "LAPP-header",
				id : "toolbar",
				ele:[
					{type:'title', text: '',show: true},
					{type: 'back', text: '返回',show: true},
					{type: 'submit',text: '编辑',show: true}
				]
			},
			Tab: {
				show: true,
				id: 'tab',
                height : '40px',
				render: 'tab-page',
				ele: [ 
                    {key:"a",value:"未处理",status:true},
                    {key:"b",value:"已处理",status:false},
                    {key:"c",value:"处理中",status:false}
                ],
                events : {
                	evt : {
                		"click a" : "tabClick"
                	},
                	handle : {
                		"tabClick" : function() {
                			page.triggleEvent("triggleButtonLayer", "show");
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
			Panel : {
				show : true,
				id : "panel",
				render : "panelPage",
				ele :  '<div id="detailForm" style="position: relative; height: auto;"></div>'+
                       '<div id="attachRender" style="position: relative; height: auto;"></div>'
			},
			Form : [{
				show : true,
				render : "basicFormPage",
				id : "basicForm",
				edit : "notEdit",
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
		                {id:"switchBtn",label:'开关',labelCls:'ga1',field:'btnVal',type:'switchBtn',orderId:"address",groupId:"address",edit:true,arr: ['开','关'],fn:function(){}}
		            ]
		        }]
			},{
				show: true,
				render: 'detailForm',
				id : "addShopForm",
				isHideTitle: [false,false,false],
				edit : 'allEditors',// 可以编辑全部(allEditors) 部分能编辑(partEditors) 全部不能编辑(notEdit)
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
		                {id:"addressSelect1",label:'进度',labelCls:'ga',field:'process',disable : false, type:'dragBar',orderId:"address",groupId:"address",value: '10',edit:true,defaultsValue:10,arr:[0,100],fn:function(){  
                        }},
		            ]
		        }]
			}],
			buttonLayer: {
				show: true,
				id: 'btnLayer',
				render: "buttonLayerPage",
				defaultShow : false,
				ele: [{
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
		        }],
				events : {
					evt : {
						"click #textOnly0" : "redClick",
						"click #textOnly1" : "greenClick"
					},
					handle : {
						redClick : function() {
							
						},
						greenClick : function() {
							
						}
					}
				}
			}
		};
		page.setData(data);
		page.setOptions(op, "refresh", "Refresh", "refresh"); 
	}); 
});