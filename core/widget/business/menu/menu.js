/**
 * @File
 * @Import
 * @CreatedBy LAPP Common Components Development Group
 * @Module LAPP
 * @Date 2014-01-20
 */
"use strict";
if(!LAPP){
    var LAPP = {};
};
(function(){
    var subEvent = function( inst ) {
        var evts = new Map(), control = inst.control;
        evts.put("setOptions", function( options ){
            inst.setOptions(arg);
        }, inst);
        evts.put("triggleMenu", function( arg ){
            inst.triggleMenu(arg);
        }, inst);
        return evts;
    };
    var View = function( inst ) {
       /* var __createHtml = function( options, inst ) {
            var renderTarget = options.render,
                id = options.id,
                ele = options.ele,
                mapHtml = '<div id="'+id+'" class="LAPP-menu"><div class="LAPP-menu-main">',
                op = '';
            $.each(ele,function(key,value){
                var val = value['value'];
                if(val == undefined){
                    val = value['text'];
                };
                var cb = value['fn'];
                inst.callBackList.put(val, cb);
                op += '<p class="'+value['cls']+' LAPP-evt-click"  menu-value="'+val+'">'+value['text']+'</p>';

            });
            mapHtml+=op;
            mapHtml+='</div></div><div class="LAPP-mask"></div>';
            return mapHtml;

        };*/
        this.init = function( inst ) {
           /* var html = __createHtml(inst.options, inst );
            inst.render(html);*/
            seajs.use("core/widget/component/menu/menu.js",function(){
                LAPP.Component.Menu({op:inst.options,componentData:inst.options.ele,callback:function(html){inst.render(html);}});
            });
        };
    };

    /*
     * Model
     */
    var Model = function (inst) {
        var ModelData = {};
        this.init = function (data) {
            ModelData.initData = data;
            var op = inst.options,
                ele = op.ele;
            $.each(ele,function(key,value){
                var val = value['value'];
                if(val == undefined){
                    val = value['text'];
                };
                var cb = value['fn'];
                inst.callBackList.put(val, cb);
            });
            inst.view.init(data);
        };
    };
    var Menu = Klass.define(LAPP.BasicPlug,{
        constructor : function( pointer ) {
            var self = this;
            self.callBackList = new Map();
            self.view = new View( self );
            self.model = new Model( self );
        },
        setOptions: function( options ) {
            var self = this;
            var evts = subEvent(self);
            self.registerEvent(evts);
            var defaultOp = {
                events : {
                    id : options.id,
                    el : "#"+options.id,
                    evt : {
                        "click .LAPP-component-alert-more-ul>li" : "evtClick"
                    },
                    handle : {
                        evtClick : function( p ) {
                            var $this = p.current;
                            $this.addClass("active").siblings().removeClass("active");
                            var val = $this.attr("menu-value");
                            var cb = self.callBackList.get(val);
                            if( $.isFunction(cb) ){
                                cb( val );
                            }
                        }
                    }
                },
            };
            self.options = $.extend(true, {}, defaultOp, options);
            self.model.init(self);
        },
        render : function(htm){
            var self = this;
            var renderTarget = self.options.render;

            if(self.options.render == 'body'){
                renderTarget = self.options.render;
            }else{
                renderTarget = '#'+self.options.render;
            }
            console.log(htm);
            $(renderTarget).append($(htm));
            if( LAPP.Util.isObject(self.options.css) ) {
                $(renderTarget).css(self.options.css);
            }
            EventCollector.initEvents(self.options.events);
            self.bindEvent();
            LAPP.Publisher.publish("businessWidgetLoaded", self);
            LAPP.Publisher.publish("componentLoadedFinished", self);
        },
        triggleMenu : function( arg ) {
            var show = arg.show, target = arg.target;
            if(show) {
                var e = target;
                var ow = $(".LAPP-menu").width();
                var temp = e.offset().left+ow/2-$(window).width()+10;
                if((e.offset().left+ow)>$(window).width()){
                    $(".LAPP-menu").css("right",temp+'px');
                } else{
                    $(".LAPP-menu").css("left",(e.offset().left+'px'));
                }
                $(".LAPP-menu").css('visibility','visible');
                $(".LAPP-mask").show();
            }else{
                $(".LAPP-mask").hide();
                $(".LAPP-menu").css('visibility','hidden');
            }
        },
        bindEvent : function() {
            var self = this;
            $('.LAPP-mask').unbind('click').bind('click', function(){
                self.triggleMenu({show : false});
            });
        }
    });
    LAPP.Menu = Menu;
}());
