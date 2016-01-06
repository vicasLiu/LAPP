$(function(){
	var page = new LAPP.Page();
	page.config({
		base : '../../../../APP/',
		jsbase : '../../../',
		cssbase : '../../../' 
	});
	page.Ready(function(){
		var op = {
			DataCP : {
    			show : true,
    			id : "listDataCp",
    			subId : ["addShopForm"],
    			common : {
    				url : "data.json"
    			},
    			dataParam : {
	  				
    			}
    		},
			Layout : {
				show : true, 
				render: "body",
				id : "layout1",
				ele:[
					{"LAPP-header":{top: 0,height:50, show : true, animation : "slide"}},
					{"panelPage":{top: 51,height: $(window).height()-101, show : true}},
					{"buttonlayer-Page":{top: 0, height: $(window).height(), show : true}}
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
			Attach : [{
				show : true,
		        editable : true,
		        isIscroll : true, 
		        render: "panelPage",
		        id : 'attach2',
		        subId : ["listDataCp"],
		        number : 3,
		        dbData : "data"
			}],
			PushButton: {
				show: false,
				defualt : true,
				id: 'PushButton',
				render: "buttonlayer-Page",
				subId : "attach2",
				ele : [{
    				"text" : "照相"
    			}, {
    				"text" : "录像"
    			}, {
    				"text" : "录音"
    			}],
    			events : {
    				evt : {
    					"click dd" : "ddClick"
    				},
    				handle : {
    					ddClick : function() {
    						page.openCamera("photo");
    					}
    				}
    			},
    			cb : function(){
    				$("#PushButton").hide();
    			}
			} 
		};
		page.setOptions(op, "refresh", "Attach", "refresh"); 
	});
});