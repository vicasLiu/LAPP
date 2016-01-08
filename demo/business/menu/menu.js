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
                      {listPage:{top: 91,height: 'auto', show : true, animation : "slide"}}
                      
                ]
    		},
    		Toolbar: {
            	show: true,
                render: "LAPP-header",
                id : "toolbar",
                ele:[
                	   {type:'title',text: 'Menu',show: true},
                       {type: 'back', text: '返回',show: true}
                	]   
            },
    		iScroll : {
    			show : true,
    			render : "listPage",
    			id : "iScroll",
    			subId: ['list2'] 
    		},
			Menu: {
				show: true,
                render: 'body', 
                id: 'menu',
                cls : 'LAPP-component-up-dow-columns',
                ele: [
                    {cls: 'icon1', text: '扫描',value: '1234',defaultSelect:true},
                    {cls: 'icon2',text: '还是扫描',value: '123',fn:function(val){alert(val)}},
                    {cls: 'icon3',text: '依旧扫描',value: '1235'}
                ],
                divStyle:'right:5px;top:50;',
                events : {
                    el : "#menu",
                    evt : {
                        "click .icon1" : "scan"
                    },
                    handle : {
                        scan : function( p ) {
                            alert(p.current.text());
                        }
                    }
                }
			}
		};
	    page.setOptions(op, "LIST", "Menu", "list");
	});
});