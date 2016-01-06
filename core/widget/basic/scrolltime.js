/**
 * Created by Gaotd on 2015-2-12
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
        var op = args,
            _html = '',m=0,
            id = op.id,len,
            _cls = op.cls || '',
            _date = new Date(),
            _getHours = _date.getHours(),     
            _getMinutes = _date.getMinutes(), //获取当前分钟数(0-59)
            _value = args.value || [_getHours,_getMinutes] , // 小时 分钟 
            n = _value.length,
            _text = args.text || ['小时','分钟'] , 
            _isClick = args.isClick,   // 是否默认可以点击滚动
            _isScroll = args.isScroll,   // 是否默认可以滚动
            _data_key = _data_key_fn(args);
        _html += '<div id="' + id + '" class="LAPP-scrolltime ' + _cls + '" data-value="' + _value + '">';
        for( ; n > 0 ; n-- ){
            _html += '<div class="LAPP-scrolltime-div" data-value="' + _value[m] + '">';
            _html += '<div class="LAPP-scrolltime-kk" id="LAPP-scrolltime-div' + n + '"><ul class="LAPP-scrolltime-div-ul"><li>&nbsp;</li>';
            len = ( n == 2 ) ? 24 : 60;
            for( var j = 0 ; j < len ; j++ ){
                var _val = j > 9 ? j : ( '0' + j ); 
                _html += '<li data-value="' + _val + '">' + _val + '</li>';
            }
            _html += '<li>&nbsp;</li></ul></div>';
            _html += '<span class="LAPP-scrolltime-span-bg-top"></span><span class="LAPP-scrolltime-span-bg-bottom"></span>';
            _html += '<span class="LAPP-scrolltime-span-text-' + ( ( m == 0 ) ? 'hours' : 'minutes' ) + '" data-value="' + _text[m] + '">' + _text[m] + '</span>';
            _html += '</div>';
            m++;
        }
        // _html += '<span class="LAPP-scrolltime-span-text-hours" data-value="' + _text[m] + '">' + _text[m] + '</span><span class="LAPP-scrolltime-span-text-minutes" data-value="' + _text[1] + '">' + _text[1] + '</span>';
        _html += '</div>';
        return _html;
    };
    var Scrolltime = function (args) {
        return {
            html : function(){
                return createHtml(args);
            },
            event : function(){
                var _date = new Date(),
                    _getHours = _date.getHours(),     
                    _getMinutes = _date.getMinutes(), //获取当前分钟数(0-59)
                    _value = args.value || [_getHours,_getMinutes] ; // 小时 分钟 
                var _myScroll1 = new iScroll('LAPP-scrolltime-div1', {
                    snap:"li",
                    y : -(_value[1]*38),
                    onScrollEnd: function (e) {
                        var _data_value = $('#LAPP-scrolltime-div1').parents('div.LAPP-scrolltime'),
                            _arr = _data_value.attr('data-value').split(","),
                            _val = 0 - (this.y)/38;
                        _arr[1] = _val;
                        _data_value.attr('data-value',_arr);
                    }
                });
                var _myScroll2 = new iScroll('LAPP-scrolltime-div2', {
                    snap:"li",
                    y : -(_value[0]*38),
                    onScrollEnd: function (e) {
                        var _data_value = $('#LAPP-scrolltime-div1').parents('div.LAPP-scrolltime'),
                            _arr = _data_value.attr('data-value').split(","),
                            _val = 0 - (this.y)/38;
                        _arr[0] = _val;
                        _data_value.attr('data-value',_arr);
                    }
                })
            }
        }
    };
    LAPP.Widget.Scrolltime = Scrolltime;
})(window);