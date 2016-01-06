var startTime = 0;
var endTime = 0;
var loading = {
	__listLoadingActive : true,
	__loadingInitIndex : 0,
	init : function(status) {
		startTime = Date.parse(new Date());
		loading.__loadingInitIndex++;
		var self = this; 
		this.createDom();
		self.proceeding(status);
	},
	createDom : function() { 
		if( loading.__listLoadingActive && loading.__loadingInitIndex > 1 ) {
			return;
		}
	    var renderTarget = 'body';
	    $('.loadingText').text('');
		$('.ui-icon-loading').attr('class','ui-icon-loading');
	    //默认状态
		var statusText = '数据加载中...';
		loading_div(statusText);
		
		$('.ui-loader-close').bind('click', function() {
			$('body').find('#ui-loader-verbose').remove();   
			$('body').find('.ui-overlay-a').remove();  
		});
		//渲染节点
		if(renderTarget !== 'body') { 
			var temp = $(renderTarget).css("top");
			$('div.ui-screen').css({"top": temp});  
		}else{
			$('div.ui-screen').css({"top": '0'}); 
		}
		
	},
	setActive : function( flg ) {
		if( flg ) {
			loading.__loadingInitIndex = 0;
		}
		loading.__listLoadingActive = flg;
	},
	proceeding: function(status) {
		if( loading.__listLoadingActive && loading.__loadingInitIndex > 1 ) {
			return;
		}
		//状态
		// console.log($('#ui-loader-verbose').length);
		var statusText = status; 
		if(status == "dataLoading") {
			$('.loadingText').text('数据加载中');
			$('.ui-icon-loading').addClass('ui-icon-loadingData');
		}
		if(status == "pageLoading") {
			$('.loadingText').text('页面加载中');
			$('.ui-icon-loading').addClass('ui-icon-loadingData');
		}
		if(status == "error") {
			$('.loadingText').text('数据加载失败');
			$('.ui-icon-loading').addClass('ui-icon-loadingData');
		}
		if(status == "timeout") {
			$('.loadingText').text('数据加载超时');
			$('.ui-icon-loading').addClass('ui-icon-loadingTimeout');
		}
		if(status == "netFailed") { 
			$('.loadingText').text('网络出错');
			$('.ui-icon-loading').addClass('ui-icon-loadingDataFail');
		}
		if(status == "listNull") {
			$('.loadingText').text('数据为空');
			$('.ui-icon-loading').addClass('ui-icon-loadingDataNull');
		}
		if (status == "success"){
			setTimeout(function () {
				$('body').find('#ui-loader-verbose').remove();
				$('body').find('.ui-overlay-a').remove(); 
			}, 500);  
			
		}
	},
	destroy: function() { 
		endTime = Date.parse(new Date());
		if( ((endTime - startTime) / 1000) < 1 ) {
			setTimeout(function() {
				$('body').find('#ui-loader-verbose').remove();   
				$('body').find('.ui-overlay-a').remove();
			}, 1000);
		}else{
			startTime = 0;
			endTime = 0;
			$('body').find('#ui-loader-verbose').remove();   
			$('body').find('.ui-overlay-a').remove();
		}
	}
}
var loading_div = function( statusText ){
	var statusText = statusText || '加载中...'
		,html = '<div id="ui-loader-verbose" class="ui-loader ui-corner-all ui-body-b ui-loader-verbose">'+
//			'	<span class="ui-loader-close">X</span>'+
			'	<span class="ui-icon-loading spin" style="overflow: hidden;"></span>'+
			'	<span class="ui-icon-bg"></span>'+
//			'	<h1 class="loadingText">'+ statusText +'</h1>'+
			'</div>' + 
			'<div class="ui-screen ui-overlay-a"></div>';
	
		$("body").append(html);
}
