/**
 * Created by Gaotd 2015-1-14
 */
"use strict";
if(!LAPP){
	var LAPP = {};
}
if (!LAPP.Component) {
	LAPP.Component = {};
}
(function (win, undefined) {
	var url = [
        'css/component/loading/loading.css'
    ];
	var createHtml = function (args) {
		var op = args.op,
			id = op.id,
			text = op.text || '数据加载中....',
			icon = op.icon || '../../../images/loading.gif',_none = '',_html = '',
			_isNeedBtn = op.closeBtn ? '<span class="LAPP-loading-panel-close"></span>' : '';
			if(_isNeedBtn == ''){
				_none = 'close-none'
			}
			_html = '<section id="LAPP-loading-mask"><div class="LAPP-loading-panel '+_none+'">' + '<img width="20" height="20" src="'+icon+'" /><span class="text">' + text + '</span>' + _isNeedBtn + '</div></section>';
		return _html;
	},
	Loading = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
                var SetTimeout = args.op.SetTimeout || '';
                if(SetTimeout){
	                setTimeout(function () {
						$('body').find('#LAPP-loading-mask').remove();
					}, SetTimeout);
	            };
            }
        });
    };
	LAPP.Component.Loading = Loading;
})(window);