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

        /*var __createHtml = function () {
            var op = inst.options
              , id = op.id
              , html = null;
            html = '<div id="' + id + '"><span id="main-toast">toast</span></div>';
            return html;
        };
        this.init = function () {
            var html = __createHtml();
            inst.render(html);
        };*/
        this.init = function() {
           seajs.use("core/widget/component/toast/toast.js",function(){
                LAPP.Component.Toast({op:inst.options,callback:function(html){inst.render(html);}});
            });
        };
    };
    /*
        Toast
    */
    var Toast = Klass.define(LAPP.BasicPlug, {
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
                events : {
                    id : self.componentId,
                    el : 'body',
                    evt: {
                    },
                    handle: {
                    }
                }
            };
            self.registerEvent(evts);
            self.options = $.extend(true, {}, defaultOptions, op);
            self.view.init();
            Toast._id = op.id;
        },
        render: function (html) {
            var self = this
              , op = self.options
              , renderTarget = op.render || 'body';
            if(renderTarget!="body"){
                renderTarget = $("#"+renderTarget);
            }
            $(renderTarget).append(html);
            EventCollector.initEvents(op.events);
            LAPP.Publisher.publish("businessWidgetLoaded", self);
         }
    //     toggleDisplay: function (type, html) {
    //         $('#' + 'main-toast').removeClass();
    //         $('#' + 'main-toast').addClass(' main-toast-' + type);
    //         $('#' +  Toast._id + ' .main-toast').html(html);
    //         $('#' + Toast._id).animate({
    //             opacity: 100
    //         });
    //         setTimeout(function () {
    //             $('#' + Toast._id).animate({
    //                 opacity: 0
    //             });
    //         }, 1000);
    //     }
    });
    // Toast.trigger = function (type, html) {
    //     Toast.prototype.toggleDisplay(type, html);
    // };
    LAPP.Toast = Toast;
})(window);
