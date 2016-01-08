
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
		        	 {type:'title',text: 'Alert',show: true},
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
				show: true,
				id: 'LAPP-toast',
				render: 'body',
				widgetType : "alert",
				type: 'normal',
				title: '这里是title',
		        text: '这里是弹出框的内容',
		        button: '确定',
		        events : {
		        	evt : {
		        		"click .confirm-btn" : "confirmClick"
		        	},
		        	handle : {
		        		confirmClick : function(){
		        			//alert(1);
		        			 
		        		}
		        	}
		        }
			}


		};
		 
    	page.setOptions(op, "LIST", "List", "list");

	});
});
