/**
 * Created by Gaotd 2015-2-12
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
		var _cls = args.cls || '',
			_id = args.id,
			_addnumber = args.addnumber || '',
			_value = args.value || '',
			_number = args.number || '',
			_value_len = _value.length,
			_addnumber_len1 = _addnumber.length,
			_Total_len = _value_len + _addnumber_len1,
			_data_key = _data_key_fn(args),
			_val = '',
			styleDiv = args.styleDiv ? args.styleDiv : { margin : [16,16,16,16],padding : [8,10,8,10] },
			_margin1 = styleDiv.margin ? styleDiv.margin[0] : 16,
			_margin2 = styleDiv.margin ? styleDiv.margin[1] : 16,
			_margin3 = styleDiv.margin ? styleDiv.margin[2] : 16,
			_margin4 = styleDiv.margin ? styleDiv.margin[3] : 16,
			_total_margin = _margin2 + _margin4,
			_padding1 = styleDiv.padding ? styleDiv.padding[0] : 8,
			_padding2 = styleDiv.padding ? styleDiv.padding[1] : 10,
			_padding3 = styleDiv.padding ? styleDiv.padding[2] : 8,
			_padding4 = styleDiv.padding ? styleDiv.padding[3] : 10,
			_total_padding = _padding2 + _padding4,
			_html = '',n = 0, i = 0;
		if( _number > _Total_len ){
			var _m = _number - _Total_len;
			for( ; n < _m ; n++ ){
				_val += '0';
			}
		}
		_value = ( _val + _addnumber + _value ).toUpperCase();
		_value_len = _value.length;
		var _wid = $(window).width() - _total_margin - _total_padding - ( _value_len + 1 );
		_wid = _wid/_value_len - 1;
		_html += '<div id="' + _id + '" class="LAPP-Serialnumber ' + _cls + '" ' + _data_key + ' data-value="' + _value + '" style="margin:' + _margin1 + 'px ' + _margin2 + 'px ' + _margin3 + 'px ' + _margin4 + 'px;padding:' + _padding1 + 'px ' + _padding2 + 'px ' + _padding3 + 'px ' + _padding4 + 'px;">';
		for( ; i < _value_len ; i++ ){
			var _vali = _value.substring( i , i + 1 );
			_html += '<span data-value="' + _vali + '" style="width:' + _wid + 'px;"><em></em></span>';
		}
		_html += '</div>';
		return _html;
	},
	Serialnumber = function (args) {
        return createHtml(args);
    };
	LAPP.Widget.Serialnumber =  Serialnumber;
})(window);