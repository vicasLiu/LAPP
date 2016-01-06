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
		var _name = args.name || '',i =0 ,
			_id = args.id,
			_arr = args.arr || '',
			_len = _arr.length,
			_data_key = _data_key_fn(args),
			_cls = args.cls || '',
			_html = '';
		_html = '<div id="' + _id +'" class="' + _cls + '" ' + _data_key + '>';
		for( ; i < _len ; i++ ){
			var _value = _arr[i],
				_selected = (_value == args.value) ? ' LAPP-radio-selected ' : '';
			_html += '<span class="LAPP-radio ' + _selected + _data_key + '" data-value="' + _value + '">';
			_html += '<input type="radio" data-status="'+( _selected ? true : false) +'" style="display: none;" name="' + _name +'" '+_data_key + ( _selected ? ' checked ' : ' ')+' />' + _value;
			_html += '</span>';
		}
		_html += '</div>';
		return _html;
	},
	Radio = function (args) {
		return {
			html : function(){
				return createHtml(args);
			},
			event : function(){
				LAPP.Events.bindEvent($("#"+args.id),'span', 'click', function(e){
					var _span_input = $("#"+args.id).find('span input');
					_span_input.attr({'data-status':false});
					_span_input.get(0).checked = false;
					var _this = $(e),
						_selected = 'LAPP-radio-selected',
						_input = _this.find('input');
					_this.get(0).checked = true;
					_input.attr({'data-status':true});
					_this.addClass(_selected).siblings().removeClass(_selected);
				});
			}
		}
    };
	LAPP.Widget.Radio =  Radio;
})(window);