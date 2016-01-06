
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
    var url =  [
        "css/component/singlelist/singlelist.css",
        // "css/component/singlelist/singlelistOrange.css",  // Orange
        // "css/component/singlelist/singlelistPurple.css",  // Purple
    ];
    var startTime = new Date().getTime();
    var createHtml = function (args) {
        var op  = args.op
            , render = op.render
            , tpl = __createTpl(args)
            , val  = {listData:args.componentData}
            , html = '';
        html += juicer(tpl, val);
        return html;
    };
    var __defaultFn = function(data) {
        if(data == null || data == 'null' || data == undefined || data == 'undefined'){
            return "";
        }
        return data;
    };
    var __createTpl = function(args) {
        var _html = '',
            op = args.op,
            id = op.id,
            divp = op.divPosition, //显示字段
            hei = op.liHeight,
            divp_len = divp.length,
            i = 0,_style='';
        if(hei){
            hei = ( op.liHeight == "auto") ? "auto" : (op.liHeight+"px");
            _style = 'style="height:'+hei+';line-height:'+hei+'"' ;
        }
        _html += '<ul id="'+id+'" class="LAPP-singlelist-ul">';
        _html += '{@each listData as item, index}';
        _html += '<li class="{@if item.isSelected}select{@/if} li_value" '+_style+'>${item.' + temp +'}';
        for(;i<divp_len;i++){
            var temp      = divp[i].dataFile
                , display   = divp[i].display ? divp[i].display : "block"//元素是否显示
                , divWidth  = divp[i].width ? ('width:'+ divp[i].width +';') : "" //元素宽度
                , divHeight = divp[i].height ? ('height:'+ divp[i].height +';') : "" //元素高度
                , topp      = divp[i].top ? 'top:' + divp[i].top + ';' : '' //元素位置偏移top
                , botp      = divp[i].bottom ? 'bottom:' + divp[i].bottom + ';' : '' //元素位置偏移bottom
                , leftp     = divp[i].left ? 'left:' + divp[i].left + ';' : '' //元素位置偏移left
                , rightp    = divp[i].right ? 'right:' + divp[i].right + ';' :  '' //元素位置偏移right
                , fnName    = ""+i
                , tp = divp[i]
                , cls = tp.cls || ''
                , value = '${item.' + temp +'}';
                // 回调函数fn
                juicer.unregister("fn"+fnName);
                if( $.isFunction(tp.fn) ) {
                    value = '$${item|fn'+fnName+'}';
                    juicer.register("fn"+fnName, tp.fn);
                }else if(tp.value != undefined) {
                    value = tp.value;
                }else{
                    value = '${item.'+temp+'|defaultFn}';
                    juicer.register("defaultFn", __defaultFn);
                }
            _html += '<div  style="'+divHeight + divWidth + topp + botp + leftp + rightp + 'position: absolute;display:'+display+'"  data-key="' + temp + '" data-value="${item.'+temp+'}" class="li_value '+cls+'"> '+value+'</div>';
        }
        _html += '</li>';
        _html += "{@/each}";
        _html += '</ul>';
        return _html;
    };
    var Singlelist = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
                var id = args.op.id;
                LAPP.Events.bindEvent($("#"+id).find("ul>li"), '', "click",function(e){
                    $(e).addClass("select").siblings().removeClass("select");
                });
            }
        });
    };
    LAPP.Component.Singlelist = Singlelist;
})(window);