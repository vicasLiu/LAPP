/**
 * Created by Gaotd 2015-1-15
    @include input.js
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
        "core/widget/basic/input.js",
        'css/widgetBasic.css',
        // "css/component/note/noteOrange.css",  // Orange
        // "css/component/note/notePurple.css"  // Purple
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
            id = op.id,
            type = 'voiceHas',
            singLine = op.singLine,
            height = op.height,
            isVoice = op.isVoice,
            text = op.placeholder,
            cls = op.cls;
        _html += LAPP.Widget.Input({ //带语音输入文本  多行
            type : type,
            singLine: singLine,
            height : height,
            isVoice : isVoice,
            placeholder: text,
            id : id,
            cls: cls
        }).html();
        return _html;
    };
    var Note = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
            }
        });
    };
    LAPP.Component.Note = Note;
})(window);