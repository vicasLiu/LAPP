$(function(){
	var page = new LAPP.Page();
	page.config({
		jsbase : '../../../',
		cssbase : '../../../' 
	});
	page.Ready(function( loginInfo ){
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
		                {id:"pro",label:'省份',field:'pro',type:'select',orderId:"address",edit:false,groupId:"address"},
		                {id:"city",label:'城市',field:'add',type:'select',orderId:"address",groupId:"city"},
		                {id:"sta",label:'状态',field:'sta',type:'select',orderId:"address",groupId:"sta"},
		            ]
		        }]
			}
		};
		page.setOptions(op, "search", "搜索界面", "search"); 
	}); 
});
