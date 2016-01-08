
/*
 * index
 *
 *  Created by suchiva on 2014-10-22.
 *  Copyright (c)  __MyCompanyName__. All rights reserved.
 */
"use strict";

$(function () {

	var page = new LAPP.Page;

	page.config({
		jsbase : '../../../',
		cssbase : '../../../'
	});

	page.Ready(function (loginInfo) {
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
    			subId : "list2",
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
		            {"listPage": {top: 51,height: 'auto', show : true, animation : "slide"}}

	          	]
    		},
    		Toolbar: {
		      	show: true,
		        render: "LAPP-header",
		        id : "toolbar",
		        ele:[
		        	 {type:'title',text: 'confirm',show: true},
					 {type: 'back', text: '返回', show: true}
		      	],
				events: {
					evt: {
						'click .submit': 'submitFn',
						'click .back': 'backFn'
					},
					handle: {
						submitFn: function () {
							LAPP.Toast.trigger('default', 'testToast');
						},
						backFn: function () {
							LAPP.Toast.trigger('error', 'hello');
						}
					}
				}
        	},
			Dialog: {
				show:true,
		        render: 'body',
		        id: 'confirm',
		        widgetType : "confirm",
		        title: '这里是title',
		        text: '这里是弹出框的内容',
		        button: ['确定','取消'],
		        events : {
		        	evt : {
		        		"click .confirm-btn" : "confirmClick"
		        	},
		        	handle : {
		        		confirmClick : function(){
		        			alert(1);
		        		}
		        	}
		        }
			}


		};
		page.setData(data);
    	page.setOptions(op, "LIST", "List", "list");

	});
});
