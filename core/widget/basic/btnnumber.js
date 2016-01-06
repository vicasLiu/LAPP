/**
 * Created by Gaotd on 12/17/14.
 */
"use strict";
if(!LAPP){
    var LAPP = {};
}
if (!LAPP.Widget) {
    LAPP.Widget = {};
}
// 控制只能输入数字和小数点
function clearNoNum(obj){
    obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
    obj.value = obj.value.replace(/^\./g,"");  //验证第一个字符是数字而不是. 
    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.   
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
};
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
        var op = args,
            _html = '',
            id = op.id,
            value = isNaN(op.value) ? '' : op.value,
            _active = op.isSelect ? ' btnnumber-active' : '',
            _data_key = _data_key_fn(args),
            text = op.text;
        _html += '<div id="' + id + '" class="LAPP-btnnumber' + _active + '" data-value="' + value + '" ' + _data_key + '>\
                    <em class="text">' + text + '</em><span class="less"></span><input type="number" ' + _data_key + ' onkeyup="clearNoNum(this)" value="' + ( op.isSelect ? value : '' ) + '" data-value="' + value + '" placeholder="' + ( op.isSelect ? '' : op.placeholder ) + '" /><span class="plus"></span>\
               </div>';
        return _html;
    };
    var Btnnumber = function (args) {
        return {
            html : function(){
                return createHtml(args);
            },
            event : function(){
                var id = '#' + args.id,
                    wid = $(id).width() || args.wid || ($(window).width() * 0.8),
                    addMunber = args.addMunber || 1;
                $('.LAPP-btnnumber input').width( wid - 130 ).css( 'margin-left' , -((wid - 110)/2) );
                $('.LAPP-btnnumber em.text').css( 'margin-right' , -((wid - 93)/2) );
                // 加
                LAPP.Events.bindEvent($(id), 'span.plus', "click",function(e){
                    var _value = - ( 0 - $(id).find('input').val() );
                    if( _value >= 0 ){
                        var _val = _value + addMunber;
                        $(id).attr('data-value',_val).find('input').attr('data-value',_val).val( _val );
                    }
                });
                // 减
                LAPP.Events.bindEvent($(id), 'span.less', "click",function(e){
                    var _value = - ( 0 - $(id).find('input').val() );
                    if( _value > 0 ){
                        var _val = _value - addMunber;
                        $(id).attr('data-value',_val).find('input').attr('data-value',_val).val( _val );
                    }
                });
            }
        }
    };
    LAPP.Widget.Btnnumber = Btnnumber;
})(window);