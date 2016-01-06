/**
 * Created by Gaotd on 15/1/5.
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
        "css/component/toast/toast.css"
    ];
    var createHtml = function (args) {
        var op  = args.op
            , render = op.render
            , tpl = __createTpl(args)
            , val  = {}
            , html = '';
        html += juicer(tpl, val);
        return html;
    };
    var __createTpl = function(args) {
        var op = args.op,
            id = op.id,
            val = op.val || '',
            cls = ("class="+op.cls) || '',
            _html = '<section id="'+id+'" '+cls+'>'+val+'</section>';
        return _html;
    };
    var Toast = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
                var _time = args.op.timeout,
                    id = args.op.id;
                setTimeout(function(){
                    $('#'+id).animate({"opacity":0},500);
                    setTimeout(function(){
                        $('#'+id).remove();
                    },501);
                },_time);
            }
        });
    };
    LAPP.Component.Toast = Toast;
})(window);