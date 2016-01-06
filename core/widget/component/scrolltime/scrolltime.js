/**
 * Created by Gaotd on 12/17/14.
 * @include Scrolltime
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
        'core/widget/component/iscroll/iscroll.js',
        'core/widget/basic/scrolltime.js',
        'css/widgetBasic.css'
    ];
    var createHtml = function (args) {
        var _html = LAPP.Widget.Scrolltime(args).html();
        $('body').append();
        return _html;
    };
    var Scrolltime = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var op = args.op,
                htm = createHtml(op);
            if( $.isFunction(cb) ) {
                cb(htm);
                LAPP.Widget.Scrolltime(op).event();
            }
        });
    };
    LAPP.Component.Scrolltime = Scrolltime;
})(window);