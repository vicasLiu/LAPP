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
        LAPP.Publisher.subscribe("componentLoadedFinished", function( arg ) {
            control.handleFinished( inst, arg );
        }, inst);

        evts.put("dataFinish", function (data) {
            inst.setData(data);
        }, inst);
        evts.put("loadHistoryData", function (data) {
            control.loadHistoryData(data);
        }, inst);
        evts.put("pComponentParam", function (arg) {
            control.receiveCParam(inst, arg);
        }, inst);
        LAPP.Publisher.subscribe("publishParam", function( arg ) {
            control.receiveParam( inst, arg );
            inst.bindEvent();
        }, inst);

        evts.put("getParam", function (arg) {
            control.getListData( inst, arg );
        }, inst);
        evts.put("confrimChoose", function (arg) {
            control.getListData(inst, arg);
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
  //       var __createTpl = function() {
  //        var op             = inst.options //options
  //        , dStatus        = op.defaultStatus // 默认状态
  //        , divp           = op.divPosition //显示字段
  //        , liHeight       = op.liHeight || 75 //list行高 默认75px
  //        , isMultiple     = op.isMultiple || false //是否可以多选
  //        , isSelected     =  op.isSelected || false //是否可以单选
  //        , isLink         = op.isLink ? 'arrow' : '' // 是否现实下转
  //        , isMultipleIcon = isMultiple ? 'LAPP-list-multipleIcon' : '' //多选按钮
  //        , isSelectedIcon = isSelected?'LAPP-list-selectIcon': '' //单选按钮
  //        , editListHtml   = '<div class="LAPP-list-btnLi"><a href="javascript:void(0);" class="LAPP-list-editLi">编辑</a><a href="javascript:void(0);" class="LAPP-list-deleteLi">删除</a></div>' //编辑
  //        , isEdit         = op.isEdit || false
  //        , editp          = op.isEdit ? editListHtml : ''
  //        , divLi          = ''
  //        , i              = 0
  //        , htm            = ''
  //        , widthWin       = $(window).width();

  //        htm += '{@each listData as item, index}<li  style=" height:'+ liHeight + 'px; position: relative;" data-status="${item.status}"><div class="LAPP-list-scrollDiv" style="width: ' + (widthWin + 120) + 'px"><div  class="LAPP-list-mainLi '+ isMultipleIcon + " "+ isSelectedIcon + ' '+ isLink +'" style="width: ' + widthWin + 'px"><div class="LAPP-list-clickLiArea">&nbsp;</div>' ;
  //        for (; i < divp.length; i++) {
  //        var temp      = divp[i].dataFile
  //        , display   = divp[i].display ? divp[i].display : "block"//元素是否显示
  //        , divWidth  = divp[i].width ? ('width:'+ divp[j].width +';') : "" //元素宽度
  //        , divHeight = divp[i].height ? ('height:'+ divp[j].height +';') : "" //元素高度
  //        , topp      = divp[i].top ? 'top:' + divp[i].top + ';' : '' //元素位置偏移top
  //        , botp      = divp[i].bottom ? 'bottom:' + divp[i].bottom + ';' : '' //元素位置偏移bottom
  //        , leftp     = divp[i].left ? 'left:' + divp[i].left + ';' : '' //元素位置偏移left
  //        , rightp    = divp[i].right ? 'right:' + divp[i].right + ';' :  ''; //元素位置偏移right

  //        divLi += '<div  style="'+divHeight + divWidth + topp + botp + leftp + rightp + 'position: absolute;"  data-key="' + temp + '" data-value="${item.' + temp +'}"> ${item.' + temp +'}</div>';
  //        }
  //        htm += divLi;
  //        htm += '</div>' + editp +'</li>'
  //        htm += "{@/each}";
  //        return htm;
  //        };
  //        var __createHtml = function() {
  //        var op  = inst.options
  //        , htm = '<div><ul class="LAPP-list" id="' + op.id +'">';
  //        htm += __createTpl();
  //        htm += "</ul></div>";
  //        return htm;
  //        };
  //       //初始方法
  //       this.init = function (data) {
  //           /*seajs.use("list/list.js", function (a) {
  //               var html = "",
  //                   list = {listData: data};
  //               var html = LAPP.Component.List({op: inst.options, data: data});
  //               inst.render(html);*/
  //               var op     = inst.options
  //                      , render = op.render
  //                      , tpl    = __createHtml(inst)
  //                      , list   = {listData: data}
  //                      , html;
  //               html = juicer(tpl, list);
  //               inst.render(html);
                
  //           //})
		// };
		// var __createHtml = function() {
		//     var op  = inst.options
	 //        	, htm = '<div><ul class="LAPP-list" id="' + op.id +'">';
		//    	htm += __createTpl();
		//     htm += "</ul></div>";
		// 	return htm;
		// };
		//初始方法
		this.init = function( data ) {
            if(inst.options.widgetType=="list"){
                seajs.use("core/widget/component/list/list.js",function(){
                    if(data.length>0){
                        LAPP.Component.List({op:inst.options,componentData:data, callback: function(htm){
                            // var op = inst.options,
                            //     _li = "";
                            // if($("#" + op.id).length>0){
                            //     _li = $("#" + op.id).html();
                            // }
                             inst.render(htm);
                            // $("#" + op.id).append(_li);
                        }});
                    }
                });
            }
            if(inst.options.widgetType=="multiplelist"){
                seajs.use("core/widget/component/multiplelist/multiplelist.js",function(){
                    if(data.length>0){
                        LAPP.Component.Multiplelist({op:inst.options,componentData:data, callback: function(htm){
                           // var op = inst.options,
                           //      _li = "";
                           //  if($("#" + op.id).length>0){
                           //      _li = $("#" + op.id).html();
                           //  }
                            inst.render(htm);
                           //  $("#" + op.id).append(_li);
                        }});
                    }
                });
            }
            if(inst.options.widgetType=="singlelist"){
                seajs.use("core/widget/component/singlelist/singlelist.js",function(){
                    if(data.length>0){
                        LAPP.Component.Singlelist({op:inst.options,componentData:data, callback: function(htm){
                           // var op = inst.options,
                           //      _li = "";
                           //  if($("#" + op.id).length>0){
                           //      _li = $("#" + op.id).html();
                           //  }
                             inst.render(htm);
                           //  $("#" + op.id).append(_li);
                        }});
                    }
                });
            }

            if(inst.options.widgetType=="imglist"){
                seajs.use("core/widget/component/imglist/imglist.js",function(){
                    if(data.length>0){
                        LAPP.Component.ImgList({op:inst.options,componentData:data, callback: function(htm){
                            // var op = inst.options,
                            //         _li = "";
                            // if($("#" + op.id).length>0){
                            //     _li = $("#" + op.id).html();
                            // }
                             inst.render(htm);
                            // $("#" + op.id).append(_li);
                        }});
                    }
                });
            }
            
		};
		//添加
		this.add = function( data ) {
            /*var op  = inst.options
             , render = op.render
             , tpl = __createTpl()
             , list  = {listData: data}
             , html = $("#" + render).html();
             html += juicer(tpl, list);
             inst.render(html);*/
             if(inst.options.widgetType=="list"){
                seajs.use("core/widget/component/list/list.js",function(){
                    var op = inst.options;
                    if(data.length>0){
                        LAPP.Component.List({op:op,componentData:data,callback:function(htm){
                            var  _li = $("#" + op.id).html();
                            inst.render(htm);
                           $("#" + op.id).prepend(_li);
                        }});
                    }
                })
            }

            if(inst.options.widgetType=="multiplelist"){
                seajs.use("core/widget/component/multiplelist/multiplelist.js",function(){
                    var op = inst.options;
                    if(data.length>0){
                        LAPP.Component.Multiplelist({op:op,componentData:data,callback:function(htm){
                           var  _li = $("#" + op.id).html();
                            inst.render(htm);
                           $("#" + op.id).prepend(_li);
                        }});
                    }
                });
            }


            if(inst.options.widgetType=="singlelist"){
                seajs.use("core/widget/component/singlelist/singlelist.js",function(){
                    var op = inst.options;
                    if(data.length>0){
                        LAPP.Component.Singlelist({op:op,componentData:data,callback:function(htm){
                            var  _li = $("#" + op.id).html();
                            inst.render(htm);
                           $("#" + op.id).prepend(_li);
                        }});
                    }
                });
            }

            if(inst.options.widgetType=="imglist"){
                seajs.use("core/widget/component/imglist/imglist.js",function(html){
                    var op = inst.options;
                    if(data.length>0){
                        LAPP.Component.ImgList({op:op,componentData:data,callback:function(htm){
                            var  _li = $("#" + op.id).html();
                            inst.render(htm);
                           $("#" + op.id).prepend(_li);
                        }});
                    }
                });
            }
        };
    };
    /*
     * Control
     */
    var Control = function (inst) {
        this.handleFinished = function( inst, arg ) {
            var op = inst.options;
            if( op.dataParam != undefined || arg == undefined ) {
                return;
            }
            this.setData( inst, arg );
        },
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
        this.receiveCParam = function (inst,arg) {
            if (!LAPP.Util.isObject(arg)) {
                return;
            }
            if (arg["switchStatus"] != undefined) {
                inst.refreshList(arg["switchStatus"]);
                inst.listStatus = arg["switchStatus"];
            }
        };
        this.receiveParam = function( inst, arg ) {
            inst.dyParam = arg;
        },
        this.getListData = function (inst, arg) { //dom
            var op = inst.options;
            if( op.isMultiple ) {
                getMultipListData( op, inst );
            }else if(op.getDataType == "all") {
                getAllListData(op, inst);
            };
            // var obj = null, op = inst.options, cid = self.componentId, paramObj = {};
            // if (dom == undefined) {
            //     obj = getSignRecord(dom, op, inst);
            // }
            // if (op.isMultiple) {
            //     obj = getMulRecord(op, inst);
            //     LAPP.Publisher.publish("pComponentParam", {
            //         mutilpleLiData: obj
            //     }, inst);
            // } else if (op.getDataType == "all") {
            //     obj = getAllRecord(op, inst);
            // }
            // paramObj[cid] = obj;
            // LAPP.Publisher.publish("setParam", {id: cid, data: paramObj}, inst);
        };
    };
    /*
     * Model
     */
    var Model = function (inst) {
        var ModelData = {};
        this.init = function (data) {

            ModelData.initData = data;
            if( data.length == 0 ) {
                LAPP.Publisher.publish("receiveDataStatus", "dataEmpty", inst);
            }
            // else if(data.length < inst.options.page['count']){
            //     LAPP.Publisher.publish("receiveDataStatus", "dataEmpty", inst);
            // }
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
    var getSignRecord = function (dom, op, self) {
        var dom = dom;
        var id = op.render;
        self.checkList = dom;
        var obj = {};
        var hidden = dom.find(".li_value");
        for (var i = 0; i < hidden.length; i++) {
            var key = $(hidden[i]).attr("data-key");
            var value = $(hidden[i]).attr("data-value");
            obj[key] = value;
        };
        var paramObj = {};
        paramObj[id] = obj;
        LAPP.Publisher.publish("setParam", {id : id, data : paramObj}, self);
        LAPP.Publisher.publish("pComponentParam", obj, self);
        self.checkData = obj;
        return obj;
    };
    //获得多条记录数据
    var getMulRecord = function (op, self) {
        var id = op.render;
        var lis = $("#" + id).find("li_value");//.find('.LAPP-list-clickMultiple');
        self.checkList = lis;
        var arrObj = [];
        for (var i = 0; i < lis.length; i++) {
            var hidden = $(lis[i]);//.find(".LAPP-list-li_value");
            var obj = {};
            //for (var j = 0; j < hidden.length; j++) {
                var key =hidden.attr("data-key"); //$(hidden[j]).attr("data-key");
                var value = hidden.attr("data-value"); //$(hidden[j]).attr("data-value");
                obj[key] = value;
            //}
            ;
            arrObj.push(obj);
        }
        paramObj[cid] = arrObj;
        self.checkData = arrObj;
        LAPP.Publisher.publish("setParam", {id : cid, data : paramObj}, self);
        LAPP.Publisher.publish("pComponentParam", {
            mutilpleLiData : arrObj
        }, self);
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
        };
        paramObj[cid] = arrObj;
        self.checkData = arrObj;
        LAPP.Publisher.publish("setParam", {id : cid, data : paramObj}, self);
        return arrObj;
    };
    /*
     * List
     */
    var List = Klass.define(LAPP.BasicPlug, {
        constructor: function (pointer) {
            this.$pointer = pointer;
            this.view = new View(this);
            this.control = new Control(this);
            this.model = new Model(this);
            this.isOptionReady = false;
            this.isDataReady = false;
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
                            //var op = self.options;
                            // if (op.isSelected) {
                            //     $(p.current).parent().find('.LAPP-list-mainLi').removeClass('LAPP-list-selectIcon-selected');
                            //     $(p.current).find('.LAPP-list-mainLi').addClass('LAPP-list-selectIcon-selected');
                            // }
                            // if (op.isMultiple) {
                            //     $(p.current).find('.LAPP-list-mainLi').toggleClass('LAPP-list-multipleIcon-selected');
                            // }
                            var $this = $(p.current);
                            var op = self.options;
                            var isMultiple = op.isMultiple || false;
                            var isSelected = op.isSelected || false;
                            var obj = null;
                            if(!isMultiple&&!isSelected){
                                obj = getSignRecord( $this, op, self );
                            }
                            if($.isFunction(op.clickFn) && !op.isMultiple){
                                setTimeout(function(){op.clickFn(obj, $this);},100);
                            };
                            //return false;
                        },
                        "clickLi": function (p) {},
                        // "clickLi": function (p) {
                        //     var _this = $(p.current);
                        //     getSinRecord(_this, op, self)
                        //     $('.LAPP-list-scrollDiv').css({"left": "0"});
                        //     _this.find('.LAPP-list-scrollDiv').css({"left": $('.LAPP-list-btnLi').width() * -1 + 'px'});
                        // },
                        "deleteLi": function (p) {
                            var _this = $(p.current)
                                , _li = _this.parent().parent();
                            _li.remove();
                            var sinData = getSignRecord(_li, op, self);
                            self.deleteLi(sinData);
                        }
                    }
                }
            };
            this.options = $.extend(true, {}, defaultOptions, op);
            this.edit = this.options.editable;
            this.isOptionReady = true;
            if (options.data != undefined) {//是否有本地数据
                this.setData(options.data);
            }
            LAPP.Publisher.publish("businessWidgetLoaded", self);
        },
        setData: function (data) {
            this.listIsEndData = false;
            this.data = data;
            this.isDataReady = true;
            if( this.isDataReady && this.isOptionReady ) {
                this.control.reviceData(data);
            }
            if(data.length == 0 ){
                LAPP.Publisher.publish("noNeedLoading", this);
            }
        },
        getParamData : function() {
            var op = this.options;
            if( op["getType"] != "all" ) {
                return;
            }
            var obj = {};
            var dom = $("#"+op.render);
            var hidden = dom.find(".LAPP-list-li_value");
            for( var i = 0; i < hidden.length; i++ ){
                 var key = $(hidden[i]).attr("data-key");
                 var value = $(hidden[i]).attr("data-value");
                 obj[key] = value;
            };
            var cid = this.componentId;
            var paramObj = {};
            paramObj[cid] = obj;
            LAPP.Publisher.publish("setParam", {id : cid, data : paramObj}, this);
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
            // LAPP.Publisher.publish("businessWidgetLoaded", self);
            EventCollector.initEvents(op.events);
        },
        bindEvent : function() {
            EventCollector.initEvents(this.options.events);
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
            if (data.length == 0||data.length < op.page.count) {
                LAPP.Publisher.publish("receiveDataStatus", "dataEmpty", this);
            } else {
                
                LAPP.Publisher.publish("receiveDataStatus", "dataSuccess", this);
                 
            }
            if ($.isFunction(op.cb)) {
                op.cb(data);
            }
        },
        refreshList: function (status) {
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
    LAPP.List = List;
}(window));
