/**
 * Created by Gaotd on 12/17/14.
 * @include btnnumber
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
        'core/widget/basic/btnnumber.js',
        'css/widgetBasic.css'
    ];
    var createHtml = function (args) {
        var _html = LAPP.Widget.Btnnumber(args).html();
        return _html;
    };
    var Btnnumber = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var op = args.op,
                htm = createHtml(op);
            if( $.isFunction(cb) ) {
                cb(htm);
                LAPP.Widget.Btnnumber(op).event();
            }
        });
    };
    LAPP.Component.Btnnumber = Btnnumber;
})(window);