$(function(){
	var page = new LAPP.Page();
	page.config({
		jsbase : '../../../',
		cssbase : '../../../'
	});
	page.Ready(function( loginInfo ){
		var data = {
   			type : "rest",
   			to : "EBS",
   			url : "organpanel.json",
   			service : "XEAM_INT_PKG"
        };
		var op={
			DataCP : {
    			show : true,
    			id : "listDataCp",
    			subId : ["OrganPaneldemo"],
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
            OrganPanel: {
            		show : true,
					render : 'mapPage',
					id : 'OrganPaneldemo',
					isSelect : true,
					isCollapse : true,
					isScroll: true,
					dbData : "formData",
					subId : ["listDataCp"],
					data: {
						title : {key:'title11',value:'标题1111111'},
						show : 'allShow', // 全部显示(allShow) 按照配置显示(partShow) 全部不显示(notShow)  默认不设置则全部不显示
			            data : [
			                {field : 'textlabel'},     // 第一个是设置label
			                {field : 'textRight'}
			            ]
					},
					formData : [
				        {
				            title1:'数据标题1',
				            show : true, // 是否默认显示
				            data : [
				                {textRight:"2014-12-26 16:06:19",textlabel:'企业111111111111',cls:"icon_wt"}, // 数据里的cls主要为了可以设置小图标
				                {textRight:"2014-12-26 16:06:19",textlabel:'企业2',cls:'icon_us'},
				                // {textRight:"2014-12-26 16:06:19",textlabel:'企业3'}
				            ]
				        },
				        {
				            title1:'数据标题2',
				            show : true, // 是否默认显示
				            data : [
				                {textRight:"2014-12-26 16:06:19",textlabel:'企业1111'}
				            ]
				        }
				    ]
            }
		}
		page.setData(data);
		page.setOptions(op,'Progressbar','Progressbar');
	});
});