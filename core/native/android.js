if(!LAPP){
	var LAPP = {};
};
LAPP.ANDROIDAPI = {
	getLoginInfo : function( json ) {
		LAPPfunc.getLoginInfo(json);
	},
	reqInterfaceProxy : function( json ) {
		// json = JSON.stringify(json);
		LAPPfunc.reqInterfaceProxy(json);
	},
	goNative : function() {
		LAPPfunc.goNative();
	},
	goPhoto : function( json ) {
		capturefunc.goPhoto(json);
	},
	openPhoto : function(json){
		capturefunc.openPhoto(json);
	},
	goPhotograph : function( json ) {
		videofunc.goPhotograph(json);
	},
	goRecord : function( json ) {
		recordingfunc.goRecord(json);
	},
	openRecord : function( json ) {
		recordingfunc.openRecord(json);
	},
	openVideo : function( json ) {
		videofunc.openVideo(json);
	},
	fromImgLibrary : function( json ) {
		capturefunc.fromImgLibrary(json);
	},
	setLAPPTime : function( json ) {
		calendarfunc.setLAPPTime(json);
	},
	openQcode : function( json ) {
		qcodefunc.openQcode(json);
	},
	selUsers : function( json ) {
		LAPPfunc.selUsers(json);
	},
	openPhone : function( json ) {
		LAPPfunc.openPhone(json);
	},
	opneMsg : function( json ) {
		LAPPfunc.opneMsg(json);
	},
	getQDLocationInfo : function( json ) {
		LAPPfunc.getLocationInfo(json);
	},
	goUpload : function( json ) {
		LAPPfunc.goUpload(json);
	},
	goDownload : function( json ) {
		LAPPfunc.goDownload(json);
	},
	openFile : function( json ) {
		accessoryfunc.openFile(json);
	},
	browseImages : function( json ) {
		LAPPfunc.browseImages(json);
	},
	cloundVol : function( json ) {
		cloundvolfunc.cloundVol(json);
	},
	showSiteMap : function( json ) {
		LAPPfunc.showSiteMap(json);
	},
	goNavigation : function( json ) {
		LAPPfunc.goNavigation(json);
	},
	toUrl : function( json ) {
		LAPPfunc.toUrl(json);
	},
	showAlert : function( json ) {
		LAPPfunc.showAlert(json);
	},
	setDot : function( json ) {
		LAPPfunc.setDot(json);
	},
	goBack : function() {
		LAPPfunc.goBack();
	},
	goLogin : function(json) {
		LAPPfunc.goLogin(josn);
	}
};