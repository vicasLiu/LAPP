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
		var args = args,
			_name = args.name,
			_html = null,
			id = args.id,
			cls = args.cls,
			name = args.name,
			status = args.status,
			_data_key = _data_key_fn(args),
			_squareCircle;
		if  (args.type && args.type === 'circle') {
			_squareCircle = 'circle';
		} else {
			_squareCircle = 'square';
		}
		if (status) {
			_html = '<div id="' + id +'" class="LAPP-checkbox bdselected ' + _squareCircle + ' ' + cls + '"><input type="checkbox" style="display: none;" data-status="'+status+'" name="' + name +'" '+_data_key+'/><span class="LAPP-checkbox-span">' + name + '</span></div>';
		} else {
			_html = '<div id="' + id +'" class="LAPP-checkbox ' + _squareCircle + ' ' +  cls + '"><input type="checkbox" style="display: none;" data-status="'+status+'" name="' + name +'" '+_data_key+' /></div>';
		}
		return _html;
	},
	Checkbox = function (args) {
        return createHtml(args);
    };
	LAPP.Widget.Checkbox =  Checkbox;
})(window);