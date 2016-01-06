"use strict";

$(function(){
	var page = new LAPP.Page();
	page.config({
		base : '../../../../APP/',
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
					{"listPage": {top: 51,height: 'auto', show : true, animation : "slide"}}
				]
			},
			Toolbar: {
				show: true,
				render: "LAPP-header",
				id : "toolbar",
				ele:[
					{type:'title',text: 'Button',show: true},
					{type:'back',text: '返回',show: true}
				]
			},
			buttonLayer: {
				show: true,
				id: 'btnLayer',
				render: "listPage",
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
								alert("点击红色按钮");
							},
							greenClick : function() {
								alert("点击绿色按钮");
							}
						}
					}
			}
		};
		page.setOptions(op, "LIST", "List", "list");
	});
});
