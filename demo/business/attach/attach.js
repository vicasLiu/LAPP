"use strict";
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
			url : "attach.json",
			service : "XEAM_INT_PKG"
		};
		var op={
			
			list : {
				DataCP : {
	    			show : true,
	    			id : "listDataCp",
	    			subId : ["attach2"],
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
	                     	{attach:{top: 51,height:128, show : true, cls : "attach", animation : "slide"}}
	                     ]
                },
                Toolbar: {
	               	 show: true,
	                 render: "LAPP-header",
	                 id : "toolbar",
	                 ele:[{type: 'back', text: '返回',show: true},
	                      {type:'title',text: 'Attach',show: true}]
                },
                Attach : {
                    show : true,
			        editable : true,
			        isIscroll : true, // 是否需要滚动(即是单行显示)
			        render: "attach",
			        id : 'attach2',
			        subId : ["listDataCp"],
			        number : 3,
			        dbData: "data",
     //                data : [
     //                	 {
				 //            filePath : "../../../images/pic/pic_xisha.jpg",
				 //            data : "",
				 //            type : "image"      // 图片
				 //        },
				 //        {
				 //            filePath : "../../../images/pic/pic_xisha.jpg",
				 //            data : "",
				 //            type : "video"    // 视频
				 //        },
				 //        {
				 //            filePath : "../../../images/pic/pic_xisha.jpg",
				 //            data : "",
				 //            type : "audio"      // 音频
				 //        },
				 //        {
				 //            filePath : "../../../images/pic/pic_xisha.jpg",
				 //            data : "",
				 //            type : "audio"      // 音频
				 //        }
				     
					// ],
        			events : {
						el : "#attach2",
						evt : {
							"click .icon-add" : "add"
						},
						handle : {
							add : function( p ) {
								page.openCamera("photo");
							}
						}
					}
        		}

			}
		}
		page.setData(data);
		page.setOptions(op.list,'Form','Attachdemo');
	});
});