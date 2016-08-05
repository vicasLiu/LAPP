/**
 * @File 旋转木马组件
 * @Import
 * @CreatedBy LAPP Mobile Components Development Group
 * @Module LAPP
 * @Date 2014-01-24
 */
"use strict";
if(!LAPP){
    var LAPP = {};
};
(function(window) {
    var subEvent = function( inst ) {
        var evts = new Map();
        evts.put("dataFinish", function( data ){
            inst.setData( data );
        }, inst);
        return evts;
    };
    var View = function( inst ) {
        this.init = function( data ) {
            var op = inst.options;
            if(op.autoPlay){
                seajs.use("core/widget/component/autocarousel/autocarousel.js",function(){
                    LAPP.Component.Autocarousel({op:op,componentData:data,callback:function(html){inst.render(html);}});
                });
            }else{
                seajs.use("core/widget/component/carousel/carousel.js",function(){
                    LAPP.Component.Carousel({op:op,componentData:data,callback:function(html){inst.render(html);}});
                });
            }
        };
    };

    var Control = function( inst ) {
        this.reviceData = function( data ) {
            var op = inst.options;
            if( $.isFunction( op.adpter ) ) {
                data = op.adpter(data);
            }else if( op.dbData != undefined ) {
                data = data[op.dbData];
            }
            inst.model.init(data);
        };
    };
    var Model = function( inst ) {
        var ModelData = {};
        this.init = function( data ) {
            ModelData.initData = data;
            inst.view.init( data );
        };
    };
    var Carousel = Klass.define(LAPP.BasicPlug, {
        constructor : function( pointer ) {
            this.$pointer = pointer;
            this.view = new View( this );
            this.control = new Control( this );
            this.model = new Model( this );
        },
        setOptions : function(options) {
            var defaultOp = {
                activeIndex: 0,
                autoPlay: true,
                interval: 3000,
                duration: 300,
                events : {
                    el : "#"+options.render,
                    id : options.id
                }
            };
            var self = this;
            var evts = subEvent(self);
            self.registerEvent(evts);
            self.options = $.extend(true, {}, defaultOp, options);
            if( options.data != undefined ) {
                self.setData(options.data);
            }
            LAPP.Publisher.publish("businessWidgetLoaded", self);
        },
        setData : function( data ) {
            this.data = data;
            var op = this.options;
            this.control.reviceData(data);
        },
        render : function(htm) {
            var op = this.options;
            var target = op.render;
            $("#"+target).html(htm);
            EventCollector.initEvents(op.events);
            LAPP.Publisher.publish("componentLoadedFinished", this);
        }
    });
    LAPP.Carousel = Carousel;
})(window);
