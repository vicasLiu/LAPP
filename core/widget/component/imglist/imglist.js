/**
 * Created by suchiva on 14/12/23.
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
        "css/component/imglist/imglist.css"
    ];
    var createHtml = function (args) {
        var op  = args.op
            , render = op.render
            , tpl = __createTpl(args)
            , list  = {listData: args.componentData}
            , html = juicer(tpl, list);
        return html;
    };
    var __defaultFn = function(data) {
        if(data == null || data == 'null' || data == undefined || data == 'undefined'){
            return "";
        }
        return data;
    };
    var __createTpl = function(args) {
              var op             = args.op //options
                , dStatus        = op.defaultStatus // 默认状态
                , divp           = op.divPosition //显示字段
                , liHeight       = op.liHeight || 75 //list行高 默认75px
                , isLink         = op.isLink ? 'arrow' : '' // 是否现实下转
                , editListHtml   = '<div class="LAPP-imglist-btnLi" style="line-height:'+liHeight+'px"><a href="javascript:void(0);" class="LAPP-imglist-deleteLi">删除</a></div>' //删除
                , isEdit         = op.isEdit || false
                , editp          = op.isEdit ? editListHtml : ''
                , divLi          = ''
                , i              = 0
                , htm            = '<ul class="LAPP-imglist" id="'+op.id+'">'
                , _padingRight    = isLink ? 'padding-right:36px;' : ''
                , widthWin       = $(window).width();

        htm += '{@each listData as item, index}<li class="LAPP-imglist-li LAPP-imglist-scrollDiv '+isLink+'" style=" height:'+ liHeight + 'px; position: relative;" data-status="${item.status}"><div class="LAPP-list-clickLiArea"></div>' ;
        for (; i < divp.length; i++) {
            var temp      = divp[i].dataFile
                , display   = divp[i].display ? divp[i].display : "block"//元素是否显示
                , divWidth  = divp[i].width ? ('width:'+ divp[i].width +';') : "" //元素宽度
                , divHeight = divp[i].height ? ('height:'+ divp[i].height +';') : "" //元素高度
                , topp      = divp[i].top ? 'top:' + divp[i].top + ';' : '' //元素位置偏移top
                , botp      = divp[i].bottom ? 'bottom:' + divp[i].bottom + ';' : '' //元素位置偏移bottom
                , leftp     = divp[i].left ? 'left:' + divp[i].left + ';' : '' //元素位置偏移left
                , rightp    = divp[i].right ? 'right:' + divp[i].right + ';' :  '' //元素位置偏移right
                , fnName = ""+i
                , tp = divp[i]
                , cls = tp.cls || ''
                , data_value = ''
                , _type = divp[i].type
                , value = '${item.' + temp +'}';
                // 回调函数fn
                juicer.unregister("fn"+fnName);
                if( $.isFunction(tp.fn) ) {
                    value = '$${item|fn'+fnName+'}';
                    juicer.register("fn"+fnName, tp.fn);
                }else if(tp.value != undefined) {
                    value = tp.value;
                }else{
                    if(_type != "image"){
                        value = '${item.'+temp+'|defaultFn}';
                    }else{
                        value = '<img onerror="javascript:$(this).parent().addClass(\'imgNone\');" src=${item.'+temp+'|defaultFn} />';
                    }
                    juicer.register("defaultFn", __defaultFn);
                }
            if(_type=="image"){
                data_value = '';
            }else{
                data_value = value;
            }
            divLi += '<div  style="'+divHeight + divWidth + topp + botp + leftp + rightp + _padingRight + 'position: absolute;display:'+display+'"  data-key="' + temp + '" data-value="${item.'+temp+'}" class="li_value '+cls+'"> '+value+'</div>';
        }
        htm += divLi;
        htm += editp +'</li>'
        htm += "{@/each}</ul>";
        return htm;
    };
    var ImgList = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
                if(args.op.isEdit){
                    LAPP.Events.bindEvent($("#"+args.op.id), ".LAPP-list-clickLiArea", "swipe", function(){
                        return {
                            sCallback : function() {
                                
                            },
                            mCallback : function( obj, ev ) {
                                
                            },
                            eCallback : function(obj, ev) {
                                var self = $(obj).parent(),
                                    otherScrollDiv = self.siblings('li');
                                if(ev.dir == 'right'){
                                    if(self.hasClass("slide-show")){
                                        self.addClass('slide-hide');
                                        setTimeout(function (){
                                            self.removeClass("slide-hide");
                                            self.removeClass("slide-show");
                                        }, 600);
                                    }
                                }
                                if(ev.dir == 'left'){
                                    if(!self.hasClass("slide-show")){
                                        $(".slide-show").addClass("slide-hide");
                                        setTimeout(function (){
                                            otherScrollDiv.removeClass("slide-hide");
                                            otherScrollDiv.removeClass("slide-show");
                                        }, 600);                            
                                        self.addClass('slide-show');
                                    }
                                }
                            }
                        };
                    });
                }
            }
        });
    };
    LAPP.Component.ImgList = ImgList;
})(window);