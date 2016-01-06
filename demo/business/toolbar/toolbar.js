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
                      {"LAPP-header":{top: 0,height:50, show : true, animation : "slide"}}
                ]
    		},
            Toolbar: {
                show: true,
                render: "LAPP-header",
                id : "toolbar",
                ele:[

                    {type: 'back', text: '返回',show: true},
                    {type:'title',text: 'toolbar',show: true}
                ],
                events: {
                    evt: {
                        'click .back': 'fn1'  
                    },
                    handle: {
                        fn1 : function(){
                            alert(page.back());
                        }
                    }
                }
            }
		};
	 page.setOptions(op, "LIST", "Toolbar", "list");
	});
});