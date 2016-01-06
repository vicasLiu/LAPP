/**
 * Created by suchiva@126.com on 12/17/14.
 */
"use strict";
if(!LAPP){
	var LAPP = {};
}
if (!LAPP.Widget) {
	LAPP.Widget = {};
}
(function (win, undefined) {
	var _data_key_fn = function(_op){
		var __key = '',
			_data_key = '';
		for( __key in _op){
        	switch(__key){
        		case 'key' : if(_op[__key]){ _data_key += ' data-key="'+ _op[__key]+'" ';};break;
        		case 'orderid' : if(_op[__key]){ _data_key += ' orderid="'+ _op[__key]+'" ';};break;
        		case 'groupid' : if(_op[__key]){ _data_key += ' groupid="'+ _op[__key]+'" ';};break;
        		case 'subtype' : if(_op[__key]){ _data_key += ' subtype="'+ _op[__key]+'" ';}else{_data_key += ' subtype="text" ';};break;
        		default : '';
        	}
        }
		return _data_key;
	}
	var createHtml = function (args) {
		var id = args.id,
			text = args.text || '',
			cls = args.cls || '',
			defaultsValue = args.defaultsValue || 0,
			_data_key = _data_key_fn(args),
			_len = text.length,
			_html = '';
		if( _len>1 ){
			if(defaultsValue>text[_len-1]){
				defaultsValue = text[_len-1];
			}else if(defaultsValue<text[0]){
				defaultsValue = text[0];
			}
			_html += '<div class="LAPP-slider" id="' + id + 'jRange" data-value="'+defaultsValue+'" '+_data_key+'>\
			    <input class="single-slider" type="hidden" value="'+defaultsValue+'" style="display: none;">\
			</div>';
		}
		return _html;
	},
	Slider = function (args) {
		return {
			html : function(){
				return createHtml(args);
			},
			event : function(){
				var id = args.id+'jRange';
				$('.single-slider').jRange({
					id : id,
			        from: args.text[0],
			        to: args.text[(args.text.length-1)],
			        step: args.step,   // 每个步距量
			        scale: args.text,
			        width: args.width || '100%',
			        disable : args.disable,   // 是否可以拖动 默认为false  false表示可以拖动
			        showScale : args.showScale, // 是否显示底部label值 默认为true
			        showLabels: args.showLabels // 是否显示头部label值 默认为true
			    });
			}
		}
	};
	LAPP.Widget.Slider = Slider; 
})(window);