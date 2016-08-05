/**
 * @File list组件
 * @Import
 * @CreatedBy LAPP Mobile Components Development Group
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
            inst.setData(data);
        }, inst);
        evts.put("loadHistoryData", function (data) {
            control.loadHistoryData(data);
        }, inst);
        evts.put("pComponentParam", function (arg) {
            control.receiveCParam(inst, arg);
        }, inst);
        evts.put("getParam", function () {
            control.getListData();
        }, inst);
        evts.put("confrimChoose", function () {
            control.getListData();
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
            seajs.use("core/widget/component/grouping/grouping.js",function(){
                LAPP.Component.Grouping({op:inst.options,componentData:data, callback: function(htm){
                    inst.render(htm);
                }});
            });
		};
		//添加
		this.add = function( data ) {
            seajs.use("core/widget/component/grouping/grouping.js",function(){
                var op = inst.options;
                //html = $("#" + render).html();
                if(data.length>0){
                    LAPP.Component.Grouping({op:op,componentData:data,callback:function(html){
                        // html += list;
                        // inst.render(html);
                        var  _li = $("#" + op.id).html();
                        inst.render(html);
                        $("#" + op.id).prepend(_li);
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
        this.getListData = function (dom) {
            var obj = null, op = inst.options, cid = self.componentId, paramObj = {};
            if (dom == undefined) {
                obj = getSinRecord(inst.$currentClickDom, op, inst);
            }
            if (op.isMultiple) {
                obj = getMulRecord(op, inst);
                LAPP.Publisher.publish("pComponentParam", {
                    mutilpleLiData: obj
                }, inst);
            } else if (op.getDataType == "all") {
                obj = getAllRecord(op, inst);
            }
            paramObj[cid] = obj;
            LAPP.Publisher.publish("setParam", {id: cid, data: paramObj}, inst);
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
     * 相关方法
     */
    //移动
    var transformBox = function (obj, value, time) {
        var time = time ? time : 0;
        obj.css({'-webkit-transform': "translate(" + value + "px)", '-webkit-transition': time + 'ms ease-out'});
    };
    //获得一条记录数据
    var getSinRecord = function (dom, op, self) {
        self.checkList = dom;
        var obj = {};
        var hidden = $(dom).find(".li_value");
        for (var i = 0; i < hidden.length; i++) {
            var key = $(hidden[i]).attr("data-key");
            var value = $(hidden[i]).attr("data-value");
            obj[key] = value;
        }
        ;
        self.checkData = obj;
        return obj;
    };
    //获得多条记录数据
    var getMulRecord = function (op, self) {
        var id = op.render;
        var lis = $("#" + id).find('.LAPP-list-clickMultiple');
        self.checkList = lis;
        var arrObj = [];
        for (var i = 0; i < lis.length; i++) {
            var hidden = $(lis[i]).find(".LAPP-list-li_value");
            var obj = {};
            for (var j = 0; j < hidden.length; j++) {
                var key = $(hidden[j]).attr("data-key");
                var value = $(hidden[j]).attr("data-value");
                obj[key] = value;
            }
            ;
            arrObj.push(obj);
        }
        self.checkData = arrObj;
        return arrObj;
    };
    //获取所有列表的数据
    var getAllRecord = function (op, self) {
        var id = op.render;
        var lis = $("#" + id).find('.li_value');
        self.checkList = lis;
        var arrObj = [];
        for (var j = 0; j < lis.length; j++) {
            var obj = {};
            var key = $(lis[j]).attr("data-key");
            var value = $(lis[j]).attr("data-value");
            obj[key] = value;
            arrObj.push(obj);
        }
        ;
        self.checkData = arrObj;
        return arrObj;
    };
    /*
     * List
     */
    var Grouping = Klass.define(LAPP.BasicPlug, {
        constructor: function (pointer) {
            this.$pointer = pointer;
            this.view = new View(this);
            this.control = new Control(this);
            this.model = new Model(this);
            this.$currentClickDom = null;
        },
        setOptions: function (options) {
            var self = this
                , evts = subEvent(this)
                , op = options;
            self.registerEvent(evts);
            var defaultOptions = {
                render: "listPage",
                dbData: "listdata",
                widgetType : "list",
                page: {
                    index: 1,
                    count: 30
                },
                events: {
                    id: self.componentId,
                    el: "#" + op.render,
                    evt: {
                        "click li": "clickLi",
                        'click .LAPP-list-deleteLi': 'deleteLi'
                    },
                    handle: {
                        "clickLi:before": function (p) {
                            var _this = $(p.current);
                            this.$currentClickDom = _this;
                            var op = self.options;
                            if (op.isSelected) {
                                $(p.current).parent().find('.LAPP-list-mainLi').removeClass('LAPP-list-selectIcon-selected');
                                $(p.current).find('.LAPP-list-mainLi').addClass('LAPP-list-selectIcon-selected');
                            }
                            if (op.isMultiple) {
                                $(p.current).find('.LAPP-list-mainLi').toggleClass('LAPP-list-multipleIcon-selected');
                            }
                            return;
                        },
                        "clickLi": function (p) {
                            var _this = $(p.current);
                            getSinRecord(_this, op, self)
                            $('.LAPP-list-scrollDiv').css({"left": "0"});
                            _this.find('.LAPP-list-scrollDiv').css({"left": $('.LAPP-list-btnLi').width() * -1 + 'px'});
                        },
                        "deleteLi": function (p) {
                            var _this = $(p.current)
                                , _li = _this.parent().parent().parent();
                            _li.remove();
                            var sinData = getSinRecord(_li, op, self);
                            self.deleteLi(sinData);
                        }
                    }
                }
            };
            this.options = $.extend(true, {}, defaultOptions, op);
            this.edit = this.options.editable;

            if (options.data != undefined) {//是否有本地数据
                this.setData(options.formData||[]);
            }
            LAPP.Publisher.publish("businessWidgetLoaded", self);
        },
        setData: function (data) {
            this.data = data;
            this.control.reviceData(data);
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
        deleteLi: function () {
            var self = this;
            var op = self.options;
            var lis = self.checkList;
            var data = self.checkData;
            if (!$.isArray(lis)) {
                lis = [lis];
                data = [data];
            }
            ;
            for (var i = 0; i < lis.length; i++) {
                $(lis[i]).remove();
            }
            ;
            if ($.isFunction(op.deleteFn)) {
                op.deleteFn(data);
            }
            ;
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
        editLi: function (arg) {//编辑删除
            var op = this.options, id = op.render;
            if (arg) {
                $("#" + id + " .LAPP-list-mainLi").addClass("LAPP-list-multipleIcon");
                op.isMultiple = true;
            } else {
                $("#" + id + " .LAPP-list-mainLi").removeClass("LAPP-list-multipleIcon").removeClass("LAPP-list-clickMultiple");
                op.isMultiple = false;
            }
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
                if (data.length < op.page.count) {
                    LAPP.Publisher.publish("receiveDataStatus", "dataEmpty", this);
                } else {
                    LAPP.Publisher.publish("receiveDataStatus", "dataSuccess", this);
                }
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
    LAPP.Grouping = Grouping;
}(window));
