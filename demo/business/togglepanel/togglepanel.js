$(function(){
	var page = new LAPP.Page();
	page.config({
		base : '../../../../APP/',
		jsbase : '../../../',
		cssbase : '../../../'
	});
	page.Ready(function( loginInfo ){
		var data = {
   			type : "rest",
   			to : "EBS",
   			url : "togglePanel.json",
   			service : "XEAM_INT_PKG"
        };
		var op={
			DataCP : {
    			show : true,
    			id : "listDataCp",
    			subId : ["togglePaneldemo"],
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
			Layout: {
                 show: true,
                 render: "body",
                 id : "layout1",
                 ele:[ 
                     {"LAPP-header":{top: 0,height:50, show : true}},
                     {mapPage:{top: 51,height:'auto', show : true, animation : "slide"}}
                 ]
            },
            Toolbar: {
               	 show: true,
                 render: "LAPP-header",
                 id : "toolbar",
                 ele:[{type: 'back', text: '返回',show: true},
                      {type:'title',text: 'TogglePanel',show: true}]
            },
            iScroll : {
				show : true,
				render : "mapPage",
				id : "iScroll",
				subId: ['togglePaneldemo']
			},
            TogglePanel: {
        		show : true,
				render : 'mapPage',
				id : 'togglePaneldemo',
				isSelect : true,
				isCollapse : true,
				isScroll: true,
				dbData : "formData",
				subId : ["iScroll","listDataCp"],
				data: [
					{
						title : {key:'gaga',value:'货物详情1'},  // key值为数据库传过来的值 如果为空则取value的值
						show : true, // 是否默认显示
						toggleLi : [
							{label : '问题描述0',labelIcon : '',dataFile : 'textRight0'},
							{label : '问题描述1',labelIcon : '',dataFile : 'textRight1'}
						]
					},
					{
						title : {key:'gaga',value:'货物详情2'},
						show : false, // 是否默认显示
						toggleLi : [
							{label : '问题描述2',labelIcon : 'icon_wt',dataFile : 'textRight2'},
							{label : '问题描述3',labelIcon : 'icon_us',dataFile : 'textRight3'}
						]
					}
				],
				formData : {
			        title :[
			        	{gaga:'togglepanel'},
			        ],
			        toggleLi : [
			        	{textRight0 : '154.00个',textRight1 : '1454.00个'},
			        	{textRight2 : '4.00个',textRight3 : '14.00个'},
			        ]
			    },
			    events : {
                    evt : {
                        "click .LAPP-togglepanel-dl>dt" : "collapseDotClick"
                    },
                    handle : {
                        "collapseDotClick" : function( p ) {
                          // alert(1);
                        }
                    }
				}
            }
		}
		page.setData(data);
		page.setOptions(op,'Progressbar','Progressbar');
	});
});