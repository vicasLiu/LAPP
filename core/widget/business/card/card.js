/**
 * @File list组件
 * @Import
 * @CreatedBy LAPP Mobile Components Development Group
 * @GroupMember LiuSiWei ZhangHang
 * @Email suchiva@126.com
 * @Module LAPP
 * @Date 2014-10-14
 */
"use strict";
if (!LAPP) {
    var LAPP = {};
}
;
(function (win) {
    /*
     * subEvent
     */
    var subEvent = function (inst) {
        var evts = new Map()
            , control = inst.control;
        evts.put("dataFinish", function (data) {
            control.reviceData(data);
        }, inst);
        evts.put("loadHistoryData", function (data) {
            control.loadHistoryData(data);
        }, inst);
        evts.put("pComponentParam", function (arg) {
            control.receiveCParam(inst, arg);
        }, inst);
        evts.put("addMoreData", function (arg) {
            inst.pullUp(arg);
        }, inst);
        return evts;
    };
    /*
     * View
     */
    var View = function (inst) {
        this.init = function( data ) {
            seajs.use("core/widget/component/cardlist/cardlist.js",function(){
               // if(data.length>0){
                    LAPP.Component.Cardlist({op:inst.options,componentData:data, callback: function(htm){
                        inst.render(htm);
                    }});
               // }
            });
        };
        //添加
        this.add = function( data ) {
            seajs.use("core/widget/component/cardlist/cardlist.js",function(){
                var op = inst.options;
                if(data){
                    //html = $("#" + render).html();
                    LAPP.Component.Cardlist({op:op,componentData:data,callback:function(htm){
                        // html += list;
                        // inst.render(html);
                        var  card = $("#" + op.id).html();
                        inst.render(htm);
                        $("#" + op.id).prepend(card);
                    }});
                }
            }); 
        };
    };
    /*
     * Control
     */
    var Control = function (inst) {
        this.reviceData = function (data) {
            var op = inst.options;
            if ($.isFunction(op.adpter)) {
                data = op.adpter(data);
            } else if (op.dbData != undefined && !$.isArray(data)) {
                data = data[op.dbData];
            }
            inst.listIsEndData = false;
            inst.model.init(data);
        };
        this.loadHistoryData = function (data) {
            var op = inst.options;
            if ($.isFunction(op.adpter)) {
                data = op.adpter(data);
            } else if (op.dbData != undefined) {
                data = data[op.dbData];
            }
            if (data.length < op.page.count) {
                inst.listIsEndData = true;
            }
            inst.model.add(data);
            inst.loadHistoryData(data);
        };
        this.receiveCParam = function (arg) {
            if (!LAPP.Util.isObject(arg)) {
                return;
            }
            if (arg["switchStatus"] != undefined) {
                inst.refreshList(arg["switchStatus"]);
                inst.listStatus = arg["switchStatus"];
            }
        };
    };
    /*
     * Model
     */
    var Model = function (inst) {
        var ModelData = {};
        this.init = function (data) {
            ModelData.initData = data;
            inst.view.init(data);
        };
        this.add = function (data) {
            ModelData = $.extend(true, {}, ModelData, data);
            inst.view.add(data);
        };
    };
   
    /*
     * Card
     */
    var Card = Klass.define(LAPP.BasicPlug, {
        constructor: function (pointer) {
            this.$pointer = pointer;
            this.view = new View(this);
            this.control = new Control(this);
            this.model = new Model(this);
        },
        setOptions: function (options) {
            var self = this
                , evts = subEvent(self)
                , op = options;
            self.registerEvent(evts);
            var defaultOptions = {
                render: "listPage",
                dbData: "listdata",
                page: {
                    index: 1,
                    count: 30
                },
                events: {
                    id: self.componentId,
                    el: "#" + op.render,
                    evt: {
                         
                    },
                    handle: {
                        
                    }
                }
            };
            this.options = $.extend(true, {}, defaultOptions, op);
            this.edit = this.options.editable;

            if (options.formData != undefined) {//是否有本地数据
                this.setData(options.formData);
            }
            LAPP.Publisher.publish("businessWidgetLoaded", self);
        },
        setData: function (data) {
            this.data = data;
            this.model.init(data);
        },
        render: function (htm) {
            var self = this
                , op = self.options
                , renderTarget = op.render
                ;

            $('#' + renderTarget).html(htm);
            if ($.isFunction(op.cb)) {
                op.cb();
            }
            LAPP.Publisher.publish("componentLoadedFinished", self);
            EventCollector.initEvents(op.events);
        },
        addLi: function (data) {
            var op = this.options, liData = op.data;
            if ($.isArray(data)) {
                liData = liData.concat(data);
            } else {
                liData.push(data);
            }
            ;
            op.data = liData;
            this.refresh();
        },
        pullUp: function () {//上拉加载历史数据
            var self = this;
            if (self.listIsEndData) {
                return;
            }
            LAPP.Publisher.publish("getHistoryData", this);
        },
        loadHistoryData: function (data) {//下拉加载数据
            var op = this.options;
            if (data.length == 0) {
                LAPP.Publisher.publish("receiveDataStatus", "dataEmpty", this);
            } else {
                // if (data.length < op.page.count) {
                //     LAPP.Publisher.publish("receiveDataStatus", "dataEmpty", this);
                // } else {
                    LAPP.Publisher.publish("receiveDataStatus", "dataSuccess", this);
               // }
            }
            if ($.isFunction(op.cb)) {
                op.cb(data);
            }
        },
        refreshList: function () {
            var self = this;
            var op = self.options;
            self.listIsEndData = false;
            var id = "#" + op.render,
                id_status = id + ' li[data-status=' + status + ']',
                len = $(id_status).length;

            $(id + ' li').hide();
            if ($(id_status).length > 0) {
                LAPP.Publisher.publish("needLoading", this);
                $(id_status).get(0).style.borderTop = '0';  //修改点击加载出现双线条问题
                $(id_status).show();
                $(id).removeClass('noData');
            } else {
                $(id).addClass('noData');
                LAPP.Publisher.publish("noNeedLoading", this);
            }

            LAPP.Publisher.publish("receiveDataStatus", "success", this);
            var id_hei = $(id).parent().parent().height(),
                li_hei = $(id_status).height() * len,
                list_scroll = $('.list-scroll');


            // 如果可视高度大于所显示条数总高度 listloading则不显示
            if (id_hei > li_hei) {
                list_scroll.attr("translate3d", "0px, 0, 0px");
                list_scroll.attr("style", "-webkit-transition: -webkit-transform 0ms; transition: -webkit-transform 0ms; -webkit-transform-origin: 0px 0px; -webkit-transform: translate3d(0px, 0, 0px) scale(1);");
                LAPP.Publisher.publish("noNeedLoading", this);
            } else {
                list_scroll.attr("translate3d", "0px, -55px, 0px");
                list_scroll.attr("style", "-webkit-transition: -webkit-transform 0ms; transition: -webkit-transform 0ms; -webkit-transform-origin: 0px 0px; -webkit-transform: translate3d(0px, -55px, 0px) scale(1);");
                LAPP.Publisher.publish("needLoading", this);
                LAPP.Publisher.publish("receiveDataStatus", "dataSuccess", self);
            }
        },
        refresh: function (arg) {
            this.listIsEndData = false;
            if (arg != undefined) {
                this.options = LAPP.Util.extend(this.options, arg);//$.extend( true, {}, this.options, arg );
                if (arg.data != undefined) {
                    this.setData(arg.data);
                }
            }
        }
    });
    LAPP.Card = Card;
}(window));
