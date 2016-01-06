/**
 * Created by Gaotd on 12/17/14.
 * @include serialnumber
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
        'core/widget/basic/serialnumber.js',
        'css/widgetBasic.css'
    ];
    var createHtml = function (args) {
        var _html = LAPP.Widget.Serialnumber(args);
        $('body').append();
        return _html;
    };
    var Serialnumber = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var op = args.op,
                htm = createHtml(op);
            if( $.isFunction(cb) ) {
                cb(htm);
            }
        });
    };
    LAPP.Component.Serialnumber = Serialnumber;
})(window);