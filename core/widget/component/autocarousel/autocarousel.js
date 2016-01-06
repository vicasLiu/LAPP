/**
 * Created by Gaotd on 15/1/10.
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
        "css/component/autocarousel/autocarousel.css",
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
            hei = op.height || '',
            id = op.id;
        _html += '<section class="LAPP-component-autocarousel-carousel" id="'+id+'" style="height:'+hei+'">\
                    {@each listData as item}\
                        {@if item.imgUrl}<a class="${item.cls}" href="{@if item.imgUrl}${item.href}{@/if}javascript:void(0);"><img  src="${item.imgUrl}" /></a>{@/if}\
                    {@/each}\
                </section>';
        return _html;
    };
    var Autocarousel = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
                // 自动轮播
                var op = args.op,
                	len = args.componentData.length,
                	i=0,page = 0,li_w = '100%',
                	num = op.setTime || 500,
                	time = op.time || 3000,
                	tu_ul_li = $(".LAPP-component-autocarousel-carousel a");
                tu_ul_li.eq(0).css("left",0);
                var fun = function(){
					if(page == len-1){
						page = 0;
						$(tu_ul_li).eq(page).css("left",li_w);
						$(tu_ul_li).eq(page).animate({"left":0},num);
						$(tu_ul_li).eq(len-1).animate({"left":-li_w},num);
					}else{
						page++;
						$(tu_ul_li).eq(page).css("left",li_w);
						$(tu_ul_li).eq(page).animate({"left":0},num).prev().animate({"left":-li_w},num);
					}
				}
				if(len>1){
					setInterval(fun,time);
				}
            }
        });
    };
    LAPP.Component.Autocarousel = Autocarousel;
})(window);