/**
 * @File 通知组件
 * @Import
 * @CreatedBy LAPP Mobile Components Development Group
 * @GroupMember LiuSiWei ZhangHang
 * @Email suchiva@126.com
 * @Module LAPP
 * @Date 2014-01-20
 */
"use strict";
if (!LAPP) {
    var LAPP = {};
}

(function (window, undefined) {

    /*
        subEvent
    */
    var subEvent = function (inst) {
        var me = inst
          , evts = new Map;
        return evts;
    };

    /*
        View
    */
    var View = function (inst) {
        this.init = function() {
            var op = inst.options;
            if(op.widgetType=="alert"){
                seajs.use("core/widget/component/alert/alert.js",function(){
                    LAPP.Component.Alert({op:inst.options,callback:function(html){inst.render(html);}});
                });
           }
           if(op.widgetType=="confirm"){
                seajs.use("core/widget/component/confirm/confirm.js",function(){
                    LAPP.Component.Confirm({op:inst.options,callback:function(html){inst.render(html);}});
                });
            }
        };
    };
    /*
        Dialog
    */
    var Dialog = Klass.define(LAPP.BasicPlug, {
        constructor: function (pointer) {
            this.$pointer = pointer;
            this.view = new View(this);
        },
        setOptions: function (options) {
            var self = this
                , op = options
                , evts = subEvent(self)
                , defaultOptions = {
                render : "listPage",
                widgetType : "alert",
                events : {
                    id : self.componentId,
                    el : 'body',
                    evt: {
                        "click .cancel-btn" : "cancelClik",
                        "click .confirm-btn" : "confirmClick"
                    },
                    handle: {
                        cancelClik : function(p){
                            $("#confirm").hide();
                        },
                        "confirmClick:before" : function(p){
                            $("#confirm").hide();
                        },
                        "confirmClick" : function(p){
                        
                        }
                    }
                }
            };
            self.registerEvent(evts);
            self.options = $.extend(true, {}, defaultOptions, op);
            self.view.init();
        },
        render: function (html) {
            var self = this
              , op = self.options
              , renderTarget = op.render || 'body';
            $(renderTarget).append(html);
            if(self.options.show){
                $("#"+self.options.id).show();
            }else{
                 $("#"+self.options.id).hide();
            }
            EventCollector.initEvents(op.events);
            LAPP.Publisher.publish("businessWidgetLoaded", self);
        }
    });
    LAPP.Dialog = Dialog;
})(window);
