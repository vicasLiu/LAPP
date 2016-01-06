/**
 * Created by Gaotd on 15/1/7.
 */
"use strict";
if(!LAPP){
    var LAPP = {};
};
if (!LAPP.Component) {
    LAPP.Component = {};
}
(function (win, undefined) {
    var url = [
        "css/component/togglepanel/togglepanel.css",
        // "css/component/togglepanel/togglepanelOrange.css",  // Orange
        // "css/component/togglepanel/togglepanelPurple.css",  // Purple
    ];
	var createHtml = function (args) {
		var tpl = createTpl(args)
		 	, html = ''
			, data =  args.op.data 
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
    var createTpl = function (args) {
        var op = args.op,
            id = op.id,
            data = args.componentData,
            _data = op.data,
            _divp = _data.data,
            _html = '';
        _html += '<dl class="LAPP-togglepanel-dl" id="'+id+'">';
        _html += '{@each formData as item,index}';
        _html += '<dt \
                    {@if item.show}class="active"{@/if} \
                    data-key="${listData.title.key}" data-value="${item[listData.title.key]}">{@if item[listData.title.key]}${item[listData.title.key]}{@else}${listData.title.value}{@/if}</dt>';
        _html += '<dd {@if !item.show}class="dn"{@/if}>\
                    {@each item.data as item1}\
                        <div class="dd_div_list">';
                            _html += '$${item1|_links_build}';
                            var  listData = function(data){
                                console.log(data)
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
                                                _new_html += '<label class="dd_label ' + _cls + data.cls + ' li_value" data-value="' + _text + '" data-key="' + _field + '">' + _text + '</label>';
                                            }else{
                                                _new_html += '<div class="dd_div_r ' + _cls + ' li_value" data-value="' + _text + '" data-key="' + _field + '">' + _text + '</div>';
                                            }
                                        }else{
                                            _new_html += data[_field];
                                        }
                                    }
                                }
                                return _new_html;
                            }
                            juicer.register('_links_build',listData);
                        _html += '</div>\
                    {@/each}\
                </dd>';
        _html += '{@/each}';
        _html += '</dl>';
        return _html;
    };
    var Togglepanel = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
                var id = args.op.id;
                LAPP.Events.bindEvent($("#"+id), 'dt', "click",function(e){
                    var _next = $(e).next();
                    if(!$(e).hasClass("active")){
                        $('#'+id +">dt").removeClass("active");
                        $('#'+id +">dd").hide();
                        $(e).addClass("active");
                        _next.show();
                    }
                });
            }
        });
    };
    LAPP.Component.Togglepanel = Togglepanel;
})(window);