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
        "css/component/pushbutton/pushbutton.css",
        // "css/component/pushbutton/pushbuttonOrange.css",  // Orange
        // "css/component/pushbutton/pushbuttonPurple.css"  // Purple
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
        var _html = '',i,val,cls,
            op = args.op,
            data = args.componentData,
            len = data.length,
            defaultVal = op.defaultVal,cls_frist,
            id = op.id;
        _html += '<section id="'+id+'" class="LAPP-component-pushbutton">';
        _html += '<dl class="LAPP-component-pushbutton-dl">';
        if(defaultVal){
            cls_frist = '';
            _html += '<dt>'+defaultVal+'</dt>';
        }else{
            cls_frist = 'cls_frist';
        }
        for(i=0;i<len;i++){
            val = data[i].text;
            cls = data[i].cls ? data[i].cls : '';
            if(val){
                if(cls_frist && i==0){
                    _html += '<dd class="'+cls+' '+cls_frist+'">'+val+'</dd>';
                }else{
                    _html += '<dd class="'+cls+'">'+val+'</dd>';
                }
            };
        };
        _html += '<dd>取消</dd>';
        _html += '</dl>';
        _html += '</section>';
        return _html;
    };
    var Pushbutton = function (args) {
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
    LAPP.Component.Pushbutton = Pushbutton;
})(window);