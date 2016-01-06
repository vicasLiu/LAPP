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
				url : "Jersey_WebClient/restRequest.jsp",
				service : "XEAM_INT_PKG"
				};
		var op = {
			Layout : {
				show : true, 
				render: "body",
				id : "layout1",
				ele:[
					{"LAPP-header":{top: 0,height:50, show : true, animation : "slide"}},
					{panelPage:{top: 51,height:39,show: true}},
					 
				]
			},
			Toolbar: {
				show: true,
				render: "LAPP-header",
				id : "toolbar",
				ele:[
				
					{type:'title', text: 'form',show: true},
					{type: 'back', text: '返回',show: true}
				],
				events : {
		      		evt :{
		      			"click .back" : "backClick"
		      		},
		      		handle : {
		      			backClick : function(){
		      				page.back();
		      			}
		      		}

		      	}
			},
			iScroll : {
				show : true,
				render : "panelPage",
				id : "iScroll",
				subId : "addShopForm"
			},
			Panel : {
                show : true,
                id : "panel",
                render : "panelPage",

                ele :   '<div id="noteRender" style="position: relative; height: auto;"></div>'+
                    	'<div id="attachRender" style="position: relative; height: auto;"></div>'
            },
            Note : {
        	 	id: 'select',
                render: 'noteRender',
                singLine: false,
                height : "145px",
                isVoice : true,  // 是否需要语音录入
                placeholder: '带语音：请输入内容',
                id: 'voiceHas1',
                cls: 'clsvoiceHas'
            },
            Attach : {
            	show : true,
		        editable : true,
		        isIscroll : true, // 是否需要滚动(即是单行显示)
		        render: "attachRender",
		        id : 'attach2',
		        number:3,
                data : [
                	 {
			            filePath : "../../../images/pic/pic_xisha.jpg",
			            data : "",
			            type : "image"      // 图片
			        },
			        {
			            filePath : "../../../images/pic/pic_xisha.jpg",
			            data : "",
			            type : "video"    // 视频
			        },
			        {
			            filePath : "../../../images/pic/pic_xisha.jpg",
			            data : "",
			            type : "audio"      // 音频
			        },
			        {
			            filePath : "../../../images/pic/pic_xisha.jpg",
			            data : "",
			            type : "audio"      // 音频
			        }
				],
    			events : {
					el : "#attach2",
					evt : {
						"click .icon-add" : "add"
					},
					handle : {
						add : function( p ) {
							$("#PushButton").show();
						}
					}
				}

            },
            PushButton: {
				show: false,
				defualt : true,
				id: 'PushButton',
				render: "body",
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
    			}],
    			cb : function(){
    				$("#PushButton").hide();
    			}
			}
		};
		page.setData(data);
		page.setOptions(op, "LIST", "Form", "list"); 
	}); 
});
