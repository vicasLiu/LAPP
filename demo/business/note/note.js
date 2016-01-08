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
                      {listPage:{top: 91,height: 'auto', show : true}}
                ]
    		},
    		Toolbar: {
            	show: true,
                render: "LAPP-header",
                id : "toolbar",
                ele:[
                	 {type:'title',text: 'Note',show: true} 
                	]   
            },
            Note : {
    //         	show : true,
				// render : "listPage",
				// id : "templet_detail_txt",
				// ele : "模版详情",
                id: 'select',
                render: 'listPage',
                singLine: false,
                height : "145px",
                isVoice : true,  // 是否需要语音录入
                placeholder: '带语音：请输入内容',
                cls: 'clsvoiceHas'
            }
		};
	    page.setOptions(op, "LIST", "Menu", "list");
	});
});