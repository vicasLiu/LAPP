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
        "css/component/multiplelist/multiplelist.css",  // blue
        // "css/component/multiplelist/multiplelistOrange.css",  // Orange
        // "css/component/multiplelist/multiplelistPurple.css"  // Purple
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
        _html += '<section id="'+id+'"><ul class="multiplelist-ul">';
        _html += '{@each listData as item, index}';
        _html += '<li class="{@if item.isSelected}select{@/if}" '+_style+'>${item.' + temp +'}';
        for(;i<divp_len;i++){
            var temp      = divp[i].dataFile
                , display   = divp[i].display ? divp[i].display : "block"//元素是否显示
                , divWidth  = divp[i].width ? ('width:'+ divp[j].width +';') : "" //元素宽度
                , divHeight = divp[i].height ? ('height:'+ divp[j].height +';') : "" //元素高度
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
                console.log(cls)
            _html += '<div  style="'+divHeight + divWidth + topp + botp + leftp + rightp + 'position: absolute;display:'+display+'"  data-key="' + temp + '" data-value="${item.'+temp+'}" class="li_value '+cls+'"> '+value+'</div>';
        }
        _html += "</li>";
		_html += "{@/each}";
		_html += '</ul></section><div class="Totalselect" id="Totalselect">全选</div>';
        return _html;
    };
    var Multiplelist = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
                var op = args.op,
                    id = "#"+args.op.id,
                    _li = $( id + " .multiplelist-ul"),
                    _li_len = _li.find('li').length,
                    Totalselect = $('#Totalselect'),
                    _li_fun,i=0,isSelect,
                    isSelected = op.isSelected ? op.isSelected : false;
                if(isSelected){
                    $(".Totalselect").show();
                }
                LAPP.Events.bindEvent(_li, 'li', "click",function(e){
                    $(e).toggleClass("select");
                    _li_fun();
                });
                _li_fun = function(){
                    isSelect = false;
                    for(i=0;i<_li_len;i++){
                        if(!_li.find('li').eq(i).hasClass("select")){
                            isSelect = true;
                        }
                    }
                    if(!isSelect){     // 全部选中
                        Totalselect.addClass("TotalselectSelect");
                    }else{
                        Totalselect.removeClass("TotalselectSelect");
                    }
                }
                _li_fun();
                LAPP.Events.bindEvent(Totalselect, '', "click",function(e){
                    $(e).toggleClass("TotalselectSelect");
                    if($(e).hasClass("TotalselectSelect")){
                        $(e).text("反选");
                        _li.find('li').addClass("select");
                    }else{
                        $(e).text("全选");
                        _li.find('li').removeClass("select");
                    }
                });
            }
        });
    };
    LAPP.Component.Multiplelist = Multiplelist;
})(window);