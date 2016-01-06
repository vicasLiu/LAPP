/**
 * Created by Gaotd on 12/17/14.
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
        "css/component/alert/alert.css" // blue
        // "css/component/alert/alertOrange.css" // Orange
        // "css/component/alert/alertPurple.css" //  Purple
    ];
    var createHtml = function (args) {
        var tpl = createTpl(args)
            , html = ''
            , data = args.op.ele || args.data 
            , btn = {listData: data};
        html = juicer(tpl, btn);
        return html;
    };
    var createTpl = function (args) {
        var op = args.op,
            _html = '',
            id = op.id,
            title = op.title,
            text = op.text,
            button = op.button;
        _html += '<section class="LAPP-component-alert-dig" id="'+id+'">\
                    <div class="LAPP-component-alert-dig-div">\
                        <h3>'+title+'</h3>\
                        <p>'+text+'</p>\
                        <div class="button"><a href="javascript:void(0);" class="confirm-btn">'+button+'</a></div>\
                    </div>\
                </section>';
        return _html;
    };
    var Alert = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
                var id = "#"+args.op.id; 
                LAPP.Events.bindEvent($(id).find(".confirm-btn"), '', "click",function(e){
                    $(id).hide();
                });
            }
        });
    };
    LAPP.Component.Alert = Alert;
})(window);