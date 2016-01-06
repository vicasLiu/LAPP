if(!LAPP){
	var LAPP = {};
};
LAPP.IOSAPI = {
	__nativeAPI : function( fun, str ) {
		var fn = '';
		if( str != undefined ) {
			fn = fun + '(' + str + ')';
		}else{
			fn = fun+'()';
		}
		window.location.href = 'http://test.kingnode.com/portal/eam/'+fn;
	},
	getLoginInfo : function( json ) {
		this.__nativeAPI('getLoginInfo', json);
	},
	reqInterfaceProxy : function( json ) {
		// json = JSON.stringify(json);
		this.__nativeAPI('reqInterfaceProxy',json);
	},
	goNative : function() {
		this.__nativeAPI('goNative');
	},
	goPhoto : function( json ) {
		this.__nativeAPI('goNative', json);
	},
	openPhoto : function( json ) {
		this.__nativeAPI('openPhoto', json);
	},
	goPhotograph : function( json ) {
		this.__nativeAPI('goPhotograph', json);
	},
	goRecord : function( json ) {
		this.__nativeAPI('goRecord', json);
	},
	openRecord : function( json ) {
		this.__nativeAPI('openRecord', json);
	},
	openVideo : function( json ) {
		this.__nativeAPI('openVideo', json);
	},
	fromImgLibrary : function( json ) {
		this.__nativeAPI('fromImgLibrary', json);
	},
	setLAPPTime : function( json ) {
		this.__nativeAPI('setLAPPTime', json);
	},
	openQcode : function( json ) {
		this.__nativeAPI('openQcode', json);
	},
	selUsers : function( json ) {
		this.__nativeAPI('selUsers', json);
	},
	openPhone : function( json ) {
		this.__nativeAPI('openPhone', json);
	},
	opneMsg : function( json ) {
		this.__nativeAPI('opneMsg', json);
	},
	getQDLocationInfo : function( json ) {
		this.__nativeAPI('getQDLocationInfo', json);
	},
	goUpload : function( json ) {
		this.__nativeAPI('goUpload', json);
	},
	goDownload : function( json ) {
		this.__nativeAPI('goDownload', json);
	},
	openFile : function( json ) {
		this.__nativeAPI('openFile', json);
	},
	browseImages : function( json ) {
		this.__nativeAPI('browseImages', json);
	},
	cloundVol : function(json){
		this.__nativeAPI('cloundVol', json);
	},
	showSiteMap : function( json ) {
		this.__nativeAPI('showSiteMap', json);
	},
	goNavigation : function( json ) {
		this.__nativeAPI('goNavigation', json);
	},
	toUrl : function( json ) {
		this.__nativeAPI('toUrl', json);
	},
	showAlert : function( json ) {
		this.__nativeAPI('showAlert', json);
	},
	setDot : function( json ) {
		this.__nativeAPI('setDot', json);
	},
	goBack : function() {
		this.__nativeAPI('goBack');
	},
	goLogin : function( json ) {
		this.__nativeAPI('goLogin', json);
	}
};