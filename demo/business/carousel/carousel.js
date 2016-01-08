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
   			url : "list.json",
   			service : "XEAM_INT_PKG"
        };
		var op = {
			Layout : {
				show : true,
				render: "body",
				id : "layout1",
				ele:[
					{"LAPP-header":{top: 0,height:50, show : true, animation : "slide"}},
					{locationListPage:{top: 51,height: 'auto', show : true}}
				]
			},
			Toolbar: {
				show: true,
				render: "LAPP-header",
				id : "toolbar",
				ele:[
					{type:'title', text: 'Carousel',show: true},
					{type: 'btn', text: '返回',show: true}
					]
			},
			DataCP : {
    			show : true,
    			id : "listDataCp",
    			subId : ["carousel"],
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
			Carousel: {
				show:  true,
				render: 'locationListPage',
				autoPlay : false,
				subId : ["listDataCp"],
				id: 'carousel',
				dbData : 'data',
				adpter : function(data){
					return data.data;
				},
				// data : [  
					// {href:'',imgUrl : "carousel.jpg",els:"img1"},
    				// {href:'',imgUrl : "carousel.jpg"},
    				// {href:'',imgUrl : "carousel.jpg"}
    			// ],
    			events : {
					el : "#carousel",
					evt : {
						"click .img1" : "imgClick"
					},
					handle : {
						imgClick : function( p ) {
							var imglist = p.current;
							console.log(1)
						}
					}
				}
			}
		};
		page.setData(data);
		page.setOptions(op, "LIST", "Form", "list");
	});
});
