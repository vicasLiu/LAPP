/**
 * Created by Gaotd on 15/1/5.
    @include Select
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
        "css/component/menu/menu.css",  // blue
        // "css/component/menu/menuOrange.css", // Orange
        // "css/component/menu/menuPurple.css", //  Purple
        "core/widget/basic/select.js",
    ];
    var createHtml = function (args) {
        var op  = args.op
            , render = op.render
            , tpl = __createTpl(args)
            , val  = {listData:args.componentData}
            , html = '';
        html += juicer(tpl, val);
        return html;
    };
    var __createTpl = function(args) {
        var op = args.op,
            id = op.id,
            wid = op.width,
            liHeight = op.liHeight,
            data = args.componentData,
            i = 0,textArr = [],
            defaultSelectArr = [],
            valueArr = [],
            clsArr = [],
            _html = '';
        for(;i<data.length;i++){
            var defaultSelect = data[i].defaultSelect ? defaultSelect = 'active' : '';
            data[i].text ? textArr.push(data[i].text) : textArr.push('');
            data[i].value ? valueArr.push(data[i].value) : valueArr.push('');
            clsArr.push(data[i].cls + ' ' + defaultSelect);
        }
        var argsSelect = {
            id: id,
            width : wid,
            liHeight : liHeight,
            cls : clsArr,
            value : valueArr,
            text: textArr
        };
        _html += LAPP.Widget.Select(argsSelect);
        return _html;
    };
    var Menu = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
                var _id = $("#"+args.op.id),
                    divStyle = args.op.divStyle || '',
                    _cls = args.op.cls || "LAPP-component-alert-more";
                _id.attr("class",_cls).attr("style",divStyle);
                _id.find('ul').attr("class","LAPP-component-alert-more-ul");
                if(args.op.cls){
                    LAPP.Events.bindEvent(_id.find('.'+args.op.cls+' li'), '', "click",function(e){
                        $(e).addClass("active").siblings().removeClass("active");
                    });
                }
            }
        });
    };
    LAPP.Component.Menu = Menu;
})(window);