/**
 * Created by Gaotd on 15/1/10.
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
        "css/component/process/process.css",
    ];
    var createHtml = function (args) {
        var tpl = createTpl(args)
            , html = ''
            , data = args.op.ele || args.componentData 
            , btn = {listData: data};
        html = juicer(tpl, btn);
        return html;
    };
    var createTpl = function (args) {
        var op = args.op,
            _html = '',
            id = op.id;
        _html += '<section class="LAPP-component-process" id="'+id+'">';
        _html += '<ul class="LAPP-component-process-ul">';
        _html += '{@each listData as item}';
        _html += '<li {@if item.status} class="process-ul-li-end" {@/if}>';
        _html += '<strong class="icon">${item.index}</strong>';
        _html += '<div class="process-right">$${item.comment}</div>';
        _html += '</li>';
        _html += '{@/each}';
        _html += '</ul>';
        _html += '</section>';
        return _html;
    };
    var Process = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
            }
        });
    };
    LAPP.Component.Process = Process;
})(window);