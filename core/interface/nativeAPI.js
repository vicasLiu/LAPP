if(!LAPP){
	var LAPP = {};
};
(function() {
	var $pointer = null,
		nativaCbobj = {},
		NativeAPI = null,
		Native = {},
		dataInst = null,
		dataFinishedCb = null,
		type = LAPP.Util.getDevice().toUpperCase();

	LAPP.NativeCb = {
		setLoginInfo : function( o ) {
			o = JSON.parse( o );
			LAPP.Publisher.publish("getLoginFinish",  o, $pointer);
		},
		setLocationInfo : function( o ) {
			window.localStorage.setItem("location", o);
			nativaCbobj = JSON.parse(o);
			LAPP.Publisher.publish("getLocationFinish",  nativaCbobj, $pointer);
		},
		openQcodeFinish : function( qcode ){
			qcode = JSON.parse(qcode);
			nativaCbobj = qcode;
			LAPP.Publisher.publish("scanFinished", nativaCbobj, $pointer);
		},
		openQcodeFailed : function(str){

		},
		selUsersFinish : function( json ) {
			var jn = JSON.parse(json);
			nativaCbobj = jn;
			LAPP.Publisher.publish("selUsersFinish", nativaCbobj, $pointer);
		},
		photoFinish : function ( json ){
			json = JSON.parse(json);
			nativaCbobj = {
				filePath : json.imgPath,
				fileData : json.imgData,
				fileName : json.imgName,
				fileSize : json.size,
				type : "image/pjpeg"
			};

			LAPP.Publisher.publish("attachFinish", nativaCbobj, $pointer);
		},
		videoFinish : function( json ) {
			json = JSON.parse(json);
			nativaCbobj = {
				filePath : json.videoPath,
				fileData : json.pictureData,
				fileName : json.videoName,
				fileSize : json.videoSize,
				type : "video/quicktime"
			};
			LAPP.Publisher.publish("attachFinish", nativaCbobj, $pointer);
		},
		recordFinish : function( json ) {
			json = JSON.parse(json);
			nativaCbobj = {
				filePath : json.recordPath,
				fileSize : json.recordSize,
				fileName : json.recordName,
				type : "application/octet-stream"
			};
			LAPP.Publisher.publish("attachFinish", nativaCbobj, $pointer);
		},
		downLoadFinish : function( str ) {
			// nativaCbobj = {
			// 	filePath : filePath,
			// 	fileData : fileData,
			// 	fileName : fileName,
			// 	type : fileType
			// };
			nativaCbobj = JSON.parse(str);
			LAPP.Publisher.publish("downLoadFinish", nativaCbobj, $pointer);
		},
		locationFinish : function( str ) {
			nativaCbobj = JSON.parse(str);
			LAPP.Publisher.publish("locationFinish", nativaCbobj, $pointer);
		},
		locationFailed : function( str ) {
			nativaCbobj = JSON.parse(str);
			LAPP.Publisher.publish("locationFailed", nativaCbobj, $pointer);
		},
		getLAPPTimeFinish : function(str){
			
		},
		handleDataFinish : function(retData){
			if( !LAPP.Util.isObject(retData) ) {
				retData = JSON.parse(retData);
			}
			dataFinishedCb(retData);
		},
		handleDataFailed : function(str){
			
		},
		goUploadFinish : function(str){
			
		},
		goUploadFailed : function(str){
			
		},
		cloundVolFinish : function( volString ) {
			nativaCbobj =  JSON.parse(volString);;
			LAPP.Publisher.publish("cloundVolFinish", nativaCbobj, $pointer);
		},
		cloundVolFailed : function( volString ) {
			 
		},
		loginPage : function() {

		}
	};
	var apiType = type+"API";
	NativeAPI = LAPP[apiType];
	Native.API = {
		setDataControl : function( dataControl ) {
			dataInst = dataControl;
		},
		getLoginInfo : function( pointer, arg ) {
			$pointer = pointer;
			var json = $.extend(true, {}, {
				sCallback : 'LAPP.NativeCb.setLoginInfo'
			}, arg);
			json = JSON.stringify(json);
			NativeAPI.getLoginInfo(json);
		},
		handleData : function( arg ) {
			var url = arg["url"]
				, param = arg["data"]
				, handleType = arg["handleType"] ? arg["handleType"] : "req"
				, type = arg["type"] ? arg["type"] : "GET"
				, name = "LAPP.NativeCb.handleDataFinish"
				;
			dataFinishedCb = arg["cb"];
			switch( handleType ) {
				case "req":
					this.reqInterfaceProxy({
						reqURL : url,
						reqType : type,
						datas : param,
						sCallback : name,
						fCallback : name
					});
					break;
				case "download":
					var file = $.extend(true, {}, {
						url : url
					}, param);
					var json = {
						url : url,
						file : file,
						endBack : 2,
						type : "",
						sCallback : name,
						fCallback : name
					};
					this.goDownload(json);
					break;
				case "upload" : 
					var json = $.extend(true, {}, {
						url : url,
						filePath : "",
						datas : "",
						sCallback : name,
						fCallback : name
					}, param);
					this.goUpload(json);
					break;
			}
		},
		reqInterfaceProxy : function( arg ) {
			var json = JSON.stringify(arg);
			if( dataInst != null ) {
				dataInst.reqInterfaceProxy(json);
			}else{
				NativeAPI.reqInterfaceProxy(json);
			}
		},
		back : function() {
			NativeAPI.goNative();
		},
		goPhoto : function( pointer, arg ) {
			$pointer = pointer;
			var json = $.extend(true, {}, {
				backType: 3,
			    sCallback : 'LAPP.NativeCb.photoFinish'
			}, arg);
			json = JSON.stringify(json);
			NativeAPI.goPhoto(json);
		},
		goVideo : function( pointer, arg ) {
			$pointer = pointer;
			var json = $.extend(true, {}, {
				backType: 2,
				maxTime : 10,
			    sCallback : 'LAPP.NativeCb.videoFinish'
			}, arg);
			json = JSON.stringify(json);
			NativeAPI.goPhotograph(json);
		},
		goRecord : function( pointer, arg ) {
			$pointer = pointer;
			var json = $.extend(true, {}, {
				sCallback : 'LAPP.NativeCb.recordFinish'
			}, arg);
			json = JSON.stringify(json);
			NativeAPI.goRecord(json);
		},
		openRecord : function( json ) {
			json = JSON.stringify(json);
			NativeAPI.openRecord(json);
		},
		openVideo : function( json ) {
			json = JSON.stringify(json);
			NativeAPI.openVideo(json);
		},
		openPhoto : function( json ) {
			json = JSON.stringify(json);
			NativeAPI.openPhoto(json);
		},
		fromImgLibrary : function( pointer, arg ) {
			$pointer = pointer;
			var json = $.extend(true, {}, {
				backType: 3,
			    sCallback : 'LAPP.NativeCb.photoFinish'
			}, arg);
			json = JSON.stringify(json);
			NativeAPI.fromImgLibrary(json);
		},
		setLAPPTime : function( arg ) {
			var json = $.extend(true, {}, {
				format: "yyyy-MM-dd HH:mm",
			    sCallback : 'LAPP.NativeCb.getLAPPTimeFinish'
			}, arg);
			json = JSON.stringify(json);
			NativeAPI.setLAPPTime(json);
		},
		scan : function ( pointer, arg ) {
			$pointer = pointer;
			var json = $.extend(true, {}, {
			    sCallback : 'LAPP.NativeCb.openQcodeFinish',
			    fCallback : 'LAPP.NativeCb.openQcodeFailed'
			}, arg);
			json = JSON.stringify(json);
			NativeAPI.openQcode(json);
		},
		selUsers : function( pointer, arg ) {
			$pointer = pointer;
			var json = $.extend(true, {}, {
			    type : 'single',
			    initUsers : [],
			    sCallback : 'LAPP.NativeCb.selUsersFinish'
			}, arg);
			json = JSON.stringify(json);
			NativeAPI.selUsers(json);
		},
		openPhone : function( json ) {
			json = JSON.stringify(json);
			NativeAPI.openPhone(json);
		},
		opneMsg : function( json ) {
			json = JSON.stringify(json);
			NativeAPI.opneMsg(json);
		},
		getLocationInfo : function( pointer, arg ) {
			$pointer = pointer;
			var json = $.extend(true,{},{
				sCallback: 'LAPP.NativeCb.locationFinish',
				fCallback: 'LAPP.NativeCb.locationFailed'
			},arg);
			json = JSON.stringify(json);
			NativeAPI.getQDLocationInfo(json);
		},
		goUpload : function( arg ) {
			var json = JSON.stringify(arg);
			NativeAPI.goUpload(json);
		},
		goDownload : function( arg ) {
			var json = JSON.stringify(arg);
			NativeAPI.goDownload(json);
		},
		openFile : function( pointer, arg ) {
			$pointer = pointer;
			var json = $.extend(true,{},{
				type: '',
				fileName : '',
				fileID : '',
				filePath : ''
			},arg);
			json = JSON.stringify(json);
			NativeAPI.openFile(json);
		},
		browseImages : function( arg ) {
			var json = JSON.stringify(arg);
			NativeAPI.browseImages(json);
		},
		cloundVol : function(arg){
			NativeAPI.cloundVol({
				"sCallback":"LAPP.NativeCb.cloundVolFinish",
				"fCallback":"LAPP.NativeCb.cloundVolFailed"
			});
		},
		showSiteMap : function( json ) {
			var str = JSON.stringify(json);
			NativeAPI.showSiteMap(str);
		},
		goNavigation : function( json ) {
			var str = JSON.stringify(json);
			NativeAPI.goNavigation(str);
		},
		toUrl : function( json ) {
			var str = JSON.stringify(json);
			NativeAPI.toUrl(str);
		},
		showAlert : function( json ) {
			var str = JSON.stringify(json);
			NativeAPI.showAlert(str);
		},
		setDot : function( json ) {
			var str = JSON.stringify(json);
			NativeAPI.setDot(str);
		},
		goBack : function() {
			NativeAPI.goBack();
		},
		goLogin : function(arg) {
			var json = $.extend(true,{},{
				'sCallback': 'LAPP.NativeCb.loginPage',
				'params' : {}
			},arg);
			var str = JSON.stringify(json);
			NativeAPI.goLogin(str);
		}
	};
	LAPP.NativeAPI = Native.API;
}());