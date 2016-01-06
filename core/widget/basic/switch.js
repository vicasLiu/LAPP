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
    $("<style id='switch_style'>").html('').appendTo($('head'));
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
	var createHtml = function (args) {
		var text = args.text || ['',''],
			_data_key = _data_key_fn(args),
			id = args.id,
			cls = args.cls || '',
			valDefault = args.valDefault ? '1' : '0',
			wid = args.width || 45,
			isSelect = args.isSelect || '',
			background = args.background ? ('background:'+args.background+'!important;') : '',
			activeBackground = args.activeBackground ? ('background:'+args.activeBackground+'!important;') : '',
			color = args.color ? ('color:'+args.color+'!important;') : '',
			fontSize = args.fontSize ? ('font-size:'+args.fontSize+'!important;') : '',
			hei = args.height ? (args.height+2) : 32,
			hei1 =  args.height || 30,
			_html = '',
			_selected_cls = '',
			_checked = '',
			_data_value = 'false',
			_newCls = '.switch'+id,
			_style = _newCls+'{width:'+wid+'px!important;height:'+hei+'px!important;line-height:'+hei+'px!important;'+background+'}'+_newCls+' span{width:'+hei1+'px!important;height:'+hei1+'px!important;line-height:'+hei1+'px!important;}'+_newCls+'::before{content:"'+(text[0] || '' )+'";'+color+fontSize+'}'+_newCls+'::after{content:"'+(text[1] || '' )+'";'+color+fontSize+'}#'+id+'.bg-green{'+activeBackground+'}';
		$("#switch_style").append(_style);
		if( valDefault == '1' ){
			_data_value = 'true',
			_selected_cls = 'bg-green';
			_checked = 'checked="checked"';
		}
		_html += '<strong id="'+id+'" class="switch'+id+' '+cls+' switch '+_selected_cls+'"><input class="form_span switchBtn" data-value="'+_data_value+'" type="checkbox" value="'+valDefault+'" '+_data_key+ _checked + ' /><span></span></strong>';
		return _html;
	};
	var Switch = function (args) {
		return {
			html : function(){
				return createHtml(args);
			},
			event : function(){
				// $("#"+args.id).click(function(){
				// 	$(this).toggleClass('bg-green');
				// });
				LAPP.Events.bindEvent($("#"+args.id),'', 'click', function(e){
					$(e).toggleClass('bg-green');
				});
			}
		}
	};
	LAPP.Widget.Switch = Switch; 
})(window);