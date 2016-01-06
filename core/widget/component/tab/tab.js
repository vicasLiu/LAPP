/**
 * Created by suchiva@126.com on 12/17/14.
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
        "css/component/tab/tab.css",  // blue
        // "css/component/tab/tabOrange.css",  // Orange
        // "css/component/tab/tabPurple.css",  // Purple
    ];
    var createHtml = function (args) {
        var tpl = createTpl(args)
            , html = ''
            , data = args.op.data 
            , btn = {listData: data,formData:args.componentData};
        html = juicer(tpl, btn);
        return html;
    };
    var createTpl = function (args) {
        var op = args.op,
            _html = '',
            len = args.op.data.length,
            wid = (1/len) * 100,
            id = op.id,
            hei = op.height ? ('height:'+op.height+';line-height:'+op.height+';') : '';
        _html += '<section class="LAPP-component-tab" id="'+id+'" style="'+hei+'">';
        _html += '{@each listData as item}';
        _html += '<a href="javascript:void(0);" {@if item.status}class="active"{@/if} style="width:'+wid+'%" data-key="${item.key}" data-status="{@if formData[0]}{@if formData[0][item.key]}${formData[0][item.key]}{@else}${item.value}{@/if}{@else}${item.value}{@/if}">{@if formData[0]}{@if formData[0][item.key]}${formData[0][item.key]}{@else}${item.value}{@/if}{@else}${item.value}{@/if}</a>';
        _html += '{@/each}'
        _html += '</section>';
        return _html;
    };
    var Tab = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
                LAPP.Events.bindEvent($("#"+args.op.id), 'a', "click",function(e){
                    $(e).addClass("active").siblings().removeClass("active");
                });

            }
        });
    };
    LAPP.Component.Tab = Tab;
})(window);