/**
 * Created by Gaotd on 15/1/9.
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
        "css/component/confirm/confirm.css",  // blue
        // "css/component/confirm/confirmOrange.css", // Orange
        // "css/component/confirm/confirmPurple.css", //  Purple
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
        _html += '<section class="LAPP-component-confirm-dig" id="'+id+'">\
                    <div class="LAPP-component-confirm-dig-div">\
                        <h3>'+title+'</h3>\
                        <p>'+text+'</p>\
                        <div class="button">\
                            <a href="javascript:void(0);" class="cancel-btn">'+(op.button[1]||'取消')+'</a>\
                            <a href="javascript:void(0);" class="confirm-btn">'+(op.button[0]||'确认')+'</a>\
                        </div>\
                    </div>\
                </section>';
        return _html;
    };
    var Confirm = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
                LAPP.Events.bindEvent($("#"+args.op.id), '', "click",function(e){
                    $(e).hide();
                });
            }
        });
    };
    LAPP.Component.Confirm = Confirm;
})(window);