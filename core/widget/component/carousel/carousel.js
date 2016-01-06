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
        "css/component/carousel/carousel.css",  // blue
        // "css/component/carousel/carouselOrange.css", // Orange
        // "css/component/carousel/carouselPurple.css", //  Purple
        "core/widget/component/iscroll/iscroll.js"
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
            hei = op["height"] || '',
            data = args.componentData || '',
            _win_width = $(window).width(),
            _len = data.length,
            wid = _len>0 ? _win_width*_len : '',
            id = op.id;
        _html += '<section class="LAPP-component-carousel" id="'+id+'"><div class="LAPP-component-carousel-div LAPP-component-carousel-div-auto" style="height:'+hei+';width:'+wid+'px;">';
        _html += '{@each listData as item}';
        _html += '{@if item.imgUrl}<a class="${item.cls}" href="{@if item.imgUrl}${item.href}{@/if}javascript:void(0);" style="width:'+_win_width+'px;"><img  src="${item.imgUrl}" /></a>{@/if}';
        _html += '{@/each}';
        _html += '</div>';
        _html += '<ul class="carousel-indicators">';
        _html += '{@each listData as item1,index}';
        _html += '<li {@if index == 0 }class="active"{@/if}></li>';
        _html += '{@/each}';
        _html += '</ul></section>';
        return _html;
    };
    var Carousel = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args),i=0,n,temp;
            if( $.isFunction(cb) ) {
                cb(htm);
                var op = args.op,
                id = op.id,
                data = args.componentData || '',
                len = data.length,
                _icon_li = $('.carousel-indicators>li'),
                _img_a = $('.LAPP-component-carousel-div a'),
                _active = 'active',
                _setTime = op.setTime || 500, // 动画间隔时间(毫秒)
                _time = op.time || 5000, // 自动播放时间(毫秒)
                _icon_li_fn = function(i){
                    _icon_li.eq(i).addClass(_active).siblings().removeClass(_active);
                },
                _myScroll = new iScroll(id, {
                    checkDOMChanges:true,
                    snap: true,
                    momentum: false,
                    hScrollbar: false,
                    vScroll : false,
                    onScrollEnd: function () {
                        i = this.currPageX;
                        _icon_li_fn(i);
                    }
                }),
                _aimation_fn = function(){
                    if( i == (len - 1)){
                        i=0;
                    }else{
                        i++;
                    }
                    var win_width = $(window).width()*i;
                    _myScroll.scrollToElement(_img_a[i],_setTime);
                    _icon_li_fn(i);
                    _myScroll.currPageX = i; // 重置
                }
                temp = setInterval(function(){
                    _aimation_fn();
                },_time);
            }
        });
    };
    LAPP.Component.Carousel = Carousel;
})(window);