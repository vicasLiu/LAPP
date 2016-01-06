/**
 * Created by Gaotd 2015-1-14
 */
"use strict";
if(!LAPP){
	var LAPP = {};
}
if (!LAPP.Widget) {
	LAPP.Widget = {};
}
(function (win, undefined) {
	var createHtml = function (args) {
		var wid = args.width ? ('style="width:'+args.width+';"') : '',
			hei = args.liHeight ? ('style="height:'+args.liHeight+";line-height:"+args.liHeight+';"') : '',
			_html = '<div class="LAPP-select-panel" id="'+args.id+'">';
		_html += '<ul class="LAPP-select-panel-text"' +wid+'>';
			for (var i = 0; i < args.text.length; i++) {
				var cls = args.cls[i] ? args.cls[i] : '',
					text = args.text[i] || '',
					_value = args.text[i] ? 'menu-value="'+text+'"' : '';
				if(text){
					_html += '<li class="'+cls +'"' + hei + _value +'>' + text +'</li>';
				}
			}
		_html += '</ul>';
		return _html;
	},
	Select = function (args) {
		return createHtml(args);
	};
	LAPP.Widget.Select = Select;
})(window);