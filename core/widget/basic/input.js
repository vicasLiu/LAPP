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
        		case 'orderId' : if(_op[__key]){ _data_key += ' orderid="'+ _op[__key]+'" ';};break;
        		case 'groupId' : if(_op[__key]){ _data_key += ' groupid="'+ _op[__key]+'" ';};break;
        		case 'subtype' : if(_op[__key]){ _data_key += ' subtype="'+ _op[__key]+'" ';}else{_data_key += ' subtype="text" ';};break;
        		default : '';
        	}
        }
		return _data_key;
	}
	var createInput = function () {
		var args = Array.prototype.slice.apply(arguments)[0]
		  , _op = args[0]
		  , _type = args[1]
		  , _style = _op.setStyle ? (' style="'+_op.setStyle+'" ') : ''
		  , cls = _op.cls ? _op.cls : ""
		  , text = _op.text ? _op.text : ''
		  , placeholder = _op.placeholder ? _op.placeholder : ''
		  , _html = ''
		  , _data_key = _data_key_fn(_op);
		if (_op.clearNeed ) {
			_html = '<div class="LAPP-input-container"><input type="' + _type +'" id="' + _op.id +'" '+_style+' placeholder="' + placeholder +'" class="LAPP-widget LAPP-input-clear ' + cls +'" data-value="'+text+'" value="' + text+'" '+_data_key+' /><span class="LAPP-input-clearButton"></span></div>';
		} else {
			_html = '<input type="' + _type +'" id="' + _op.id +'Ip" placeholder="' + placeholder +'" class="LAPP-widget LAPP-widget-' + _type  + ' ' + cls +'" value="' + text +'"' + _style + _data_key +' />'; // data-value="'+text+'"
		}
		return _html;
	};
	var createInputVoice = function () {
		var args = Array.prototype.slice.apply(arguments)[0]
			, _op = args[0]
			, _type = args[1]
			, _data_key = _data_key_fn(_op)
			, hei = _op.height ? 'style="height:'+_op.height+'"' : ''
			, hei1 = _op.height ? 'line-height:'+_op.height : ''
			, _singLine = _op.singLine
			, isVoice = _op.isVoice ? '' : 'dn'
			, _style = _op.setStyle ? (' style="'+_op.setStyle+'" ') : ''
			, cls = _op.cls ? _op.cls : ""
			, text = _op.text ? _op.text : ''
			, placeholder = _op.placeholder ? _op.placeholder : ''
			, _html = null;
		if(_singLine){    // 单行
			_html = '<div class="LAPP-input-voice-container container-input" '+hei+'><input type="text" id="' + _op.id +'" placeholder="' + placeholder +'" class="LAPP-widget LAPP-widget-' + _type  + ' ' + cls +'" value="' + text+'" '+_data_key+' /><p class="LAPP-input-area-voice" style="top:1px;height:calc(100% - 2px);'+hei1+'"></p></div>';
		}else{		// 多行
			_html = '<div class="LAPP-input-voice-container" '+hei+'><textarea type="' + _type +'" id="' + _op.id +'T" placeholder="' + placeholder +'" class="LAPP-widget LAPP-widget-' + _type  + ' ' + cls +'" value="' + text+'" style="' + _style +'" '+_data_key+'>' + text + '</textarea><p class="LAPP-input-area-voice '+isVoice+'">语音录入</p></div>';
		}
		return _html;
	};
	var factory = {
		textType: function text() {
			return createInput(arguments); 
		},
		numberType: function number() {
			return createInput(arguments); 
		}, 
		dateType: function date() {
			return createInput(arguments); 
		}, 
		passwordType: function password() { //密码类型
			return createInput(arguments);
		},
		voiceHas: function voice() { //带语音输入
			return createInputVoice(arguments);
		},
		clearHas: function clear() { //带清除类型
			return createInput(arguments);
		},
		mediaHas: function media() { //带拍照、视频类型的textarea
			return createInputMedia(arguments);
		}
	};
	var Input = function (args) {
        var op = args,
        	_op = op,
			name = factory[op.type].name,
			htm = factory[op.type](op, name);
		return {
			html : function(){
				return htm;
			},
			event : function(){
				var temp;
				$('body').delegate('#'+_op.id, 'focus', function () {
					temp = setInterval(function(){
	                    var _val_len = $('#'+_op.id).val().length;
	                    if(_val_len > 0){
	                        $('#'+_op.id).next('.LAPP-input-clearButton').show();
	                    }else{
	                        $('#'+_op.id).next('.LAPP-input-clearButton').hide();
	                    }
	                },50)
				})
				$('body').delegate('.LAPP-input-clear', 'blur', function () {
					clearInterval(temp);
				})
				$('body').delegate('.LAPP-input-clearButton', 'click', function () {
					$(this).hide();
					$(this).parent().find('input').val('');
				});
			}
		}

    };
	LAPP.Widget.Input = Input; 
})(window);