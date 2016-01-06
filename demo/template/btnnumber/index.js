"use strict";

$(function(){
	var page = new LAPP.Page();
	page.config({
		base : '../../../../APP/',
		jsbase : '../../../',
		cssbase : '../../../'
	});
	page.Ready(function( loginInfo ){
		var _wid = $(window).width(),
    		_wid2 = (_wid/2 - 37)+'px',
    		_wid4 = (_wid/4 - 31)+'px';
		var op = {
			Layout : {
				show : true,
				render: "body",
				id : "layout1",
				ele:[
					{"LAPP-header":{top: 0,height:50, show : true, animation : "slide"}},
					{"PanelRender": {top: 51,height: 'auto', show : true, animation : "slide"}},
					{"listPage11": {top: 51,height: 'auto', show : true, animation : "slide"}},
					{"listPagexx":{top: 151,height: 'auto', show : true, animation : "slide"}}
				]
			},
			Toolbar: {
				show: true,
				render: "LAPP-header",
				id : "toolbar",
				ele:[
					{type:'title',text: 'BtnNumber',show: true},
					{type:'back',text: '返回',show: true}
				],
				events : {
			          evt : {
			            "click .back" : "BackFn"
			          },
			          handle : {
			          		BackFn : function(){
			          			page.back();
			          		}
			          }
				}
			},
			ListLoading: {
				show: true,
				id: 'listLoading',
				render : "listPage11",
				containerId: 'containDiv',
				subId: ["listDataCp", "list2"]
			},
    		List: {
				show: false,
				id: 'list2',
				liHeight: 45,
				subId : ["listDataCp","listLoading"],
				render: "containDiv",
				// dbData : "data",
				data: [
					{USER_NAME: 'one'},
					{USER_NAME: 'two'},
					{USER_NAME: 'three'},
					{USER_NAME: 'four'}
				],
				divPosition:[
					{left: "10px", top: "-3px", dataFile : "USER_NAME"}
				],
				events : {
			          evt : {
			            "click li" : "liClick"
			          },
			          handle : {
			          		liClick : function(){
			          			page.setOptions(aa, "aa", "aa", "aa");
			          		}
			          }
				}
			}
		};
		var aa = {
			// Panel : {
			// 	id:'panel',
			// 	render : 'PanelRender',
			// 	ele : '<div id="PanelRender"></div>'
			// },
			BtnNumber: [
				{
					render: "PanelRender",
					id : "btnnumber1",
			        value : '100' ,
			        // wid : ($(window).width() * 0.8),     // 获取render容器的宽度 如果为空或者不设置 则为window宽度的80%
			        text : '元' , 
			        addMunber : 1, // 增量
			        placeholder : '按钱充电',
			        isSelect : true   // 是否默认选中
				},
				// {
				// 	render: "PanelRender",
				// 	id : "btnnumber2",
			 //        value : '100' , 
			 //        text : '毛' , 
			 //        addMunber : 1, // 增量
			 //        placeholder : '安格',
			 //        isSelect : true   // 是否默认选中
				// }
			]
		}
		page.setOptions(op, "LIST", "List", "list");
	});
});
