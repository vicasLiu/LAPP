if(!LAPP){
	var LAPP = {};
};
var host = window.location.host;
LAPP["SERVERPATH"] = "http://test.kingnode.com:8280/Jersey_WebClient/restRequest.jsp";  
LAPP.PCAPI = {
	goPhoto : function ( arg ) {
		var json = JSON.parse(arg);
		var sCallback = json.sCallback;
		var jsonStr = '{"filePath":"001.jpg","fileData":"","fileName":"test","fileSize":"1024"}';
		LAPP.NativeCb.photoFinish(jsonStr);
	},
	goVideo : function( arg ) {
		navigator.webkitGetUserMedia({ "video": true }, function(stream){
			if(LAPP.Util.isFunction(arg.success)){
				arg.success(stream);
			}
		}, function() {
			if(LAPP.Util.isFunction(arg.error)){
				arg.error();
			}
		});
	},
	goRecord : function( arg ) {
		navigator.webkitGetUserMedia({ "audio": true }, function(stream){
			if(LAPP.Util.isFunction(arg.success)){
				arg.success(stream);
			}
		}, function() {
			if(LAPP.Util.isFunction(arg.error)){
				arg.error();
			}
		});
	},
	getLoginInfo : function( param ) {
		LAPP.NativeCb.setLoginInfo('{"userID" : "1213",  "loginName" : "LEO.FU",  "userName" : "付亮",  "roleType" : "manager"}');
		//var p = JSON.parse(param);
	},
	back : function() {
		
	},
	scan : function() {
		LAPP.NativeCb.openQcodeFinish('{"result" : "47P1Y2X"}');
	},
	getLocationInfo : function() {
		LAPP.NativeCb.setLocationInfo('{"lng" : "113", "lat" : "22", "address" : "深圳联想大厦"}');
	},
	getInputFieldHeight : function() {
		
	},
	getDistance : function() {
		LAPP.NativeCb.setDistanceFinish('[100,100,100,100,100]');
	},
	bcardScan : function() {
		return;
	},
	openPhoto : function( src ) {
		
	},
	openVideo : function( src ) {
		var htm = '<video src="'+src+'" controls="controls" autoplay="autoplay">您的浏览器不支持 video 标签。'+
				'</video>';
		$(htm).appendTo("body");
	},
	openRecord : function( src ) {
		var htm = '<audio src="'+src+'" controls="controls" autoplay="autoplay">您的浏览器不支持 audio 标签。'+
				'</audio>';
		$(htm).appendTo("body");
	},
	openUserDetail : function( type, empID ){
		alert("调用原生态，查看员工"+empID+"详情");
		//document.location.href = 'http://test.kingnode.com/portal/eam/communicate()';
	},
	goTo : function(){
		alert("打开沟通页面");
		//document.location.href = 'http://test.kingnode.com/portal/eam/communicate()';
	},
	openDocument : function(args){
		alert("打开附件" + args);
		//document.location.href = 'http://test.kingnode.com/portal/eam/communicate()';
	},
	downLoad : function( arg, name ) {
		
	},
	reqInterfaceProxy : function( arg ) {  //handleData
		arg = JSON.parse(arg);
		var url = arg["reqURL"]
			, param = arg["datas"]
			, scb = arg["sCallback"]
			, fcb = arg["fCallback"]
			, type = arg["reqType"] ? arg["reqType"] : "GET"
			;
		$.ajax({
			url : url,
			type : type,
			data : param,
			success : function( retData ) {
				LAPP.NativeCb.handleDataFinish(retData);
			},
			error : function() {
				LAPP.NativeCb.handleDataFinish({
					status : "error"
				});
			}
		});
	}
};