/**
 * Created by Gaotd on 15/1/6.
 * include Button 
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
        "css/component/buttonlayer/buttonlayer.css",
        'core/widget/basic/button.js'
    ];
    var createHtml = function (args) {
        var tpl = __createTpl(args)
            , html = ''
            , data = args.op.ele || args.componentData 
            , listData = {listData: data};
        html = juicer(tpl, listData);
        return html;
    };
    var __createTpl = function(args) {
        var _html = '',
        	op = args.op,
            data = args.componentData,
            height = op.height ? 'style="height:'+op.height+'"' : '',
            len = data.length,i=0,
        	id = op.id;
        _html += '<section id="'+id+'" class="LAPP-component-buttonlayer" '+height+'>';
        for(;i<len;i++){
            var _data = data[i];
            _html += LAPP.Widget.Button({ 
                type: _data.type,  // text textIconUp(上) textIconRight(右) textIconBottom(下) textIconUpLeft(左)
                id: _data.id,
                height : op.height,
                width : (100/len)+'%',
                background : _data.background,
                color : _data.color,
                fontSize : _data.fontSize,
                text: _data.text,
                iconSize : _data.iconSize,
                iconColor : _data.iconColor,
                icon : _data.icon   // 字体图标
            });
        };
        _html += '</section>';
        return _html;
    };
    var Buttonlayer = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
            }
        });
    };
    LAPP.Component.Buttonlayer = Buttonlayer;
})(window);