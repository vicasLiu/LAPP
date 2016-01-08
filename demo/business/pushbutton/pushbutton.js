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
                      {"LAPP-header":{top: 0,height:50, show : true}},  
                       
                      {"buttonlayer-Page":{top: 0, height: $(window).height(), show : true}}
                ]
    		},
    		Toolbar: {
            	show: true,
                render: "LAPP-header",
                id : "toolbar",
                ele:[
                	 {type:'title',text: 'PushButton',show: true},
                	 {type: 'back', text: '返回',show: true} 
                	],
                events : {
                	evt : {
                		"click .back" : "back"
                	},
                	handle : {
                		back : function() {
                			page.back();
                		}
                	}
                },
            },
    		PushButton: {
				show: true,
				defualt : true,
				id: 'PushButton',
				render: "buttonlayer-Page",
				ele : [{
    				"text" : "照相",
    				fn : function() {
    					page.openCamera("photo");
    				}
    			}, {
    				"text" : "录像",
    				fn : function() {
    					page.openCamera("video");
    				}
    			}, {
    				"text" : "录音",
    				fn : function() {
    					page.openCamera("record");
    				}
    			}]
			}
		};
	    page.setOptions(op, "LIST", "buttonLayer", "list");
	});
});