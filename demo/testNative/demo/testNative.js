"use strict";

$(function(){
	var page = new LAPP.Page();
	page.config({
		jsbase : '../../../',
		cssbase : '../../../'
	});
	window.imgcallback = function(json){
		//alert(json);
		//json = JSON.parse(json);
		var arg2 = json;
		arg2= (new Function("","return "+json))();
		//alert(0);
		var str ='<img style="width:98px;height:98px;" src="data:image/JPG;base64,'+ arg2.imgData +'" />';
		//alert(11);
		$("#imgRender").html(str);
		//alert(1);
		$("#imgRender").attr("data-src",arg2.imgPath);
		//alert(2);
	};
	window.radiocallback = function(json){
		json = JSON.parse(json);
		var str ='<img style="width:98px;height:98px;" src="data:image/JPG;base64,'+ json.pictureData +'" />';
		$("#radioRender").html(str);
		$("#radioRender").attr("data-src",json.videoPath);
	};
	window.recordercallback = function(json){
		json = JSON.parse(json);
		$("#recorderdom").show().attr("data-src",json.recordPath);
	};

	window.fromImgLibrarycallback = function(json){
		var arg2 = json;
		arg2= (new Function("","return "+json))();
		//alert(0);
		var str ='<img style="width:98px;height:98px;" src="data:image/JPG;base64,'+ arg2.imgData +'" />';
		//alert(11);
		$("#imgRender").html(str);
		//alert(1);
		$("#imgRender").attr("data-src",arg2.imgPath);
	};
	window.goUploadcallback = function(json){
		var arg2 = json;
		arg2= (new Function("","return "+json))();
		var str ='<img style="width:98px;height:98px;" src="http://203.195.129.229:8081/file?method=download&path=kuc&access_token=&stat=&version=&sha='+arg2.sha+'" />';
		$("#attachRender").html(str);
		$("#attachRender").attr("data-sha",arg2.sha);
		$("#attachRender").attr("data-type",arg2.type);
		$("#attachRender").attr("data-name",arg2.name);
		$("#attachRender").attr("data-size",arg2.size);

	};
	page.Ready(function( loginInfo ){
		var op = {
    		Layout : {
    			show : true,
    			render: "body",
	          	id : "layout1",
	          	ele:[
		            {"LAPP-header":{top: 0,height:50, show : true, animation : "slide"}},
		            {"attachparentRender":{top: 51,height:100, show : true, animation : "slide"}},
		            {"listPage": {top: 151,height: 'auto', show : true, animation : "slide"}}
	          	]
    		},
    		Toolbar: {
		      	show: true,
		        render: "LAPP-header",
		        id : "toolbar",
		        ele:[
		        	{type:'title',text: 'List',show: true},
				 	{type: 'back', text: '返回',show: true}
		      	]
	        },
			iScroll : {
				show : true,
				render : "listPage",
				id : "iScroll",
				subId: ['list2']
			},
			Panel : {
	            show : true,
	            id : "panel",
	            render : "attachparentRender",

	            ele :   '<div id="imgRender" style="position: relative;float:left; height: 98px;width:100px;"></div>'+
	                	'<div id="radioRender" style="position: relative;float:left; height: 100px;width:100px;"></div>'+
	                	'<div id="attachRender" style="position: relative;float:left; height: 100px;width:100px;"></div>',
	                	//'<div id="recorderRender" style="position: relative;float:left; height: 100px;width:100px;"><img id="recorderdom" src="btn_con_voice.png" style="width:100px;height:100px;display:none"/></div>',

	            events : {
		          evt : {
		            "click #imgRender" : "imgClick",
		            "click #radioRender" : "radioClick",
		            "click #recorderdom" : "recorderClick",
		            "click #attachRender" : "attachClick"
		          },
		          handle : {
		            imgClick : function(p){
		              var $this = $(p.current);
		              LAPP.NativeAPI.openPhoto({
		              	imgPath:$this.attr("data-src")
		              });
		            },
		            radioClick : function(p){
		              	var $this = $(p.current);
		              	LAPP.NativeAPI.openVideo({
				 			"videoPath":$this.attr("data-src")
				 		});
		            },
		            recorderClick : function(p){
		              var $this = $(p.current);
		              	LAPP.NativeAPI.openRecord({
				 			"recordPath":$this.attr("data-src")
				 		});	
		              
		            },
		            attachClick : function(p){
		            	var $this = $(p.current);
		            	var type = $this.attr("data-type");
		            	var vtype = "";
		            	if(type.toUpperCase()=="PNG"||type.toUpperCase()=="JPG"||type.toUpperCase()=="GIF"||type.toUpperCase()=="BMP"||type.toUpperCase()=="GIF"){
		            		vtype = "IMAGE"
		            	}else if(type.toUpperCase()=="AMR"||type.toUpperCase()=="WAV"||type.toUpperCase()=="AMR"||type.toUpperCase()=="AMR"){
		            		vtype = "AUDIO";
		            	}else if(type.toUpperCase()=="MP4"||type.toUpperCase()=="MOV"){
		            		vtype = "VEDIO";
		            	}else if(type.toUpperCase()=="TXT"){
		            		vtype = "TEXT";
		            	}else if(type.toUpperCase()=="DOC"||type.toUpperCase()=="DOCX"||type.toUpperCase()=="XLS"||type.toUpperCase()=="XLSX"||type.toUpperCase()=="PPT"||type.toUpperCase()=="PPTX"||type.toUpperCase()=="PDF"){
		            		vtype = "OFFICE";
		            	}else if(type.toUpperCase()=="HTML"||type.toUpperCase()=="JSP"||type.toUpperCase()=="PHP"||type.toUpperCase()=="ASP"||type.toUpperCase()=="ASPX"){
		            		vtype = "WEBSITE";
		            	}else if(type.toUpperCase()=="APK"||type.toUpperCase()=="PLIST"){
		            		vtype = "INSTALL";
		            	}else if(type.toUpperCase()=="ZIP"){
		            		vtype = "ZIP";
		            	}
				 		LAPP.NativeAPI.goDownload(page,{
					 		file:{
					 			"type": type,
					 			"sha": $this.attr("data-sha"),
					 			"status":"1",
					 			"endBack" : "2",
					 			"size":$this.attr("data-size"),
					 			"name":$this.attr("data-name"),
					 			"url":"http://203.195.129.229:8081/file?method=download&path=kuc&access_token=&stat=&version=&sha=D9F50BC7443D3C97EDF6F0BC0D99A379158CAD0B"
					 		},
					 		type : vtype
					 	});

		            }
		          }
		        }
            },
    		List: {
				show: true,
				id: 'list2',
				liHeight: 45,
				isLink: true,
				isEdit: false,
				isSelected: false,
				isMultiple: false,
				render: "listPage",
				data: [
					{test: '关闭页面', id:"goback"},
					{test: '测试拍照', id:"gophoto"},
					{test: '测试视频', id:"govideo"},
					{test: '测试录音', id:"gorecord"},
					{test: '测试相册', id:"openphoto"},
					{test: '测试日期时期', id:"godata"},
					{test: '测试二维码', id:"opencode"},
					{test: '测试通讯录', id:"openselUsers"},
					{test: '测试打电话', id:"openphone"},
					{test: '测试手机短信', id:"openmsg"},
					{test: '测试定位', id:"openlocationinfo"},
					{test: '测试代理请求', id:"goproxyrequest"},
					{test: '测试播放视频', id:"openVideo"},
					{test: '测试播放音频', id:"openRecord"},
					{test: '测试附件上传', id:"goUpload"},
					{test: '测试附件下载', id:"goDownload"}

				],
				events : {
					evt : {
						"click li" : "liClick"
					},
					handle : {
						liClick : function( p ) {
							var _this = p.current;
							var text = _this.text();
							switch( text.trim() ){
								case "关闭页面" : 
								    LAPP.NativeAPI.back();
								    break;
								case "测试拍照":
									LAPP.NativeAPI.goPhoto(page,{
										sCallback : "imgcallback" 
									});
									break;
								case "测试视频":
									LAPP.NativeAPI.goVideo(page,{
										sCallback : "radiocallback"

									});
									break;
								case "测试录音":
									LAPP.NativeAPI.goRecord(page,{
										sCallback : "recordercallback"
									});
									break;
								case "测试相册":
									LAPP.NativeAPI.fromImgLibrary(page, {
										"wDivisor":"180",
										"hDivisor":"180",
										"sCallback":"fromImgLibrarycallback"
									});
									break;
								case "测试日期时期":
									LAPP.NativeAPI.setLAPPTime({
									    "format": "yyyy-MM-dd HH:mm ",
									    "initDTime": "2015-01-06 14:50:00",
									    "tagID": "123",
									    "LAPPMinTime": "2014-01-06 14:50:00",
										"LAPPMaxTime": "2016-01-06 14:50:00"
									});
									break;
								case "测试二维码":
									LAPP.NativeAPI.scan(page);
									break;
								case "测试通讯录":
									LAPP.NativeAPI.selUsers(page);
									break;
								case "测试打电话":
									LAPP.NativeAPI.openPhone({phoneNum:"13577617211,13878782134"});
									break;
								case "测试手机短信":
									LAPP.NativeAPI.opneMsg({
									    to:"13711111111,138232123,231232213",
									    message:"ni hao"
									});
									break;
								case "测试定位":
									LAPP.NativeAPI.getQDLocationInfo(page);
									break;
								case "测试代理请求":
								 	LAPP.NativeAPI.handleData(page,{
							 		 	"reqURL": "http://202.104.137.173:10000/xsimple/api/v1/app/info",
									  	"datas": {"key":"04379556-4bdd-45da-b8ad-bdfa7acf7eab"},
									  	"reqType": "POST"
								 	});
								 	break;
								case "测试播放视频":
								 	LAPP.NativeAPI.openVideo({
								 		"videoPath":"/record/abc.wmv"
								 	});
								 	break;
								case "测试播放音频":
								 	LAPP.NativeAPI.openRecord({
								 		"recordPath":"/record/abc.wmv"
								 	});
								 	break;
								case "测试附件上传":
								 	LAPP.NativeAPI.goUpload(page,{
								 		filePath : $("#imgRender").attr("data-src"),//"/storage/sdcard0/Pictures/Screenshots/Screenshot_2014-10-13-18-14-03-686.png",
								 		url : "http://203.195.129.229:8081/file?method=upload&path=kuc&access_token=&stat=&version=",
								 		sCallback : "goUploadcallback"
								 	});
								 	break;
								case "测试附件下载":
								 	LAPP.NativeAPI.goDownload(page,{
								 		file:{
								 			"type":"jpg",
								 			"sha":"D9F50BC7443D3C97EDF6F0BC0D99A379158CAD0B",
								 			"status":"1",
								 			"endBack" : "2",
								 			"size":"12406",
								 			"name":"1418719907160.jpg",
								 			"url":"http://203.195.129.229:8081/file?method=download&path=kuc&access_token=&stat=&version=&sha=D9F50BC7443D3C97EDF6F0BC0D99A379158CAD0B"
								 		},
								 		type : "IMAGE"
								 	});
								 	break;

							}
						}
					}
				},
				clickFn : function( obj ) {
					console.info(obj);
				},
				divPosition:[
					{left: "10px", top: "-3px", dataFile : "test"}
				]
			}
		};
    	page.setOptions(op, "TestNative", "TestNative", "TestNative");
	});
});
