/**
 * Created by Gaotd on 2015-1-9.
    @include
 */
"use strict";
if(!LAPP){
    var LAPP = {};
}
if (!LAPP.Component) {
    LAPP.Component = {};
}
(function (win, undefined) {
    var url = [
        "css/component/grouping/grouping.css",
    ];
    var createHtml = function (args) {
        var tpl = createTpl(args)
            , html = ''
            , data = args.op.data 
            , listData = {listData: data,formData:args.componentData};
        html = juicer(tpl, listData);
        return html;
    };
    var __defaultFn = function(data) {
        if(data == null || data == 'null' || data == undefined || data == 'undefined'){
            return "";
        }
        return data;
    };
    var __defaultFn = function(data) {
        if(data == null || data == 'null' || data == undefined || data == 'undefined'){
            return "";
        }
        return data;
    };
    var createTpl = function (args) {
        if( $('#'+args.op.id).length && $('#'+args.op.id).parent().prev().hasClass('loading') ){
            $('#'+args.op.id).remove();
        }
        var op = args.op,i = 0,j = 0,
            _data = op.data, 
            _divp = _data.data || [],
            _key = _data.title.key,
            _title_value = _data.title.value,
            _componentData = args.componentData || [],
            _componentData_len = _componentData.length,
            _html = '',_new_componentData = [],_new_componentData_len,
            id = op.id;
            // 数组去重
            var RepeatArrRemove = function(arr){
                var res = [],
                    hash = {},
                    i = 0,
                    n = 0,
                    len = arr.length,
                    temp;
                for(;i<len; i++)  {
                    temp = arr[i];
                    if (!hash[temp]){
                        res.push(temp);
                        hash[temp] = true;
                    }
                }
                return res;
            }
            for( ; i < _componentData_len ; i++ ){
                if( _componentData[i][_key] ){
                    _new_componentData.push(_componentData[i][_key]);
                }else{
                    _new_componentData.push(_title_value);
                    _componentData[i][_key] = _title_value;
                }
            }
            _new_componentData = RepeatArrRemove(_new_componentData);
            _new_componentData_len = _new_componentData.length;
            _html += '<figure class="LAPP-grouping" id="'+id+'">';
            var  listData = function(data){
                var _data = __defaultFn(data),
                    _len = _divp.length, i = 0,
                    _new_html = '';
                for( ; i < _len ; i++){
                    var _field = _divp[i]['field'],
                        _l_r = i ? ' r ' : ' l ',n=0,
                        _cls = _divp[i]['cls'] ? _divp[i]['cls'] : '',
                        _text = data[_field] ? data[_field] : '';
                    if($.isFunction(_divp[i].fn)){
                        n++;
                        _new_html += '<div class="' + _cls + _l_r + ' li_value" data-value="' + _text + '" data-key="' + _field + '">' + (_divp[i].fn(_data) || '') + '</div>';
                    }else{
                        if(!n){
                            if( i==0 ){
                                _new_html += '<label class="' + _cls + ' li_value" data-value="' + _text + '" data-key="' + _field + '">' + _text + '</label>';
                            }else{
                                _new_html += '<span class="' + _cls + ' li_value" data-value="' + _text + '" data-key="' + _field + '">' + _text + '</span>';
                            }
                        }else{
                            _new_html += data[_field];
                        }
                    }
                }
                return _new_html;
            }
            for( ; j < _new_componentData_len; j++ ){
                var _new_title_value = _new_componentData[j],
                    _len_gp = $('#'+id+' .LAPP-grouping-title').length,
                    _last_grouping = $('#'+id+' .LAPP-grouping-title').eq(_len_gp-1),
                    _last_ul = _last_grouping.next('ul'),
                    _data_value_ = _last_grouping.attr('data-value') || '';
                if( _new_componentData[j] != _data_value_ ){  // 拿最后一个title和点击加载更多的第一个title对比 判断是否归上还是归下
                    _html += '<figcaption class="LAPP-grouping-title" data-value="' + _new_title_value + '" data-key="' + _key + '">' + _new_title_value + '</figcaption><ul class="LAPP-grouping-ul">';
                    var n = 0;
                    for( ; n < _componentData_len ; n++ ){
                        if( _componentData[n][_key] == _new_title_value ){
                            _html += '<li data-status="' + _componentData[n]['status'] + '">' + listData(_componentData[n]) + '</li>';
                        }
                    }
                    _html += '</ul>';
                }else{   
                    var n = 0,_li_Repeat_html = '';
                    for( ; n < _componentData_len ; n++ ){
                        if( _componentData[n][_key] == _data_value_ ){
                            _li_Repeat_html += '<li data-status="' + _componentData[n]['status'] + '">' + listData(_componentData[n]) + '</li>';
                        }
                    }
                    _last_ul.append(_li_Repeat_html)
                }
            } 
            _html += '</figure>';
        return _html;
    };
    var Grouping = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
            }
        });
    };
    LAPP.Component.Grouping = Grouping;
})(window);