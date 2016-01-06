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
	$("<style id='icon_style'>").html('').appendTo($('head'));
	var _data_key_fn = function(_op){
		var __key = '',
			_data_key = '';
		for( __key in _op){
        	switch(__key){
        		case 'key' : if(_op[__key]){ _data_key += ' data-key="'+ _op[__key]+'" ';};break;
        		case 'orderId' : if(_op[__key]){ _data_key += ' orderid="'+ _op[__key]+'" ';};break;
        		case 'groupId' : if(_op[__key]){ _data_key += ' groupid="'+ _op[__key]+'" ';};break;
        		case 'subtype' : if(_op[__key]){ _data_key += ' subtype="'+ _op[__key]+'" ';}else{_data_key += ' subtype="text" ';};break;
        		default : '';
        	}
        }
		return _data_key;
	}
	var createHtml = function(args){
		var _html = '',_style='',
			_op = args,
			id = _op.id,
			cls = _op.cls || '',
			type = _op.type || '',
			height = _op.height ? ("height:"+_op.height+"!important;line-height:"+_op.height+"!important;") : '',
	        width = _op.width ? ("width:"+_op.width+"!important;") : '',
	        background = _op.background ? ("background:"+_op.background+"!important;") : '',
	        color = _op.color ? ("color:"+_op.color+"!important;") : '',
	        border = _op.border ? ("border:"+_op.border+"!important;") : '',
	        fontSize = _op.fontSize ? ("font-size:"+_op.fontSize+"!important;") : '',
	        iconSize = _op.iconSize ? ("font-size:" + _op.iconSize + ";") : '',
	        iconColor = _op.iconColor ? "color:"+_op.iconColor+";" : '',
	        icon = _op.icon ? ("content:'\\"+_op.icon) + "';" : '',
	        text = _op.text || '',
	        _data_key = _data_key_fn(_op);
	    _style = "#"+id+"{"+height+width+background+color+border+fontSize + "}";
	    $("#icon_style").append(_style);
	    _style = '';
	    if(icon){
	    	var _hei = '';
	    	if(_op.iconSize){
				_hei = _op.iconSize ? ("height:"+_op.iconSize+"!important;line-height:"+_op.iconSize+"!important;") : ("height:14px!important;line-height:14px!important;");
			}
	    	switch(type){  // textIconUp textIconRight textIconBottom textIconUpLeft
	    		case "textIconUp" : 
	    			text = '<span class="icon"><span style="line-height:'+(_op.iconSize||"20px")+'"><br/>'+text+'</span></span>';
	    			_style = "#"+id+" span.icon span::before{"+_hei+iconSize+iconColor+icon+ "}"; break;
	    		case "textIconRight" : 
	    			_style = "#"+id+"::after{"+iconSize+iconColor+icon+ "}"; break;
	    		case "textIconBottom" : 
	    			text = '<span class="icon"><span style="line-height:'+(_op.iconSize||"20px")+'">'+text+'<br/></span></span>';
	    			_style = "#"+id+" span.icon span::after{"+_hei+iconSize+iconColor+icon+ "}"; break;
	    		case "textIconUpLeft" : 
	    			_style = "#"+id+"::before{"+iconSize+iconColor+icon+ "}"; break;
	    			default : '';
	    	}
		    $("#icon_style").append(_style);
		}
		_html += '<a href="javascript:void(0);" data-value="'+(_op.text || '')+'" class="LAPP-button '+cls+'" id="'+id+'" '+_data_key+'>'+text+'</a>';
		return _html;
	},
	Button = function (args) {
		return createHtml(args);
    };
	LAPP.Widget.Button = Button; 
})(window);